import express from "express";
import leagueMatchData from "./public/scripts/league/league-data.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const availChamps = [
  "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Aziz",
  "Bard", "Bel'Veth", "Blitzcrank", "Brand", "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki",
  "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio",
  "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV",
  "Jhin", "Jinx", "Kai'Sa", "Karma", "Karthus", "Kalista","Kassadin", "Katarina", "Kayle", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw",
  "LeBlanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Miss Fortune",
  "Mordekaiser", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Olaf", "Orianna", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn",
  "Rakan", "Rammus", "Rek'Sai", "Rell", "Renata Glasc", "Renekton", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna",
  "Seraphine", "Sett", "Shaco", "Shen", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah",
  "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus",
  "Vayne", "Veigar", "Vel'Koz", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Yasuo", "Yone",
  "Yuumi", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
];

const availLanes = ["Top", "Mid", "Adc", "Support", "Jungle"]; 


// Render homepage with no result yet
app.get("/", (req, res) => {
  res.render("index.ejs", { 
    result: null, 
    availChamps: availChamps, 
    availLanes: availLanes 
  });
});

// Handle form submission
app.post("/2champwinp", (req, res) => {
  const { player1, champ1, lane1, player2, champ2, lane2 } = req.body;
  const gamesWon = (leagueMatchData.games
      .filter(g => g.players.some(p => p.name === player1 && p.champion === champ1 && p.lane === lane1)
        && g.players.some(p => p.name === player2 && p.champion === champ2 && p.lane === lane2))
      .filter(g => g.result === "Win").length);

  const totalGames = leagueMatchData.games
    .filter(g => g.players.some(p => p.name === player1 && p.champion === champ1 && p.lane === lane1)
      && g.players.some(p => p.name === player2 && p.champion === champ2 && p.lane === lane2)).length;
  const winPercentage = (gamesWon / totalGames * 100).toFixed(1);
  if (totalGames === 0) {
    res.render("index.ejs", {
      result: "",
      availChamps: availChamps,
      availLanes: availLanes,
      twoChampWinPInvalid: true
    });
  } else {
    res.render("index.ejs", {
      result: winPercentage,
      availChamps: availChamps,
      availLanes: availLanes,
      totalGames: totalGames
    });
  }
});

app.post("/2champkda", (req, res) => {
  const { player1, champ1, lane1, player2, champ2, lane2 } = req.body;
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let twoChampKdaTotalGames = 0;

  leagueMatchData.games.forEach(game => {
    const p1 = game.players.find(p => p.name === player1 && p.champion === champ1 && p.lane === lane1);
    const p2 = game.players.find(p => p.name === player2 && p.champion === champ2 && p.lane === lane2);

    if (p1 && p2) {
      totalKills += p1.k + p2.k;
      totalDeaths += p1.d + p2.d;
      totalAssists += p1.a + p2.a;
      twoChampKdaTotalGames++;
    }
  });

  const twoChampKda = totalDeaths === 0
    ? totalKills + totalAssists
    : ((totalKills + totalAssists) / totalDeaths).toFixed(2);

  if (twoChampKdaTotalGames !== 0) {
    res.render("index.ejs", {
      twoChampKda: twoChampKda,
      availChamps: availChamps,
      availLanes: availLanes,
      twoChampKdaTotalGames: twoChampKdaTotalGames
    });
  } else {
    res.render("index.ejs", {
      availChamps: availChamps,
      availLanes: availLanes,
      twoChampKdaInvalid: true
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

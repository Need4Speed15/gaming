import leagueMatchData from "./league-data.js";



// Calculate total win percentages
function calculateWinPercentages(data) {
  const totalGames = data.games.length;
  const totalWins = data.games.filter(g => g.result === "Win").length;

  const topGames = data.games.filter(g => g.side === "Top");
  const bottomGames = data.games.filter(g => g.side === "Bottom");

  const totalGamesWithCody = data.games.filter(g => g.players.some(p => p.name === "Cody"));
  const totalGamesWithSammy = data.games.filter(g => g.players.some(p => p.name === "Sammy"));
  const totalGamesWithJason = data.games.filter(g => g.players.some(p => p.name === "Jason"));
  const totalGamesWithCodyAndSammy = data.games.filter(g => g.players.some(p => p.name === "Cody") && g.players.some(p => p.name === "Sammy"));
  const totalGamesWithCodyAndJason = data.games.filter(g => g.players.some(p => p.name === "Cody") && g.players.some(p => p.name === "Jason"));
  const totalGamesWithCodyAndSammyAndJason = data.games.filter(g => g.players.some(p => p.name === "Cody") && g.players.some(p => p.name === "Sammy") && g.players.some(p => p.name === "Jason"));

  const totalWP = totalGames ? ((totalWins / totalGames) * 100).toFixed(0) : 0;
  const topWP = topGames.length ? ((topGames.filter(g => g.result === "Win").length / topGames.length) * 100).toFixed(0) : 0;
  const bottomWP = bottomGames.length ? ((bottomGames.filter(g => g.result === "Win").length / bottomGames.length) * 100).toFixed(0) : 0;

  const codyWP = (totalGamesWithCody.filter(g => g.result === "Win").length / totalGamesWithCody.length * 100).toFixed(0);
  const sammyWP = (totalGamesWithSammy.filter(g => g.result === "Win").length / totalGamesWithSammy.length * 100).toFixed(0);
  const jasonWP = (totalGamesWithJason.filter(g => g.result === "Win").length / totalGamesWithJason.length * 100).toFixed(0);
  const codyAndSammyWP = (totalGamesWithCodyAndSammy.filter(g => g.result === "Win").length / totalGamesWithCodyAndSammy.length * 100).toFixed(0);
  const codyAndJasonWP = (totalGamesWithCodyAndJason.filter(g => g.result === "Win").length / totalGamesWithCodyAndJason.length * 100).toFixed(0);
  const codyAndSammyAndJasonWP = (totalGamesWithCodyAndSammyAndJason
    .filter(g => g.result === "Win").length / totalGamesWithCodyAndSammyAndJason.length * 100).toFixed(0);

  return {
    totalWP,
    topWP,
    bottomWP,
    codyWP,
    sammyWP,
    jasonWP,
    codyAndSammyWP,
    codyAndJasonWP,
    codyAndSammyAndJasonWP
  };
}

const { totalWP, topWP, bottomWP } = calculateWinPercentages(leagueMatchData);
// console.log(`Total Win %: ${totalWP}`);
// console.log(`Top Win %: ${topWP}`);
// console.log(`Bottom Win %: ${bottomWP}`);

const { codyWP, sammyWP, jasonWP, codyAndSammyWP, codyAndJasonWP, codyAndSammyAndJasonWP } = calculateWinPercentages(leagueMatchData);
// console.log(`Win % with Cody: ${codyWP}`);
// console.log(`Win % with Sammy: ${sammyWP}`);
// console.log(`Win % with Jason: ${jasonWP}`);
// console.log(`Win % with Cody and Sammy: ${codyAndSammyWP}`);
// console.log(`Win % with Cody and Jason: ${codyAndJasonWP}`);
// console.log(`Win % with Cody, Sammy and Jason: ${codyAndSammyAndJasonWP}`);

const lolCodyWinPercentage = document.querySelector("#lol-cody-win-percentage");
lolCodyWinPercentage.textContent = `Win % - ${codyWP}%`;                                          // EJS Input
const lolJasonWinPercentage = document.querySelector("#lol-jason-win-percentage");
lolJasonWinPercentage.textContent = `Win % - ${jasonWP}%`;
const lolSammyWinPercentage = document.querySelector("#lol-sammy-win-percentage");
lolSammyWinPercentage.textContent = `Win % - ${sammyWP}%`;


// Calculate champion win percentages
function calculateChampionWinPercentages(player, playerChampion, playerLane) {
  const gamesWon = (leagueMatchData.games
    .filter(g => g.players.some(p => p.name === player && p.champion === playerChampion && p.lane === playerLane))
    .filter(g => g.result === "Win").length);

  const totalGames = leagueMatchData.games
    .filter(g => g.players.some(p => p.name === player && p.champion === playerChampion && p.lane === playerLane)).length;
  const winPercentage = (gamesWon / totalGames * 100).toFixed(1);

  return {totalGames, summary:`${player} ${playerChampion} ${playerLane} WP = ${winPercentage}%`};
}

// console.log(calculateChampionWinPercentages("Jason", "Pantheon", "Jungle"));



// Calculate duo win percentages
function calculateDuoChampionWinPercentages(player1, player1Champion, player1Lane, player2, player2Champion, player2Lane) {
  const gamesWon = (leagueMatchData.games
    .filter(g => g.players.some(p => p.name === player1 && p.champion === player1Champion && p.lane === player1Lane)
      && g.players.some(p => p.name === player2 && p.champion === player2Champion && p.lane === player2Lane))
    .filter(g => g.result === "Win").length);

  const totalGames = leagueMatchData.games
    .filter(g => g.players.some(p => p.name === player1 && p.champion === player1Champion && p.lane === player1Lane)
      && g.players.some(p => p.name === player2 && p.champion === player2Champion && p.lane === player2Lane)).length;
  const winPercentage = (gamesWon / totalGames * 100).toFixed(1);

  return {totalGames, summary:`(${player1} ${player1Champion} ${player1Lane}) + (${player2} ${player2Champion} ${player2Lane}) WP = ${winPercentage}%`};
}

// console.log(calculateDuoChampionWinPercentages("Cody", "Neeko", "Support", "Sammy", "Kalista", "Adc"));


// Calculate Unkillables
function calculateUnkillables(data) {
  const codyUnkillables = data.games
    .filter(g => g.players.some(p => p.name === "Cody" && p.d === 0)).length;
  const codyUnkillablesWP = (codyUnkillables / data.games.filter(g => g.players.some(p => p.name === "Cody")).length * 100).toFixed(0);
  const sammyUnkillables = data.games
    .filter(g => g.players.some(p => p.name === "Sammy" && p.d === 0)).length;
  const sammyUnkillablesWP = (sammyUnkillables / data.games.filter(g => g.players.some(p => p.name === "Sammy")).length * 100).toFixed(0);
  const jasonUnkillables = data.games
    .filter(g => g.players.some(p => p.name === "Jason" && p.d === 0)).length;
  const jasonUnkillablesWP = (jasonUnkillables / data.games.filter(g => g.players.some(p => p.name === "Jason")).length * 100).toFixed(0);
  return {
    codyUnkillablesWP,
    codyUnkillables,
    sammyUnkillablesWP,
    sammyUnkillables,
    jasonUnkillablesWP,
    jasonUnkillables
  };
}

const { codyUnkillablesWP, codyUnkillables, sammyUnkillablesWP, 
sammyUnkillables, jasonUnkillablesWP, jasonUnkillables } = calculateUnkillables(leagueMatchData);

// console.log(`Cody Unkillables: ${codyUnkillablesWP}%, Total: ${codyUnkillables}`);             //EJS Input
// console.log(`Sammy Unkillables: ${sammyUnkillablesWP}%, Total: ${sammyUnkillables}`);
// console.log(`Jason Unkillables: ${jasonUnkillablesWP}%, Total: ${jasonUnkillables}`);

const lolCodyUnkillables = document.querySelector("#lol-cody-unkillables");
lolCodyUnkillables.textContent = `Unkillables: ${codyUnkillables} (${codyUnkillablesWP}%)`;

const lolSammyUnkillables = document.querySelector("#lol-sammy-unkillables");
lolSammyUnkillables.textContent = `Unkillables: ${sammyUnkillables} (${sammyUnkillablesWP}%)`;

const lolJasonUnkillables = document.querySelector("#lol-jason-unkillables");
lolJasonUnkillables.textContent = `Unkillables: ${jasonUnkillables} (${jasonUnkillablesWP}%)`;

// Calculate overall KDA
function calculateKDA(player) {
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let matchesPlayed = 0;

  leagueMatchData.games.forEach(game => {
    game.players.forEach(p => {
      if (p.name === player) {
        totalKills += p.k;
        totalDeaths += p.d;
        totalAssists += p.a;
        matchesPlayed ++;
      }
    })
  })

  const kda = totalDeaths === 0 ? (totalKills + totalAssists) : ((totalKills + totalAssists) / totalDeaths);

  return {
    player, 
    totalKills,
    totalDeaths,
    totalAssists,
    matchesPlayed,
    kda: kda.toFixed(1),
  }
}
// console.log(calculateKDA("Cody"));
// console.log(calculateKDA("Jason"));
// console.log(calculateKDA("Sammy"));

const lolCodyKDA = document.querySelector("#lol-cody-kda");         // EJS Input
lolCodyKDA.textContent = `KDA: ${calculateKDA("Cody").kda}`;

const lolJasonKDA = document.querySelector("#lol-jason-kda");
lolJasonKDA.textContent = `KDA: ${calculateKDA("Jason").kda}`;

const lolSammyKDA = document.querySelector("#lol-sammy-kda");
lolSammyKDA.textContent = `KDA: ${calculateKDA("Sammy").kda}`;

// Calculate KDA for specific champion
function calculateChampionKDA(player, champion) {
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let matchesPlayed = 0;

  leagueMatchData.games.forEach(game => {
    game.players.forEach(p => {
      if (p.name == player && p.champion == champion) {
        totalKills += p.k;
        totalDeaths += p.d;
        totalAssists += p.a;
        matchesPlayed++;
      }
    });
  });

  if (matchesPlayed === 0) {
    return `${player} has no games on ${champion}.`;
  }

  const kda = totalDeaths === 0 ? (totalKills + totalAssists) : ((totalKills + totalAssists) / totalDeaths);

  return {
    player,
    champion,
    matchesPlayed,
    totalKills,
    totalDeaths,
    totalAssists,
    kda: kda.toFixed(2)
  };
}
// console.log(calculateChampionKDA("Jason", "Pantheon").matchesPlayed);
// console.log(calculateChampionKDA("Jason", "Kayne"));
// console.log(calculateChampionKDA("Jason", "Aurelion Sol"));




// Calculate KDA for a duo
function calculateDuoKDA(player1, playerChamp1, playerLane1, player2, playerChamp2, playerLane2) {
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;
  let gamesTogether = 0;

  leagueMatchData.games.forEach(game => {
    const p1 = game.players.find(p => p.name === player1 && p.champion === playerChamp1 && p.lane === playerLane1);
    const p2 = game.players.find(p => p.name === player2 && p.champion === playerChamp2 && p.lane === playerLane2);

    if (p1 && p2) {
      totalKills += p1.k + p2.k;
      totalDeaths += p1.d + p2.d;
      totalAssists += p1.a + p2.a;
      gamesTogether++;
    }
  });

  if (gamesTogether === 0) {
    return `${player1} (${playerChamp1}) and ${player2} (${playerChamp2}) have no games together.`;
  }

  const kda = totalDeaths === 0
    ? totalKills + totalAssists
    : (totalKills + totalAssists) / totalDeaths;

  return {
    duo: `${player1} (${playerChamp1}) & ${player2} (${playerChamp2})`,
    gamesTogether,
    totalKills,
    totalDeaths,
    totalAssists,
    kda: kda.toFixed(2)
  };
};


// console.log(`${calculateDuoKDA("Sammy", "Aatrox", "Support", "Cody", "Swain", "Adc").duo}, 
//   ${calculateDuoKDA("Sammy", "Aatrox", "Adc", "Cody", "Neeko", "Support").kda},
//   ${calculateDuoKDA("Sammy", "Aatrox", "Adc", "Cody", "Neeko", "Support").gamesTogether}`);


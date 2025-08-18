import theFinalsData from './the-finals-data.js';


// Calculate worldtour wins 
const totalWorldTourWins = (data) => {
  return data.gameMode.worldTour.reduce((totalWins, game) => {
    return totalWins + (game.place === 1 ? 1 : 0);
  }, 0);
};
console.log(`World Tour Wins: ${totalWorldTourWins(theFinalsData)}`);


// Calculate worldtour win percentage
const worldTourWP = (data) => {
  const totalGames = data.gameMode.worldTour.length;
  const totalWins = totalWorldTourWins(data);
  return ((totalWins / totalGames) * 100).toFixed(0);
};
console.log(`World Tour Win Percentage: ${worldTourWP(theFinalsData)}%`);


// Calculate total cash earned in world tour and ranked modes
const totalCashEarned = (data) => {
  const worldTourCash = data.gameMode.worldTour.reduce((total, game) => total + game.cash, 0);
  const rankedCash = data.gameMode.ranked.reduce((total, game) => total + (game.cash || 0), 0);
  return worldTourCash + rankedCash;
};
console.log(`Total Cash Earned: $${totalCashEarned(theFinalsData)}`);


// Calculate average place in world tour
const averagePlaceWorldTour = (data) => {
  const totalPlaces = data.gameMode.worldTour.reduce((total, game) => total + game.place, 0);
  const totalGames = data.gameMode.worldTour.length;
  return (totalPlaces / totalGames).toFixed(1);
};
console.log(`Average Place in World Tour: ${averagePlaceWorldTour(theFinalsData)}`);


// Calculate Codys total games, kills, deaths, and assists in world tour
const codyTotalGames = theFinalsData.gameMode.worldTour
  .filter(game => game.players.some(player => player.name === 'Cody')).length;
const codyTotalKills = theFinalsData.gameMode.worldTour
  .reduce((totalKills, game) => {
    const codyPlayer = game.players.find(player => player.name === 'Cody');
    return totalKills + (codyPlayer ? codyPlayer.kills : 0);
  }, 0);
const codyTotalDeaths = theFinalsData.gameMode.worldTour
  .reduce((totalDeaths, game) => {
    const codyPlayer = game.players.find(player => player.name === 'Cody');
    return totalDeaths + (codyPlayer ? codyPlayer.deaths : 0);
  }, 0);
const codyTotalAssists = theFinalsData.gameMode.worldTour
  .reduce((totalAssists, game) => {
    const codyPlayer = game.players.find(player => player.name === 'Cody');
    return totalAssists + (codyPlayer ? codyPlayer.assists : 0);
  }, 0);
console.log(`Cody's Total Games: ${codyTotalGames}`);
console.log(`Cody's Total Kills: ${codyTotalKills}`);
console.log(`Cody's Total Deaths: ${codyTotalDeaths}`);
console.log(`Cody's Total Assists: ${codyTotalAssists}`);
console.log(`Cody's KDA: ${((codyTotalKills + codyTotalAssists) / (codyTotalDeaths )).toFixed(1)}`);


// Calculate Sammys total games, kills, deaths, and assists in world tour
const sammyTotalGames = theFinalsData.gameMode.worldTour
  .filter(game => game.players.some(player => player.name === 'Sammy')).length;
const sammyTotalKills = theFinalsData.gameMode.worldTour
  .reduce((totalKills, game) => {
    const sammyPlayer = game.players.find(player => player.name === 'Sammy');
    return totalKills + (sammyPlayer ? sammyPlayer.kills : 0);
  }, 0);
const sammyTotalDeaths = theFinalsData.gameMode.worldTour
  .reduce((totalDeaths, game) => {
    const sammyPlayer = game.players.find(player => player.name === 'Sammy');
    return totalDeaths + (sammyPlayer ? sammyPlayer.deaths : 0);
  }, 0);
const sammyTotalAssists = theFinalsData.gameMode.worldTour
  .reduce((totalAssists, game) => {
    const sammyPlayer = game.players.find(player => player.name === 'Sammy');
    return totalAssists + (sammyPlayer ? sammyPlayer.assists : 0);
  }, 0);
console.log(`Sammy's Total Games: ${sammyTotalGames}`);
console.log(`Sammy's Total Kills: ${sammyTotalKills}`);
console.log(`Sammy's Total Deaths: ${sammyTotalDeaths}`);
console.log(`Sammy's Total Assists: ${sammyTotalAssists}`);
console.log(`Sammy's KDA: ${((sammyTotalKills + sammyTotalAssists) / (sammyTotalDeaths )).toFixed(1)}`);


// Calculate Jasons total games, kills, deaths, and assists in world tour
const jasonTotalGames = theFinalsData.gameMode.worldTour
  .filter(game => game.players.some(player => player.name === 'Jason')).length;
const jasonTotalKills = theFinalsData.gameMode.worldTour
  .reduce((totalKills, game) => {
    const jasonPlayer = game.players.find(player => player.name === 'Jason');
    return totalKills + (jasonPlayer ? jasonPlayer.kills : 0);
  }, 0);
const jasonTotalDeaths = theFinalsData.gameMode.worldTour
  .reduce((totalDeaths, game) => {
    const jasonPlayer = game.players.find(player => player.name === 'Jason');
    return totalDeaths + (jasonPlayer ? jasonPlayer.deaths : 0);
  }, 0);
const jasonTotalAssists = theFinalsData.gameMode.worldTour
  .reduce((totalAssists, game) => {
    const jasonPlayer = game.players.find(player => player.name === 'Jason');
    return totalAssists + (jasonPlayer ? jasonPlayer.assists : 0);
  }, 0);
console.log(`Jason's Total Games: ${jasonTotalGames}`);
console.log(`Jason's Total Kills: ${jasonTotalKills}`);
console.log(`Jason's Total Deaths: ${jasonTotalDeaths}`);
console.log(`Jason's Total Assists: ${jasonTotalAssists}`);
console.log(`Jason's KDA: ${((jasonTotalKills + jasonTotalAssists) / (jasonTotalDeaths )).toFixed(1)}`);


// Calculate James total games, kills, deaths, and assists in world tour
const jamesTotalGames = theFinalsData.gameMode.worldTour
  .filter(game => game.players.some(player => player.name === 'James')).length;
const jamesTotalKills = theFinalsData.gameMode.worldTour
  .reduce((totalKills, game) => {
    const jamesPlayer = game.players.find(player => player.name === 'James');
    return totalKills + (jamesPlayer ? jamesPlayer.kills : 0);
  }, 0);
const jamesTotalDeaths = theFinalsData.gameMode.worldTour
  .reduce((totalDeaths, game) => {
    const jamesPlayer = game.players.find(player => player.name === 'James');
    return totalDeaths + (jamesPlayer ? jamesPlayer.deaths : 0);
  }, 0);
const jamesTotalAssists = theFinalsData.gameMode.worldTour
  .reduce((totalAssists, game) => {
    const jamesPlayer = game.players.find(player => player.name === 'James');
    return totalAssists + (jamesPlayer ? jamesPlayer.assists : 0);
  }, 0);
console.log(`James's Total Games: ${jamesTotalGames}`);
console.log(`James's Total Kills: ${jamesTotalKills}`);
console.log(`James's Total Deaths: ${jamesTotalDeaths}`);
console.log(`James's Total Assists: ${jamesTotalAssists}`);
console.log(`James's KDA: ${((jamesTotalKills + jamesTotalAssists) / (jamesTotalDeaths )).toFixed(1)}`);


// Calculate highest win steak in world tour
const highestWinStreak = (data) => {
  let maxStreak = 0;
  let currentStreak = 0;
  data.gameMode.worldTour.forEach(game => {
    if (game.place === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  });
  return Math.max(maxStreak, currentStreak);
};
console.log(`Highest Win Streak in World Tour: ${highestWinStreak(theFinalsData)}`);


// Calculate highest cash earned in a single world tour game
const highestCashInWorldTour = (data) => {
  return data.gameMode.worldTour.reduce((maxCash, game) => {
    return Math.max(maxCash, game.cash);
  }, 0);
};
console.log(`Highest Cash in a Single World Tour Game: $${highestCashInWorldTour(theFinalsData)}`);



// Calculate total games played inside world tour
const totalGamesInsideWorldTour = (data) => {
  let total = 0;
  data.gameMode.worldTour.forEach((game) => {
    if (game.place === 1 || 2) {
      total += 3;
    } else if (game.place === 3 || 4) {
      total += 3;
    } else {
      total += 3;
    };
  });
  return total;
};
console.log(`Total games played inside World Tour: ${totalGamesInsideWorldTour(theFinalsData)}`);
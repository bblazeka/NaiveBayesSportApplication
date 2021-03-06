export function getBasicPlayer(id) {
  return `{
    player(id: ${id}){ 
        id,
        fullName, 
        primaryPosition {
          code,
          name,
          type,
        }
        currentTeam {
          id,
          name
        }
      }
  }`
}

export function getBasicPlayerByName(name) {
  return `{
    searchPlayerByName(name: "${name}"){ 
        id,
        fullName, 
        primaryPosition {
          code,
          name,
          type,
        }
        currentTeam {
          id,
          name
        }
      }
  }`
}

export function getSkater(id) {
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName,
      currentAge,
      description,
      nationality,
      birthCity,
      birthDate,
      primaryPosition {
        code,
        name,
        type,
      }
      currentTeam {
        id,
        name
      },
      careerStats { 
        stats {
          season,
          team {
            id,
            name
          },
          league {
            id,
            name
          }
          stat {
            games,
            goals,
            assists,
            points,
            pim,
            plusMinus,
          }
        }
      },
      nhlStats {
        totalGames,
        totalGoals,
        totalAssists,
        totalPoints,
        goalsLine { x, y },
        assistsLine { x, y },
        stats { 
          season,
          team {
            id,
            name
          },
          stat {
            games,
            goals,
            assists,
            points,
            pim,
            plusMinus,
            timeOnIce,
            faceOffPct,
            shots,
            hits,
            blocked,
            evenTimeOnIce,
            powerPlayTimeOnIce,
            shortHandedTimeOnIce,
            shotPct,
            gameWinningGoals,
            powerPlayGoals,
            powerPlayPoints,
            shortHandedGoals,
            shortHandedPoints,
          }
        }
      }
    }
  }`
};

export function getGoalie(id) {
  return `{
    player(id: ${id}) { 
      id,
      jerseyNumber,
      fullName, 
      currentAge,
      nationality,
      description,
      birthCity,
      birthDate,
      primaryPosition {
        code,
        name,
        type,
      }
      currentTeam {
        id,
        name
      },
      careerStats { 
        stats {
          season,
          team {
            id,
            name
          },
          league {
            id,
            name
          }
          stat {
            games,
            goalAgainstAverage,
            savePercentage,
            wins,
            losses,
            ot
          }
        }
      },
      nhlStats {
        totalGames,
        totalGamesStarted,
        totalWins,
        gamesStartedLine { x, y },
        winsLine { x, y },
        stats {
          season,
          team {
            id,
            name
          },
          stat {
            games,
            gamesStarted,
            goalAgainstAverage,
            savePercentage,
            wins,
            losses,
            ot,
            evenSaves,  
            powerPlaySaves,
            shortHandedSaves,
            shotsAgainst,
            evenShots,
            powerPlayShots,
            shortHandedShots,
            evenStrengthSavePercentage,
            powerPlaySavePercentage,
            shortHandedSavePercentage,
            shutouts,
            timeOnIce
          }
        } 
      }
    }
  }`
};

export function getSelectedPlayers() {
  return `
  {
    selectedPlayers {
      ${getSelectedSkaterQuery()}
      ${getSelectedGoalieQuery()}
    }
  }`;
}

export function deleteSelectedPlayer(id) {
  return `
    mutation {
      deleteSelectedPlayer(id: ${id}) {
        ${getSelectedSkaterQuery()}
        ${getSelectedGoalieQuery()}
      }
    }`;
}

export function removeAllPlayers() {
  return `
    mutation {
      clearSelectedPlayers {
        ${getSelectedSkaterQuery()}
        ${getSelectedGoalieQuery()}
      }
    }`;
}

export function addSelectedPlayer(id) {
  return `
      mutation {
        addSelectedPlayer(id: ${id}) {
          ${getSelectedSkaterQuery()}
          ${getSelectedGoalieQuery()}
        }
      }`;
}

function getSelectedSkaterQuery() {
  return `
  skaters { 
    player { 
      id, 
      fullName,
      currentTeam { id },
      primaryPosition { abbreviation }
    }
    stats {
      splits {
        stat {
          games,
          goals,
          assists,
          points,
          pim,
          plusMinus,
          faceOffPct,
          shots,
          hits,
          blocked,
          timeOnIce,
          evenTimeOnIce,
          powerPlayTimeOnIce,
          shortHandedTimeOnIce,
          shotPct,
          gameWinningGoals,
          powerPlayGoals,
          powerPlayPoints,
          shortHandedGoals,
          shortHandedPoints
        }
      }
    }
  }`;
}

  function getSelectedGoalieQuery() {
    return `
    goalies {  
      player { 
        id, 
        fullName,
        currentTeam { id },
        primaryPosition { abbreviation }
      }
      stats {
        splits {
          stat {
            games,
            gamesStarted,
            goalAgainstAverage,
            savePercentage,
            wins,
            losses,
            ot,
            saves,
            evenSaves,
            powerPlaySaves,
            shortHandedSaves,
            shotsAgainst,
            evenShots,
            powerPlayShots,
            shortHandedShots,
            evenStrengthSavePercentage,
            powerPlaySavePercentage,
            shortHandedSavePercentage,
            shutouts,
            timeOnIce
          }
        }
      }
    }`;
  }
class LiveMatchService {
  constructor() {
    this.reset();
  }

  reset() {
    this.match = {
      matchId: 101,
      homeTeam: {
        id: 65,
        name: "Manchester City",
        shortName: "Man City",
        crest: "https://crests.football-data.org/65.png",
      },
      awayTeam: {
        id: 64,
        name: "Liverpool",
        shortName: "Liverpool",
        crest: "https://crests.football-data.org/64.png",
      },
      homeScore: 1,
      awayScore: 1,
      minute: 54,
      status: "LIVE - 2ND HALF",
      stadium: "Etihad Stadium, Manchester",
      referee: "Michael Oliver",
      attendance: "53,400",
      stats: {
        possession: { home: 58, away: 42 },
        shots: { home: 14, away: 9 },
        shotsOnTarget: { home: 6, away: 4 },
        xG: { home: 1.84, away: 1.22 },
        corners: { home: 7, away: 4 },
        fouls: { home: 8, away: 11 },
        yellowCards: { home: 1, away: 2 },
        passAccuracy: { home: 90, away: 84 },
      },
      momentum: [
        { minute: 10, value: 25 },
        { minute: 20, value: 45 },
        { minute: 30, value: -30 },
        { minute: 40, value: 15 },
        { minute: 50, value: 60 },
      ],
      events: [
        {
          minute: 14,
          type: "GOAL",
          team: "Manchester City",
          player: "Erling Haaland",
          assist: "Kevin De Bruyne",
          description: "Clinical left-footed finish inside the bottom right corner after a threaded through ball.",
        },
        {
          minute: 28,
          type: "YELLOW_CARD",
          team: "Liverpool",
          player: "Alexis Mac Allister",
          description: "Tactical foul breaking up a counter attack.",
        },
        {
          minute: 37,
          type: "GOAL",
          team: "Liverpool",
          player: "Mohamed Salah",
          assist: "Trent Alexander-Arnold",
          description: "Curling effort from the right edge of the box into the top corner.",
        },
        {
          minute: 51,
          type: "SUBSTITUTION",
          team: "Liverpool",
          playerIn: "Luis Díaz",
          playerOut: "Cody Gakpo",
          description: "Tactical change bolstering left-flank directness.",
        },
      ],
      commentary: [
        {
          minute: 54,
          text: "Intense battle in central midfield as Rodri intercepts and initiates another attack.",
        },
        {
          minute: 51,
          text: "Arne Slot makes his first tactical switch, bringing on Luis Díaz.",
        },
        {
          minute: 45,
          text: "Second half underway under the floodlights at the Etihad Stadium.",
        },
      ],
    };
  }

  getLiveState() {
    return this.match;
  }

  tick() {
    if (this.match.minute >= 95) {
      this.match.status = "FULL TIME";
      return this.match;
    }

    this.match.minute += 1;

    // Gradual statistical fluctuation
    if (Math.random() > 0.4) {
      const homeDominating = Math.random() > 0.45;
      const swing = homeDominating ? Math.floor(Math.random() * 40) + 10 : -Math.floor(Math.random() * 40) - 10;
      this.match.momentum.push({ minute: this.match.minute, value: swing });
      if (this.match.momentum.length > 15) {
        this.match.momentum.shift();
      }

      if (homeDominating) {
        this.match.stats.possession.home = Math.min(68, this.match.stats.possession.home + 0.2);
        this.match.stats.possession.away = 100 - this.match.stats.possession.home;
      }
    }

    // Dynamic events simulation
    if (this.match.minute === 67) {
      this.match.homeScore += 1;
      this.match.stats.shots.home += 1;
      this.match.stats.shotsOnTarget.home += 1;
      this.match.stats.xG.home = Number((this.match.stats.xG.home + 0.65).toFixed(2));
      const event = {
        minute: 67,
        type: "GOAL",
        team: "Manchester City",
        player: "Phil Foden",
        assist: "Bernardo Silva",
        description: "Brilliant first-time volley into the roof of the net following a cutback!",
      };
      this.match.events.unshift(event);
      this.match.commentary.unshift({
        minute: 67,
        text: "GOAL! Phil Foden puts Manchester City back ahead with a thunderous strike!",
      });
    } else if (this.match.minute === 78) {
      const event = {
        minute: 78,
        type: "YELLOW_CARD",
        team: "Manchester City",
        player: "Rúben Dias",
        description: "Mistimed sliding tackle on the halfway line.",
      };
      this.match.events.unshift(event);
      this.match.commentary.unshift({
        minute: 78,
        text: "Yellow card shown to Rúben Dias for a professional foul.",
      });
    } else if (this.match.minute === 85) {
      this.match.stats.xG.away = Number((this.match.stats.xG.away + 0.32).toFixed(2));
      this.match.stats.shots.away += 1;
      this.match.commentary.unshift({
        minute: 85,
        text: "HUGE CHANCE! Darwin Núñez strikes the outside of the post from 6 yards out!",
      });
    } else if (this.match.minute === 90) {
      this.match.status = "ADDED TIME (+4')";
      this.match.commentary.unshift({
        minute: 90,
        text: "Fourth official indicates a minimum of 4 minutes added time.",
      });
    } else if (this.match.minute === 94) {
      this.match.status = "FULL TIME";
      this.match.commentary.unshift({
        minute: 94,
        text: "PEEEP! Full time whistle blown. A pulsating encounter at the Etihad!",
      });
    }

    return this.match;
  }
}

const liveMatchService = new LiveMatchService();

module.exports = liveMatchService;
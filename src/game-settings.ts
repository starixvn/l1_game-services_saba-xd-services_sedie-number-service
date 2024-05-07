import { BET_CHOICES } from "./constants";

export default {
    id: 1005,
    name: "SeBall1",
    durations: {
        wholeRound: 26,
        placingBets: 15,
        lockingBet: 3,
        showingResult: 4,
        wholeTurn: 22,
        startingRound: 4,
    },
    choices: Object.values(BET_CHOICES),
    choicesMapper: { odd: 1, even: 2, red3: 3, red4: 4, blue3: 5, blue4: 6, red2: 7 },
    hedgeBetGroups: [["odd", "even"]],
    numberOfTurnsPerRound: 1,
    numberOfRoundHistory: 108,
    historyPageSize: 30,
    provablyFair: true,
    botSettings: {
        ratio: { oddEvenOptions: 70, rareOptions: 30 },
        oddEvenOptions: ["odd", "even"],
        rareOptions: ["red3", "red4", "blue3", "blue4", "red2"],
    },
};

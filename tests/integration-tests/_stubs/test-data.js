import gameSetting from "./game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { odd: 3000, even: 3000, red3: 3000, red4: 3000, blue2: 3000, blue4: 3000, red2: 3000 },
    odds: { odd: 2, even: 2, red3: 2, red4: 2, blue2: 2, blue4: 2, red2: 2 },
    margin: [],
    botenabled: false,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
    choices_maxbet: { odd: 3000, even: 3000, red3: 3000, red4: 3000, blue2: 3000, blue4: 3000, red2: 3000 },
};

const pfResults = [
    {
        clientSeeds: [],
        roundId: 2,
        drawId: 2,
        serverSeedHash: "f748de2c1bfdf59d652cab74345b162016a4b82b004fb53358be4f467e968e49",
        encryptedServerSeed: {
            iv: "65bf43504980355a40fd449f42ea4b49",
            content:
                "10985698b1617c9903dc9e1792b1dfc14b8788e4e27a0ca61e7c3f8b32b77ed693f624d813f1a06c91a7a12cecba416813910e824f60fda04db6462122361ccbeb6874",
        },
        finalHash:
            "cda6c51e5b39ef85412977cb9067c1a7186942dd7f5b5d4c7c21617725fafa87f90fa348ff72e2c57d8da9e1ca62bb6c8514840de5034ae11905ce04563e2b8e",
        mergeClientSeed: "",
        mergeSeed: '{"random":"4;49;56;75","secret":"gTzSkuq8qDEh5bTR2jcvtSA2_E6G66KL"}',
    },
];

const roundsData = [
    {
        ended: true,
        id: 1,
        drawId: 1,
        result: [
            {
                balls: [18, 28, 43, 42],
                drawId: 1,
            },
        ],
        settlementResult: [
            {
                odd: true,
                even: false,
                red3: false,
                red4: false,
                blue3: false,
                blue4: false,
                red2: true,
                drawId: 1,
            },
        ],
    },
];

const userBetData = (uid) => {
    return [
        {
            uid: uid,
            drawId: 2,
            freeBet: false,
            roundId: 2,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: gameConfig.odds,
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: false,
            odd: 140,
            totalAmount: 140,
        },
    ];
};

const userBetLogData = (uid) => {
    return [
        {
            amount: 20,
            rebet: false,
            roundId: 2,
            drawId: 2,
            uid: uid,
            name: "Bird4252",
            time: "2024-03-06T02:10:48.915Z",
            choice: "under",
            siteId: "4100300",
            currency: "INH",
            rate: 1000,
            operatorId: "ONEworksVGCash",
            playerId: 2609,
        },
    ];
};

const promotions = [
    {
        gameId: gameSetting.id,
        startDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
        endDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15 + 6)),
        isDaily: false,
        odds: gameConfig.odds,
        status: "enabled",
    },
];

export { game, currencyData, socketOptionsFunc, gameConfig, roundsData, userBetData, promotions, userBetLogData, pfResults };

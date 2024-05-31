import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { ProcessBetQueue } from "../../../src/crons";
import { stub } from "jest-auto-stub";

describe(ProcessBetQueue.name, () => {
    describe("adjustPlayerBetCount", () => {
        const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();
        const player = { UID: "123" };
        const subBetChoices = { red2: 10, red3: 10, red4: 10, blue3: 10, blue4: 10 };
        it("should calculate playerBetCount correctly when bet include odd", () => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const processBetQueue = new ProcessBetQueue({ gameData, gameManagementApiClientFactory });
            const bet = { betChoices: { ...subBetChoices, odd: 10 } };

            // act
            processBetQueue.adjustPlayerBetCount(player, bet as any);

            // assert
            expect(gameData.playerBetCount).toEqual({ odd: ["123"] });
        });

        it("should calculate playerBetCount correctly when bet include even", () => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const processBetQueue = new ProcessBetQueue({ gameData, gameManagementApiClientFactory });
            const bet = { betChoices: { ...subBetChoices, even: 10 } };

            // act
            processBetQueue.adjustPlayerBetCount(player, bet as any);

            // assert
            expect(gameData.playerBetCount).toEqual({ even: ["123"] });
        });
    });
});

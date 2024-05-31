import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { Bot } from "../../../src/crons";
import { stub } from "jest-auto-stub";

describe(Bot.name, () => {
    describe("updatePlayerBetCount", () => {
        const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();

        const playerId = "123";
        it.each(["odd", "even"])("should count playerBetCount when bet is odd/even", (choice) => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const bot = new Bot({}, gameData, null, gameManagementApiClientFactory, null, null);

            // act
            bot.updatePlayerBetCount(playerId, choice);

            // assert
            expect((gameData.playerBetCount as any)[choice]).toEqual([playerId]);
        });

        it.each(["red2", "red3", "red4", "blue3", "blue4"])("should not count playerBetCount when bet is not odd/even", (choice) => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const bot = new Bot({}, gameData, null, gameManagementApiClientFactory, null, null);

            // act
            bot.updatePlayerBetCount(playerId, choice);

            // assert
            expect((gameData.playerBetCount as any)[choice]).toBeUndefined();
        });
    });
});

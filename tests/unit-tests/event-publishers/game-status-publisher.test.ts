import { GameData } from "sc-number-game-base";
import { GameStatusPublisher } from "../../../src/event-publishers";
import { stub } from "jest-auto-stub";

describe("running-round-info-publisher test", () => {
    let publisher: GameStatusPublisher;
    const gameData = stub<GameData>();

    beforeEach(() => {
        publisher = new GameStatusPublisher("NextBall1", gameData);
    });

    describe("getOddsRange", () => {
        it("should return correct", () => {
            // Arrange
            gameData.gameConfigs.odds = { over: 2, under: 2, odd: 2, even: 2 };

            const expectedOddsRange = { over: 2, under: 2, odd: 2, even: 2 };

            // act
            const actual = publisher.getOddsRange();

            // assert
            expect(actual).toStrictEqual(expectedOddsRange);
        });
    });
});

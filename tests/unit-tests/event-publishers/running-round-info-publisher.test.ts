import { GameData } from "sc-number-game-base";
import RunningRoundInfoPublisher from "../../../src/event-publishers/running-round-info-publisher";
import { EventPublishers } from "sc-number-game-base";
import { stub } from "jest-auto-stub";

describe("running-round-info-publisher test", () => {
    let publisher: RunningRoundInfoPublisher;
    const gameData = stub<GameData>();

    beforeEach(() => {
        publisher = new RunningRoundInfoPublisher("NextBall1", gameData);
        jest.spyOn(EventPublishers.RunningRoundInfoPublisher.prototype, "getBetPercentageAndPlayerBetCount").mockReturnValue({
            betPercentage: { odd: 66.6, even: 33.3 },
            playerBetCount: { odd: 2, even: 1 },
        });
    });

    it("inherit RunningRoundInfoPublisher of sc-number-game-base", () => {
        expect(publisher instanceof EventPublishers.RunningRoundInfoPublisher);
    });

    describe("getBetPercentageAndPlayerBetCount", () => {
        it("should call super.getBetPercentageAndPlayerBetCount", () => {
            // act
            publisher.getBetPercentageAndPlayerBetCount();

            // assert
            expect(EventPublishers.RunningRoundInfoPublisher.prototype.getBetPercentageAndPlayerBetCount).toHaveBeenCalled();
        });

        it("should return correct", () => {
            // act
            const actual = publisher.getBetPercentageAndPlayerBetCount();

            // assert
            expect(actual).toStrictEqual({
                betPercentage: { odd: 66, even: 34 },
                playerBetCount: { odd: 2, even: 1 },
            });
        });
    });
});

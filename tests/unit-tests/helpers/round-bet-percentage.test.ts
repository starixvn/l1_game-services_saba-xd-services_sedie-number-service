import { roundBetPercentage } from "../../../src/helpers/round-bet-percentage";

describe("round bet percentage tests", () => {
    const testCases = [
        {
            betPercentage: {
                odd: 24.5,
                even: 75.5,
            },

            expected: {
                odd: 24,
                even: 76,
            },
        },
        {
            betPercentage: {
                odd: 24.9,
                even: 75.1,
            },

            expected: {
                odd: 24,
                even: 76,
            },
        },
    ];
    it.each(testCases)("should return expected", ({ betPercentage, expected }) => {
        // act
        const actual = roundBetPercentage(betPercentage);

        // assert
        expect(actual).toEqual(expected);
    });
});

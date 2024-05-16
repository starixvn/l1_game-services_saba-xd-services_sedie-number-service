import * as resultHelper from "../../../src/helpers/result-helper";

jest.mock("sc-game-base/src/core/helpers", () => ({
    ServerSeedHelper: { generateServerSeed: jest.fn().mockReturnValue("123asd") },
}));

jest.mock("../../../src/constants.ts", () => ({
    ...jest.requireActual("../../../src/constants.ts"),
    TOTAL_BALLS: 80,
}));

describe("result helper tests", () => {
    describe("finalHashToNumbers", () => {
        it("should return expected", () => {
            // arrange
            const finalHash = "123b5c4f";

            // act
            const actual = resultHelper.finalHashToNumbers(finalHash);

            // assert
            expect(actual).toEqual([18, 59, 92, 79]);
        });
    });

    describe("generateResult", () => {
        it("should return expected", () => {
            // arrange
            const serverSeed = '{"random":"29;65;79;47","secret":"123asd"}';

            const finalSeeds = {
                serverSeed: serverSeed,
                finalHash: "123b5c4f",
            };

            // act
            const actual = resultHelper.generateResult(finalSeeds);

            // assert
            expect(actual).toEqual({ balls: [48, 46, 16, 53] });
        });
    });

    describe("getSettlementResult", () => {
        const testCases = [
            {
                result: {
                    balls: ["1", "2", "3", "4"],
                },
                expected: {
                    odd: false,
                    even: true,
                    red4: false,
                    red3: false,
                    red2: true,
                    blue4: false,
                    blue3: false,
                },
            },
            {
                result: {
                    balls: [1, 3, 5, 4],
                },
                expected: {
                    odd: true,
                    even: false,
                    red4: false,
                    red3: false,
                    red2: false,
                    blue4: false,
                    blue3: true,
                },
            },
        ];
        it.each(testCases)("should return expected", ({ result, expected }) => {
            // act
            const actual = resultHelper.getSettlementResult(result as any);

            // assert
            expect(actual).toEqual(expected);
        });
    });
});

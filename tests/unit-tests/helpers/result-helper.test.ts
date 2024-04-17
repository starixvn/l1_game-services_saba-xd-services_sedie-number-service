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
        it("should return expected", () => {
            // arrange
            const result = {
                balls: [1, 2, 3, 4],
            } as any;

            // act
            const actual = resultHelper.getSettlementResult(result);

            // assert
            expect(actual).toEqual({
                odd: false,
                even: true,
                red4: false,
                red3: false,
                red2: true,
                blue4: false,
                blue3: false,
            });
        });
    });
});

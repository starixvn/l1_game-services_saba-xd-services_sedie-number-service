import { Utils } from "@rd/numbers-game-probabilities";
import { DrawResult } from "../models/rounds";
import { BALLS_EACH_ROUND, RED_BALLS, TOTAL_BALLS } from "../constants";
import { generateRemainingBalls } from "sc-number-game-base/dist/helpers";

export type FinalSeeds = {
    serverSeed: string;
    finalHash: string;
};

export const generateResult = (finalSeeds: FinalSeeds) => {
    const serverSeed = JSON.parse(finalSeeds.serverSeed);

    const random = serverSeed.random.split(";").map((x: string) => +x) as number[];

    const increments = finalHashToNumbers(finalSeeds.finalHash);

    const ballIndexes = random.map((x, index) => (x + increments[index]) % (TOTAL_BALLS - index));

    let remainingBalls = generateRemainingBalls(TOTAL_BALLS, []);

    const balls: number[] = [];

    ballIndexes.forEach((i) => {
        balls.push(remainingBalls[i]);
        remainingBalls = generateRemainingBalls(TOTAL_BALLS, balls);
    });

    return { balls };
};

export const finalHashToNumbers = (finalHash: string) => {
    const increments = [];
    for (let i = 0; i < BALLS_EACH_ROUND; i++) {
        const value = parseInt(finalHash.slice(i * 2, i * 2 + 2), 16);
        increments.push(value);
    }
    return increments;
};

export const getSettlementResult = (result: DrawResult) => {
    const sum = Utils.getSum(result.balls);
    const odd = Utils.isOdd(sum);
    const totalReds = getTotalReds(result.balls);

    return {
        odd,
        even: !odd,
        red2: totalReds === 2,
        red3: totalReds === 3,
        red4: totalReds === 4,
        blue3: totalReds === 1,
        blue4: totalReds === 0,
    };
};

const getTotalReds = (balls: number[]) => {
    let totalReds = 0;
    balls.forEach((ball) => {
        if (RED_BALLS.includes(+ball)) {
            totalReds++;
        }
    });
    return totalReds;
};

export const getProbabilities = (roundResult: DrawResult[]) => {};

export const generateRawResultForHash = () => {};

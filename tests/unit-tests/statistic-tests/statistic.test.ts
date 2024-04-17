import { GameData, GameDefinition } from "sc-number-game-base";
import { RoundResultConsumer } from "../../../src/event-consumers";
import { stub } from "jest-auto-stub";
import { RoundResultPublisher } from "sc-number-game-base/dist/event-publishers";
import { ProvablyFairConsumer } from "sc-number-game-base/dist/event-consumers";
import * as Helpers from "../../../src/helpers/result-helper";
import Chance from "chance";
import { SeedHelper } from "sc-game-base/src/core/helpers";
import gameSettings from "../../../src/game-settings";
import { DrawResult } from "../../../src/models/rounds";
import { GameConfigs } from "sc-game-base/src/core/game-data";

const chance = new Chance();

function generateSeed(): string {
    return chance.ssn({ ssnFour: true });
}

describe("statistic test", () => {
    let consumer: RoundResultConsumer;
    const gameData = stub<GameData>();
    const definition = stub<GameDefinition>();
    const publisher = stub<RoundResultPublisher>();
    const provablyFairConsumer = stub<ProvablyFairConsumer>();
    const numberOfTurnsToRun = 100_000 * gameSettings.numberOfTurnsPerRound;

    beforeEach(() => {
        consumer = new RoundResultConsumer(gameData, definition, publisher, null, provablyFairConsumer);
        consumer.gameData.roundResult = [];
    });

    describe("statistic test", () => {
        for (let randomMode = 1; randomMode < 4; randomMode++) {
            it("should return expected", () => {
                gameData.gameConfigs = {
                    randomMode: randomMode,
                } as GameConfigs;

                const expectedProbabilities = {
                    odd: 49.5,
                    even: 49.5,
                    red4: 5,
                    red3: 24.5,
                    blue4: 5,
                    blue3: 24.5,
                    red2: 38,
                };

                const statistic: any = {
                    odd: 0,
                    even: 0,
                    red4: 0,
                    red3: 0,
                    blue4: 0,
                    blue3: 0,
                    red2: 0,
                };

                for (let turn = 1; turn <= numberOfTurnsToRun; turn++) {
                    const numberOfClients = chance.integer({ min: 0, max: 20 });
                    let mergeClientSeed = "";
                    for (let i = 0; i < numberOfClients; i++) {
                        mergeClientSeed += generateSeed();
                    }

                    const serverSeed = consumer.generateServerSeed();

                    const mergeSeed = serverSeed + mergeClientSeed;
                    const finalHash = SeedHelper.getSHA512Hash(mergeSeed);

                    const result = Helpers.generateResult({ finalHash, serverSeed });
                    const settlementResult: any = Helpers.getSettlementResult(result as DrawResult);

                    Object.keys(settlementResult).forEach((opt) => {
                        if (settlementResult[opt]) statistic[opt]++;
                    });
                }

                const probabilities = {
                    odd: (statistic.odd / numberOfTurnsToRun) * 100,
                    even: (statistic.even / numberOfTurnsToRun) * 100,
                    red4: (statistic.red4 / numberOfTurnsToRun) * 100,
                    red3: (statistic.red3 / numberOfTurnsToRun) * 100,
                    blue4: (statistic.blue4 / numberOfTurnsToRun) * 100,
                    blue3: (statistic.blue3 / numberOfTurnsToRun) * 100,
                    red2: (statistic.red2 / numberOfTurnsToRun) * 100,
                };

                expect(probabilities.odd).toBeGreaterThanOrEqual(expectedProbabilities.odd);
                expect(probabilities.even).toBeGreaterThanOrEqual(expectedProbabilities.even);
                expect(probabilities.red3).toBeGreaterThanOrEqual(expectedProbabilities.red3);
                expect(probabilities.red4).toBeGreaterThanOrEqual(expectedProbabilities.red4);
                expect(probabilities.red2).toBeGreaterThanOrEqual(expectedProbabilities.red2);
                expect(probabilities.blue4).toBeGreaterThanOrEqual(expectedProbabilities.blue4);
                expect(probabilities.blue3).toBeGreaterThanOrEqual(expectedProbabilities.blue3);
            });
        }
    });
});

import { EventConsumers } from "sc-number-game-base";
import { ServerSeedHelper } from "sc-game-base/src/core/helpers";
import { BALLS_EACH_ROUND, SERVER_SEED_SECRET_LENGTH, TOTAL_BALLS } from "../constants";
import { generateRandomNumbers } from "../helpers";

export default class RoundResultConsumer extends EventConsumers.RoundResultConsumer {
    generateServerSeed() {
        const { randomMode } = this.gameData.gameConfigs;
        const randomBalls = generateRandomNumbers(randomMode, BALLS_EACH_ROUND, TOTAL_BALLS).join(";");

        const serverSeedSecret = ServerSeedHelper.generateServerSeed(randomMode, SERVER_SEED_SECRET_LENGTH);

        return `{"random":"${randomBalls}","secret":"${serverSeedSecret}"}`;
    }
}

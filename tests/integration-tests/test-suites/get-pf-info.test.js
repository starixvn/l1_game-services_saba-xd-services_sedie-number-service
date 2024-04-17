import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { initUserSession } from "../helper/helper";
import { socketOptionsFunc } from "../_stubs/test-data";
import appConfigs from "../../../build/app-configs.IGT";

const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("when getPfInfo", () => {
    let client;

    beforeEach(async () => {
        client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        const sendSignInInterval = setInterval(() => {
            client.sendSignInEvent();
        }, 500);

        await client.handleSignedInEvent();

        client.sendInGameEvent();

        clearInterval(sendSignInInterval);
    });

    afterEach(() => {
        client.close();
        client = null;
    });

    it("should return pfInfo", async () => {
        // Arrange
        client.emit("getPfInfo", { drawId: 2 });
        const pfInfo = {
            clientSeeds: [],
            roundId: 2,
            drawId: 2,
            serverSeedHash: "f748de2c1bfdf59d652cab74345b162016a4b82b004fb53358be4f467e968e49",
            serverSeed: "{\"random\":\"4;49;56;75\",\"secret\":\"gTzSkuq8qDEh5bTR2jcvtSA2_E6G66KL\"}",
            encryptedServerSeed: {
                iv: "65bf43504980355a40fd449f42ea4b49",
                content:
                    "10985698b1617c9903dc9e1792b1dfc14b8788e4e27a0ca61e7c3f8b32b77ed693f624d813f1a06c91a7a12cecba416813910e824f60fda04db6462122361ccbeb6874",
            },
            finalHash:
                "cda6c51e5b39ef85412977cb9067c1a7186942dd7f5b5d4c7c21617725fafa87f90fa348ff72e2c57d8da9e1ca62bb6c8514840de5034ae11905ce04563e2b8e",
            mergeClientSeed: "",
            mergeSeed: "{\"random\":\"4;49;56;75\",\"secret\":\"gTzSkuq8qDEh5bTR2jcvtSA2_E6G66KL\"}",
        };

        // Act
        const actual = await client.handleGameEvent((data) => data.clientSeedDetail);

        // Assert
        expect(actual.pfResult.serverSeedHash).toEqual(pfInfo.serverSeedHash);
        expect(JSON.stringify(actual.pfResult.serverSeed)).toEqual(JSON.stringify(pfInfo.serverSeed));
        expect(actual.clientSeedDetail).toEqual({});
    });
});

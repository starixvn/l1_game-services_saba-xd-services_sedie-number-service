import { EventConsumers } from "sc-number-game-base";
import { FinishDraw } from "sc-number-game-base/dist/event-consumers/settle-game-round-consumer";

export default class SettleGameRoundConsumer extends EventConsumers.SettleGameRoundConsumer {
    async settleRound() {
        let roundSettled: any;
        const drawResult = this.gameData.result;
        const drawSettlementResult = this.definition.settle(drawResult);
        const { roundId, drawId, exchangeRates } = this.gameData;
        Object.assign(drawResult, { drawId: drawId, time: new Date() });
        Object.assign(drawSettlementResult, { drawId: drawId });

        roundSettled = await this.roundsRepository.create({
            id: roundId,
            drawId: drawId,
            result: [drawResult],
            settlementResult: [drawSettlementResult],
            time: new Date(),
            exchangeRateId: exchangeRates.exId,
            ended: true,
        });

        if (roundSettled) {
            const finishDraw: FinishDraw = {
                result: drawResult,
                settlementResult: drawSettlementResult,
                roundId: roundSettled.id,
                drawId: roundSettled.drawId,
                time: drawResult.time,
                isLastDraw: roundSettled.ended,
            };
            this.roundResultPublisher.publishRoundResult(finishDraw);
            this.updateRoundData(finishDraw);
            await this.settleBets(finishDraw);
            this.roundResultPublisher.publishWinners(roundId, this.gameData.winningPlayers, drawId);
        }
    }

    updateRoundData(finishDraw: FinishDraw) {
        this.gameData.drawId = finishDraw.drawId + 1;
        this.gameData.roundId = finishDraw.roundId + 1;
    }
}

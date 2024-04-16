import mongoose from "mongoose";

const modelName = "seball1_rounds";

export type DrawResult = {
    drawId: number;
    balls: number[];
};

const resultSchema = new mongoose.Schema<DrawResult>(
    {
        drawId: { type: Number, require: true },
        balls: { type: [Number], required: true },
        time: { type: Date, default: new Date() },
    },
    {
        _id: false,
    }
);

export type DrawSettlementResult = {
    drawId: number;
    odd: boolean;
    even: boolean;
    red3: boolean;
    red4: boolean;
    blue3: boolean;
    blue4: boolean;
    red2: boolean;
};

const settlementResultSchema = new mongoose.Schema<DrawSettlementResult>(
    {
        drawId: { type: Number, require: true },
        odd: { type: Boolean, default: false },
        even: { type: Boolean, default: false },
        red3: { type: Boolean, default: false },
        red4: { type: Boolean, default: false },
        blue3: { type: Boolean, default: false },
        blue4: { type: Boolean, default: false },
        red2: { type: Boolean, default: false },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: { type: [resultSchema] },
    settlementResult: { type: [settlementResultSchema] },
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, require: true },
    drawId: { type: Number, require: true },
    ended: { type: Boolean, default: false },
});

export default mongoose.model(modelName, Schema);

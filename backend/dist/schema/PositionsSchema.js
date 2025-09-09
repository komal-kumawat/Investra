"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PositionsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    avg: { type: Number, required: true },
    net: { type: String, required: true },
    day: { type: String, required: true },
    product: { type: String, required: true },
    isLoss: { type: Boolean, default: false }
});
const PositionsModel = mongoose_1.default.model("PositionsModel", PositionsSchema);
exports.default = PositionsModel;

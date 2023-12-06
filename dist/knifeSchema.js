"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnifeSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.KnifeSchema = new Schema({
    number: Number,
    src: String,
    size: String,
    rapport: String,
    fragments: Number,
    fragmentsMargin: String,
    streams: Number,
    streamsMargin: Schema.Types.Mixed,
    circle: Boolean,
    width: Number,
    height: Number,
    double: Boolean,
    base64: String
});

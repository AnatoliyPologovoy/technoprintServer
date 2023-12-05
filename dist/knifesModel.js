"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knifesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const knifeSchema_1 = require("./knifeSchema");
exports.knifesModel = mongoose_1.default.model('Knifes', knifeSchema_1.KnifeSchema);

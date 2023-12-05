"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const knifesModel_1 = require("./knifesModel");
const uri = "mongodb+srv://photoje:8mEYCTWaC5KnA7G4@cluster0.tgvvgdy.mongodb.net/?retryWrites=true&w=majority";
// const setKnifes = async (items: Knifes[]) => {
//     if ((await knifesModel.find()).length === 0) {
//         items.forEach(async (item) => {
//             const newKnife = new knifesModel(item)
//             await newKnife.save()
//         })
//     }
// }
// const addBase64toBD = async () => {
//     newKnifesWithBase64.forEach( async (item) => {
//         await knifesModel.updateOne({number: item.number}, {base64: item.base64})
//     })
// }
mongoose_1.default
    .connect(uri)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // await setKnifes(knifes)
    // addBase64toBD()
    console.log('mongoDB connected');
}))
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// For testing purposes
app.use('/assets', express_1.default.static('assets'));
app.get('/', (req, res) => {
    res.send("<h2>It's Working  1 23!</h2>");
});
app.get('/knifes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allKnifes = yield knifesModel_1.knifesModel.find();
    res.send(allKnifes);
}));
app.get('/knifes/:number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const knifesNumber = req.params.number;
    const knifesResult = yield knifesModel_1.knifesModel.find({ number: knifesNumber });
    if (knifesResult) {
        res.send(knifesResult);
    }
    else
        res.status(403).send('Knife not found');
}));
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});

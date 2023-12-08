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
const cors_1 = __importDefault(require("cors"));
const checkQuery_1 = require("./helpers/checkQuery");
const uri = "mongodb+srv://photoje:8mEYCTWaC5KnA7G4@cluster0.tgvvgdy.mongodb.net/?retryWrites=true&w=majority";
// const setKnifes = async (items: Knifes[]) => {
//     if ((await knifesModel.find()).length === 0) {
//         items.forEach(async (item) => {
//             const newKnife = new knifesModel(item)
//             await newKnife.save()
//         })
//     }
// }
// const setFragmentsKnifes = async (items: Knifes[]) => {
//     items.forEach(async (item) => {
//         await knifesModel.updateOne({number: item.number}, {fragments: item.fragments})
//     })
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
    // await setFragmentsKnifes(knifes)
    console.log('mongoDB connected');
}))
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use('/assets', express_1.default.static('assets'));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send("<h2>It's Working  1 23!</h2>");
});
app.get('/knifes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allKnifes = yield knifesModel_1.knifesModel.find();
    res.send(allKnifes);
}));
app.get('/knifes/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const isValidQuery = (0, checkQuery_1.checkQuery)(query);
    console.log('query is ', isValidQuery);
    if (isValidQuery) {
        try {
            const knifesResult = yield knifesModel_1.knifesModel.find(query);
            if (knifesResult.length > 0) {
                res.send(knifesResult);
            }
            else
                res.status(403).send('Knife not found');
        }
        catch (e) {
            res.status(400).send(e);
        }
    }
    else {
        res.status(403).send('Knife not found');
    }
}));
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});

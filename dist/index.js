"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knifes_1 = require("./knifes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// For testing purposes
app.use('/assets', express_1.default.static('assets'));
app.get('/', (req, res) => {
    res.send("<h2>It's Working  1 23!</h2>");
});
app.get('/knifes', (req, res) => {
    res.send(knifes_1.knifes);
});
app.get('/knifes/:number', (req, res) => {
    const knifesNumber = req.params.number;
    const knifesResult = knifes_1.knifes.find(item => item.number === +knifesNumber);
    if (knifesResult) {
        res.send(knifesResult);
    }
    else
        res.status(403).send('Knife not found');
});
app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});

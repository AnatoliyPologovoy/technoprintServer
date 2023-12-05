import express, { Request, Response } from 'express'
import { Knifes, knifes, newKnifesWithBase64 } from './knifes';
import mongoose from 'mongoose';
import { knifesModel } from './knifesModel';

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

mongoose
    .connect(uri)
    .then(async () => {
        // await setKnifes(knifes)
        // addBase64toBD()
        console.log('mongoDB connected')
    })
    .catch((err) => console.log(err))




const app = express();
const PORT = process.env.PORT || 3000;


// For testing purposes
app.use('/assets', express.static('assets'))

app.get('/', (req: Request, res: Response) => {
    res.send("<h2>It's Working  1 23!</h2>");
});
app.get('/knifes', async (req: Request, res: Response) => {
    const allKnifes = await knifesModel.find()
    res.send(allKnifes);
})

app.get('/knifes/:number', async (req: Request, res: Response) => {
    const knifesNumber = req.params.number
    const knifesResult = await knifesModel.find({number: knifesNumber})
    if (knifesResult) {
        res.send(knifesResult);
    }
    else res.status(403).send('Knife not found')
})

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
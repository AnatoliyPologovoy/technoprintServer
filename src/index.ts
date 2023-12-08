import express, { Request, Response } from 'express'
import { Knifes, knifes, newKnifesWithBase64 } from './knifes';
import mongoose from 'mongoose';
import { knifesModel } from './knifesModel';
import cors from 'cors';
import { checkQuery } from './helpers/checkQuery';

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

mongoose
    .connect(process.env.DB_CONN as string)
    .then(async () => {
        // await setKnifes(knifes)
        // addBase64toBD()
        // await setFragmentsKnifes(knifes)
        console.log('mongoDB connected')
    })
    .catch((err) => console.log(err))




const app = express();
const PORT = process.env.PORT || 3000;


app.use('/assets', express.static('assets'))

// настраиваем `CORS`
const corsOptions = {
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,

}

app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send("<h2>It's Working  1 23!</h2>");
});
app.get('/knifes', async (req: Request, res: Response) => {
    const allKnifes = await knifesModel.find()
    res.send(allKnifes);
})

app.get('/knifes/search', async (req: Request, res: Response) => {
    const query = req.query
    const isValidQuery = checkQuery(query)
    console.log('query is ', isValidQuery)
    if (isValidQuery) {
        try {
            const knifesResult = await knifesModel.find(query)
            if (knifesResult.length > 0) {
                res.send(knifesResult);
            }
            else res.status(403).send('Knife not found')
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(403).send('Knife not found')
    }
})



app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
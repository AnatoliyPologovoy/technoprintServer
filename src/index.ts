import express, {Request, Response} from 'express'
import { knifes } from './knifes';


const app = express();
const PORT = process.env.PORT || 3000;

// For testing purposes
app.use('/assets', express.static('assets'))

app.get('/', (req: Request, res: Response) => {
    res.send("<h2>It's Working  1 23!</h2>");
});
app.get('/knifes',(req: Request, res: Response) => {
    res.send(knifes); 
})

app.get('/knifes/:number',(req: Request, res: Response) => {
    const knifesNumber = req.params.number
    const knifesResult = knifes.find(item => item.number === +knifesNumber)
    if (knifesResult) {
        res.send(knifesResult); 
    }
    else res.status(403).send('Knife not found')
})

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
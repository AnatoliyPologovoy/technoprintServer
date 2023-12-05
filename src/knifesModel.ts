import mongoose from 'mongoose';
import { KnifeSchema } from './knifeSchema';


export const knifesModel = mongoose.model('Knifes', KnifeSchema)

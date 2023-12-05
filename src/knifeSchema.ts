import mongoose from 'mongoose';

const Schema = mongoose.Schema

export const KnifeSchema = new Schema({
    number: Number,
    src: String,
    size: String,
    rapport: String,
    fragment: Number,
    fragmentsMargin: String,
    streams: Number,
    streamsMargin: Schema.Types.Mixed,
    circle: Boolean,
    width: Number,
    height: Number ,
    double: Boolean,
    base64: String
})
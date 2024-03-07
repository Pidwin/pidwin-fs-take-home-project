import mongoose from "mongoose";

const lucky7ResultSchema = mongoose.Schema({
    id: { type: String },

    dice1: {type: Number},
    dice2: {type: Number},
    total: {type: Number},
    lucky: {type: Boolean},
    createdAt: {type: Date, default: Date.now}
})

export default  mongoose.model("Lucky7Result",lucky7ResultSchema)
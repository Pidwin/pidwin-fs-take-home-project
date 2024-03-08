import mongoose from "mongoose";

const betSchema = mongoose.Schema({
    id: { type: String },

    userId: { type: String },
    lucky7Id: { type: String, default: "none"},
    areDiceLucky: {type: Boolean},

    createdAt: {type: Date, default: Date.now}
})

export default mongoose.model("Bet", betSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
    {
            name: String,
            ref: String,
            size: Number,
            description: String,
            price: Number,
            category: [String],
            id_tags: [Schema.Types.ObjectId]      
    }
)

const SneakerModel = mongoose.model('sneaker', sneakerSchema);

module.exports = SneakerModel;
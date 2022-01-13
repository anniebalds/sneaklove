const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        label: String   
    }
)

const TagModel = mongoose.model('user', tagSchema);

module.exports = TagModel;
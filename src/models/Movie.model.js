const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
});

module.exports = Movie = mongoose.model('Movie', MovieSchema);

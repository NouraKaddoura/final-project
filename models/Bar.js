const
    mongoose = require('mongoose'),
    barSchema = new mongoose.Schema({
        name: String,
        address: String,
        rating: { type: Number, default: 3 },
        user: { type: mongoose.Schema.Types.ObjectId, ref:'User'}
    })

    const Bar = mongoose.model('Bar', barSchema)
    module.exports = Bar 
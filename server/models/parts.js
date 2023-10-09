const mongoose = require('mongoose')

const partsSchema = mongoose.Schema({
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    chasisNumber: { type: Number, required: true },
    year: { type: Number, required: true },
    name: { type: String, required: true }
})

module.exports = mongoose.model("Parts", partsSchema)
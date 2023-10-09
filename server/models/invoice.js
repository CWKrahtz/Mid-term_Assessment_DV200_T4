const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    name: { type: String, required: true },
    products: { type: String, required: true }
})

module.exports = mongoose.model("Invoice", invoiceSchema)
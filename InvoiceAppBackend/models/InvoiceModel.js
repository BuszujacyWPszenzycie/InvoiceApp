const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
	number: {
		type: String,
		required: true,
	},
	date: {
		type: String, // lub type: Date
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
})

module.exports = mongoose.model('Invoice', invoiceSchema)

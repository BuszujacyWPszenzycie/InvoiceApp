const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema(
	{
		number: {
			type: String,
			required: true, // pełny numer np. FS/1/9/2025
		},
		prefix: {
			type: String,
			required: true,
		},
		sequence: {
			type: Number,
			required: true, // numer porządkowy w danym miesiącu
		},
		month: {
			type: Number,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		date: {
			type: Date, // możesz zmienić na Date, jeśli chcesz
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Client',
			required: true,
		},
	},
	{ timestamps: true }
) // timestamps = createdAt / updatedAt

module.exports = mongoose.model('Invoice', invoiceSchema)

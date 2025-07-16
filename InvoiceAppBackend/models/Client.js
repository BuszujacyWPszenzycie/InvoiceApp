const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
	name: { type: String, required: true },
	nip: { type: String },
	address: { type: String },
	email: { type: String },
	phone: { type: String },
})

module.exports = mongoose.model('Client', clientSchema)

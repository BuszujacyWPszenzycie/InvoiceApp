const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
	invoicePrefix: {
		type: String,
		default: 'FS',
	},
})

module.exports = mongoose.model('Settings', settingsSchema)

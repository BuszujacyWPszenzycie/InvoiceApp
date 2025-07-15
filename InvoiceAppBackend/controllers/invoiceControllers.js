const Invoice = require('../models/InvoiceModel')

const getInvoices = (req, res) => {
	Invoice.find()
		.sort({ date: -1 })
		.then(invoices => {
			res.json(invoices)
		})
		.catch(err => {
			console.error('Błąd pobierania faktur:', err)
			res.status(500).json({ error: 'Błąd pobierania faktur' })
		})
}

const addInvoice = (req, res) => {
	const { number, date, amount } = req.body

	if (!number || !date || !amount) {
		return res.status(400).json({ error: 'Brak wymaganych pól' })
	}

	const newInvoice = new Invoice({ number, date, amount })

	newInvoice
		.save()
		.then(saved => {
			res.status(201).json(saved)
		})
		.catch(err => {
			console.error('Błąd zapisu faktury:', err)
			res.status(500).json({ error: 'Błąd zapisu faktury' })
		})
}

const deleteInvoice = (req, res) => {
	const { id } = req.params

	Invoice.findByIdAndDelete(id)
		.then(deleted => {
			if (!deleted) {
				return res.status(404).json({ error: 'Faktura nie znaleziona' })
			}
			res.status(200).json({ message: 'Faktura usunięta' })
		})
		.catch(err => {
			console.error('Błąd usuwania faktury:', err)
			res.status(500).json({ error: 'Błąd serwera podczas usuwania' })
		})
}

module.exports = {
	getInvoices,
	addInvoice,
	deleteInvoice,
}

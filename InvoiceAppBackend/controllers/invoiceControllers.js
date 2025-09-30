const Invoice = require('../models/InvoiceModel')

const getInvoices = (req, res) => {
	const { startDate, endDate } = req.query

	const filter = {}

	if (startDate || endDate) {
		filter.date = {}
		if (startDate) filter.date.$gte = new Date(startDate)
		if (endDate) filter.date.$lte = new Date(endDate)
	}

	Invoice.find(filter)
		.sort({ date: -1 })
		.populate('client') // dociągnie dane klienta
		.then(invoices => {
			res.json(invoices)
		})
		.catch(err => {
			console.error('Błąd pobierania faktur:', err)
			res.status(500).json({ error: 'Błąd pobierania faktur' })
		})
}

const addInvoice = (req, res) => {
	const { date, client, amount, prefix } = req.body

	if (!date || !client || !amount || !prefix) {
		return res.status(400).json({ error: 'Brak wymaganych pól' })
	}

	const invoiceDate = new Date(date) // używamy daty z formularza
	const month = invoiceDate.getMonth() + 1
	const year = invoiceDate.getFullYear()

	// znajdź ostatnią fakturę dla tego miesiąca i roku
	Invoice.findOne({ prefix, month, year })
		.sort({ sequence: -1 })
		.then(lastInvoice => {
			let sequence = 1
			if (lastInvoice) sequence = lastInvoice.sequence + 1

			const number = `${prefix}/${sequence}/${month}/${year}`

			const newInvoice = new Invoice({
				number,
				date,
				amount,
				client,
				prefix,
				sequence,
				month,
				year,
			})

			return newInvoice.save()
		})
		.then(saved => saved.populate('client'))
		.then(populated => res.status(201).json(populated))
		.catch(err => {
			console.error('❌ Błąd zapisu faktury:', err)
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

const getNextInvoiceNumber = (req, res) => {
	const { prefix, month, year } = req.query

	if (!prefix || !month || !year) {
		return res.status(400).json({ error: 'Brak wymaganych parametrów' })
	}

	const m = Number(month)
	const y = Number(year)

	Invoice.findOne({ prefix, month: m, year: y })
		.sort({ sequence: -1 })
		.then(lastInvoice => {
			const nextSequence = lastInvoice ? lastInvoice.sequence + 1 : 1
			const number = `${prefix}/${nextSequence}/${m}/${y}`
			res.json({ number })
		})
		.catch(err => {
			console.error('❌ Błąd przy generowaniu numeru faktury:', err)
			res.status(500).json({ error: 'Błąd serwera' })
		})
}

module.exports = {
	getInvoices,
	addInvoice,
	deleteInvoice,
	getNextInvoiceNumber,
}

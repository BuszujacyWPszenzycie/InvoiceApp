const Client = require('../models/Client')
const axios = require('axios')

const getClients = (req, res) => {
	Client.find()
		.then(clients => res.json(clients))
		.catch(err => {
			console.error('Błąd podczas pobierania klientów:', err)
			res.status(500).json({ error: 'Błąd serwera' })
		})
}

const addClient = (req, res) => {
	const { name, nip, address, email, phone } = req.body

	if (!name) {
		return res.status(400).json({ error: 'Nazwa klienta jest wymagana' })
	}

	const newClient = new Client({ name, nip, address, email, phone })

	newClient
		.save()
		.then(client => res.status(201).json(client))
		.catch(err => {
			console.error('Błąd zapisu klienta:', err)
			res.status(500).json({ error: 'Błąd zapisu klienta' })
		})
}

const deleteClient = (req, res) => {
	const { id } = req.params
	Client.findByIdAndDelete(id)
		.then(deleted => {
			if (!deleted) return res.status(404).json({ error: 'Klient nie znaleziony' })
			res.json({ message: 'Klient usunięty' })
		})
		.catch(err => res.status(500).json({ error: 'Błąd usuwania klienta' }))
}

const getVatData = (req, res) => {
	console.log('Wywołano getVatData z NIP:', req.params.nip)
	const { nip } = req.params

	if (!nip) {
		return res.status(400).json({ error: 'NIP jest wymagany' })
	}

	const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
	const url = `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${today}`

	axios
		.get(url)
		.then(response => {
			const subject = response.data.result.subject

			const address = subject.workingAddress || subject.residenceAddress || ''

			const data = {
				name: subject.name || '',
				address: address,
				vatStatus: subject.statusVat || '',
			}
			console.log('Dane pobrane z MF:', data)
			res.json(data)
		})
		.catch(error => {
			console.error('Błąd pobierania danych z Białej Listy VAT:', error.message)
			res.status(500).json({ error: 'Nie udało się pobrać danych z Białej Listy VAT' })
		})
}

module.exports = { addClient, getClients, deleteClient, getVatData }

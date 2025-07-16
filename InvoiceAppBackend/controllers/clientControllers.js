const Client = require('../models/Client')

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

module.exports = { addClient, getClients, deleteClient }

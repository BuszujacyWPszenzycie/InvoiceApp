const Settings = require('../models/Settings')

// Pobierz ustawienia
exports.getSettings = (req, res) => {
	Settings.findOne()
		.then(settings => {
			if (!settings) {
				const newSettings = new Settings()
				return newSettings.save()
			}
			return settings
		})
		.then(settings => res.json(settings))
		.catch(err => {
			console.error('Błąd pobierania ustawień:', err)
			res.status(500).json({ error: 'Błąd pobierania ustawień' })
		})
}

// Zapisz ustawienia
exports.updateSettings = (req, res) => {
	const { invoicePrefix } = req.body

	Settings.findOne()
		.then(settings => {
			if (!settings) {
				const newSettings = new Settings({ invoicePrefix })
				return newSettings.save()
			} else {
				settings.invoicePrefix = invoicePrefix
				return settings.save()
			}
		})
		.then(saved => res.json(saved))
		.catch(err => {
			console.error('Błąd zapisu ustawień:', err)
			res.status(500).json({ error: 'Błąd zapisu ustawień' })
		})
}

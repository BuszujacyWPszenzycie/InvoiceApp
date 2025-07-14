// controllers/authController.js
const User = require('../models/UserModel')

// REGISTER
exports.register = (req, res) => {
	const { email, password, name } = req.body

	const newUser = new User({ email, password, name })

	newUser
		.save()
		.then(() => res.status(201).json({ message: 'User registered successfully' }))
		.catch(err => res.status(500).json({ error: 'Error registering user', details: err.message }))
}

// LOGIN
exports.login = (req, res) => {
	const { email, password } = req.body

	User.findOne({ email })
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'Invalid email or password' })
			}

			// Hasło jawne, więc porównujemy prosto
			if (user.password !== password) {
				return res.status(401).json({ error: 'Invalid email or password' })
			}

			res.status(200).json({ success: true, message: 'Login successful', user })
		})
		.catch(err => res.status(500).json({ error: 'Login failed', details: err.message }))
}

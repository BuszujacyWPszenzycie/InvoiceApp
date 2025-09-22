const express = require('express') // import express
const mongoose = require('mongoose') // import mongoose
const cors = require('cors') // import cors
const User = require('./models/UserModel') // import user model from models/User.
const authRoutes = require('./routes/authRoutes') // import auth routes
const invoiceRoutes = require('./routes/invoicesRoutes')
const clientRoutes = require('./routes/clientRoutes')
const settingsRouter = require('./routes/settingsRoutes')

const app = express() // create an express app
app.use(cors()) // use cors middleware
app.use(express.json()) // use express json middleware

// Routing
app.use('/api', authRoutes) // -> /api/login, /api/register
app.use('/api/invoices', invoiceRoutes) // -> /api/invoices/get, /api/invoices/add
app.use('/api/clients', clientRoutes) // -> /api/clients/
app.use('/api/settings', settingsRouter)

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hbc0z1i.mongodb.net/${process.env.MONGO_DATABASE}` //Connect to MongoDB using environment variables

mongoose
	.connect(MONGODB_URI)
	.then(() => console.log('MongoDB connected!'))
	.catch(err => {
		console.error('MongoDB connection error:', err.message)
		console.error('Used URI:', MONGODB_URI) // UWAGA: NIE W PRODUKCJI, bo może logować hasło
	})

// create a new user instance
app.post('/api/register', (req, res) => {
	const { email, password, name } = req.body // destructure email, password, and name from request body
	const newUser = new User({ email, password, name })
	newUser
		.save() // save the new user to the database
		.then(() => {
			res.status(201).json({ message: 'User registered successfully' }) // send success response
		})
		.catch(err => {
			res.status(500).json({ error: 'Error registering user', details: err.message }) // send error response
		})
})

app.listen(4000, () => console.log('✅ Server is running on http://localhost:4000')) // start the server on port 4000 and log success message

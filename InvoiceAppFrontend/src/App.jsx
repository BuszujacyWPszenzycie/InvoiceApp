import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
	const [loggedIn, setLoggedIn] = useState(false)

	return <div>{loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />}</div>
}

export default App

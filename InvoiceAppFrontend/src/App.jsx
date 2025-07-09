import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
	const [user, setUser] = useState(null)

	return <>{!user ? <Login onLogin={setUser} /> : <Dashboard user={user} />}</>
}

export default App

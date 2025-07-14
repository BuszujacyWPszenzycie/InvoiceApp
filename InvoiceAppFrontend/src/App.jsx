import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Panel from './components/Panel'
import Invoices from './components/Invoices'

function App() {
	const [user, setUser] = useState(null)

	return (
		<Router>
			<Routes>
				<Route path='/' element={user ? <Navigate to='/dashboard' replace /> : <Login onLogin={setUser} />} />
				<Route path='/dashboard' element={user ? <Dashboard user={user} /> : <Navigate to='/' replace />}>
					<Route index element={<Panel />} />
					<Route path='invoices' element={<Invoices />} />
					{/* np. <Route path="clients" element={<Clients />} /> */}
				</Route>
			</Routes>
		</Router>
	)
}

export default App

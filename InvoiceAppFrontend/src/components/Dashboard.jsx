import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import './Dashboard.scss'

function Dashboard({ user }) {
	return (
		<div className='dashboard'>
			<Sidebar />
			<div className='main-area'>
				<Header user={user} />
				<Outlet /> {/* <-- Tu będą dynamiczne komponenty: Panel, Invoices itd. */}
			</div>
		</div>
	)
}

export default Dashboard

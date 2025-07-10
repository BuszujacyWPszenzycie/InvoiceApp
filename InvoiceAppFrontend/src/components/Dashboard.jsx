import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Panel from './Panel'
import './Dashboard.scss' // plik stylów dla dashboardu

function Dashboard({ user }) {
	return (
		<div className='dashboard'>
			<Sidebar />
			<div className='main-area'>
				<Header user={user} />
				<Panel />
			</div>
		</div>
	)
}

export default Dashboard

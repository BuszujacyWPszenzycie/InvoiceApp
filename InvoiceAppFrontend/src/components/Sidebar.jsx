import React from 'react'
import './Sidebar.scss'

function Sidebar() {
	return (
		<aside className='sidebar'>
			<h2>Menu</h2>
			<ul>
				<li>Faktury</li>
				<li>Klienci</li>
				<li>Raporty</li>
			</ul>
		</aside>
	)
}

export default Sidebar

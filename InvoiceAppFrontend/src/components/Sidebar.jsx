import React from 'react'
import SidebarLink from './SidebarLink'
import { FaHome, FaFileInvoice, FaAddressBook, FaCog } from 'react-icons/fa'
import './Sidebar.scss'

function Sidebar() {
	return (
		<aside className='sidebar'>
			<h2 className='sidebar__title'>Menu</h2>
			<nav className='sidebar__nav'>
				<SidebarLink to='/dashboard' label='Panel główny' icon={FaHome} exact={true} />
				<SidebarLink to='/dashboard/invoices' label='Faktury' icon={FaFileInvoice} />
				<SidebarLink to='/dashboard/clients' icon={FaAddressBook} label='Kontrahenci' />
				<SidebarLink to='/dashboard/settings' icon={FaCog} label='Ustawienia' />
			</nav>
		</aside>
	)
}

export default Sidebar

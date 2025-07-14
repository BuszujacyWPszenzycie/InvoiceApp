import React from 'react'
import { NavLink } from 'react-router-dom'
import './SidebarLink.scss'

function SidebarLink({ to, label, icon: Icon, exact = false }) {
	return (
		<NavLink
			to={to}
			end={exact} // tylko wtedy isActive === true, gdy path jest dokładnie równy
			className={({ isActive }) => 'sidebar-link' + (isActive ? ' sidebar-link--active' : '')}
		>
			{Icon && <Icon className='sidebar-link__icon' />}
			<span className='sidebar-link__label'>{label}</span>
		</NavLink>
	)
}

export default SidebarLink

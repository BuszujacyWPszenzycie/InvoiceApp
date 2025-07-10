import React from 'react'
import './Header.scss'

function Header({ user }) {
	return (
		<header className='header'>
			<div className='welcome'>Witaj, {user?.name || 'Użytkowniku'}</div>
			{/* Tutaj można dodać np. ikonę wylogowania */}
		</header>
	)
}

export default Header

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import './FloatingButton.scss'

function FloatingButton({ to }) {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(to)
	}

	return (
		<button className='floating-button' onClick={handleClick}>
			<FaPlus />
		</button>
	)
}

export default FloatingButton

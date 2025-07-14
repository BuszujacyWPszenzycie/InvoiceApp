import React from 'react'
import './Button.scss'

function Button({ type = 'button', variant = 'primary', children, onClick, ...rest }) {
	return (
		<button type={type} className={`btn btn--${variant}`} onClick={onClick} {...rest}>
			{children}
		</button>
	)
}

export default Button

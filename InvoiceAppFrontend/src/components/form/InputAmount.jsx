import React from 'react'
import './Input.scss'

function InputAmount({ label, name, value, onChange }) {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input type='number' id={name} name={name} value={value} step='0.01' min='0' onChange={onChange} />
		</div>
	)
}

export default InputAmount

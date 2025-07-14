import React from 'react'
import './Input.scss'

function InputDate({ label, name, value, onChange }) {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input type='date' id={name} name={name} value={value} onChange={onChange} />
		</div>
	)
}

export default InputDate

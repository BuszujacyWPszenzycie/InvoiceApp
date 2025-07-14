import React from 'react'
import './Input.scss'

function InputPercent({ label, name, value, onChange }) {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<div className='percent-wrapper'>
				<input type='number' id={name} name={name} value={value} step='0.01' min='0' max='100' onChange={onChange} />
				<span className='percent-symbol'>%</span>
			</div>
		</div>
	)
}

export default InputPercent

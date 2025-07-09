import React, { useState } from 'react'
import axios from 'axios'
import './Login.scss'

function Login({ onLogin }) {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const [error, setError] = useState('')

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
		setError('')
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (!formData.email || !formData.password) {
			setError('Wszystkie pola są wymagane.')
			return
		}

		axios.post('http://localhost:4000/api/login', formData).then(res => {
			if (res.data.success) {
				onLogin(res.data.user) // przekaż usera do rodzica
			} else {
				setError('Nieprawidłowy email lub hasło.')
			}
		})
	}

	return (
		<div className='login'>
			<form className='login__form' onSubmit={handleSubmit}>
				<h2 className='login__title'>Logowanie</h2>

				<label className='login__label'>
					Email
					<input type='email' name='email' className='login__input' value={formData.email} onChange={handleChange} />
				</label>

				<label className='login__label'>
					Hasło
					<input
						type='password'
						name='password'
						className='login__input'
						value={formData.password}
						onChange={handleChange}
					/>
				</label>

				{error && <div className='login__error'>{error}</div>}

				<button type='submit' className='login__button'>
					Zaloguj się
				</button>
			</form>
		</div>
	)
}

export default Login

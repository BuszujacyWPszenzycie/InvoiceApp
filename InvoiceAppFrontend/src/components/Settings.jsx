import React, { useState, useEffect } from 'react'
import Button from './ui/Button'
import axios from 'axios'
import './Settings.scss'

function Settings() {
	const [prefix, setPrefix] = useState('')

	useEffect(() => {
		// Pobieramy aktualny prefix z backendu
		axios
			.get('http://localhost:4000/api/settings')
			.then(res => setPrefix(res.data.invoicePrefix || ''))
			.catch(err => console.error('Błąd pobierania ustawień:', err))
	}, [])

	const handleChange = e => setPrefix(e.target.value)

	const handleSave = () => {
		axios
			.post('http://localhost:4000/api/settings', { invoicePrefix: prefix })
			.then(res => alert('Prefix zapisany!'))
			.catch(err => console.error('Błąd zapisu ustawień:', err))
	}

	return (
		<div className='settings'>
			<h1>Ustawienia</h1>

			<label>
				Prefix numeracji faktur
				<input type='text' value={prefix} onChange={handleChange} placeholder='Np. FS' />
				<small>Ten prefix będzie automatycznie dodawany na początku numeru każdej faktury.</small>
			</label>

			<div className='settings__buttons'>
				<Button variant='primary' onClick={handleSave}>
					Zapisz
				</Button>
			</div>
		</div>
	)
}

export default Settings

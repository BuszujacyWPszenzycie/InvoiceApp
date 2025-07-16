import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // <-- dodaj import
import Button from './ui/Button'
import './AddClient.scss'
import axios from 'axios'

function AddClient() {
	const [formData, setFormData] = useState({
		name: '',
		nip: '',
		address: '',
		email: '',
		phone: '',
	})

	const navigate = useNavigate() // <-- przenieś tutaj, do funkcji komponentu

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()

		axios
			.post('http://localhost:4000/api/clients', formData)
			.then(res => {
				console.log('Dodano klienta:', res.data)
				navigate('/dashboard/clients') // przekierowanie do listy kontrahentów
			})
			.catch(err => {
				console.error('Błąd dodawania klienta:', err)
				// tutaj możesz dodać np. wyświetlenie komunikatu o błędzie
			})
	}

	return (
		<div className='add-client'>
			<h1>Dodaj kontrahenta</h1>
			<form className='add-client__form' onSubmit={handleSubmit}>
				<label>
					Nazwa firmy
					<input type='text' name='name' value={formData.name} onChange={handleChange} required />
				</label>
				<label>
					NIP
					<input type='text' name='nip' value={formData.nip} onChange={handleChange} />
				</label>
				<label>
					Adres
					<input type='text' name='address' value={formData.address} onChange={handleChange} />
				</label>
				<label>
					E-mail
					<input type='email' name='email' value={formData.email} onChange={handleChange} />
				</label>
				<label>
					Telefon
					<input type='text' name='phone' value={formData.phone} onChange={handleChange} />
				</label>

				<div className='add-client__buttons'>
					<Button type='submit' variant='primary'>
						Zapisz kontrahenta
					</Button>
					<Button type='button' variant='secondary'>
						Anuluj
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddClient

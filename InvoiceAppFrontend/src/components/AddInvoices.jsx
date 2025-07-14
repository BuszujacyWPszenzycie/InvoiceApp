import React, { useState } from 'react'
import InputAmount from './form/InputAmount'
import InputDate from './form/InputDate'
import Button from './ui/Button'
import './AddInvoices.scss'
import axios from 'axios'

function AddInvoice() {
	const [form, setForm] = useState({
		number: '',
		date: '',
		amount: '',
	})

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()

		axios
			.post('http://localhost:4000/api/invoices', form)
			.then(res => {
				console.log('✔️ Faktura zapisana:', res.data)
				// TODO: Możesz tu przekierować lub pokazać komunikat
			})
			.catch(err => {
				console.error('❌ Błąd zapisu faktury:', err)
			})
	}

	return (
		<div className='add-invoice'>
			<h1>Dodaj fakturę</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-row'>
					<div className='form-column'>
						<label>Numer faktury</label>
						<input type='text' name='number' value={form.number} onChange={handleChange} />
					</div>
					<InputDate label='Data' name='date' value={form.date} onChange={handleChange} />
					<InputAmount label='Kwota brutto' name='amount' value={form.amount} onChange={handleChange} />
				</div>

				<div className='add-invoice__actions'>
					<Button variant='danger'>Anuluj</Button>
					<Button type='submit' variant='primary'>
						Zapisz fakturę
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddInvoice

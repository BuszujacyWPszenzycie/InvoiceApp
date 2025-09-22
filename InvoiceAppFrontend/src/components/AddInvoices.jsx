import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputAmount from './form/InputAmount'
import InputDate from './form/InputDate'
import Button from './ui/Button'
import axios from 'axios'
import './AddInvoices.scss'

function AddInvoice() {
	const navigate = useNavigate()

	const [form, setForm] = useState({
		number: '',
		date: '',
		amount: '',
		client: '',
	})

	const [clients, setClients] = useState([])
	const [prefix, setPrefix] = useState('')

	useEffect(() => {
		axios
			.get('http://localhost:4000/api/clients')
			.then(res => setClients(res.data))
			.catch(err => console.error('❌ Błąd ładowania klientów:', err))

		axios
			.get('http://localhost:4000/api/settings')
			.then(res => setPrefix(res.data.invoicePrefix || ''))
			.catch(err => console.error('❌ Błąd pobierania ustawień:', err))
	}, [])

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()

		const invoiceWithPrefix = {
			...form,
			number: `${prefix}${form.number}`,
		}

		axios
			.post('http://localhost:4000/api/invoices', invoiceWithPrefix)
			.then(res => {
				console.log('✔️ Faktura zapisana:', res.data)
				navigate('/dashboard/invoices')
			})
			.catch(err => {
				console.error('❌ Błąd zapisu faktury:', err)
			})
	}

	const handleCancel = () => {
		navigate('/dashboard/invoices')
	}

	return (
		<div className='add-invoice'>
			<h1>Dodaj fakturę</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-row'>
					<div className='form-column'>
						<label>Numer faktury</label>
						<input
							type='text'
							name='number'
							value={`${prefix}/${form.number}`}
							onChange={e =>
								handleChange({ target: { name: 'number', value: e.target.value.replace(`${prefix}/`, '') } })
							}
							placeholder='Np. 123/09/2025'
						/>
						<small>Prefix: {prefix}</small>
					</div>
					<InputDate label='Data' name='date' value={form.date} onChange={handleChange} />
					<InputAmount label='Kwota brutto' name='amount' value={form.amount} onChange={handleChange} />
				</div>

				<div className='form-row'>
					<div className='form-column'>
						<label>Kontrahent</label>
						<select name='client' value={form.client} onChange={handleChange} required>
							<option value=''>-- wybierz kontrahenta --</option>
							{clients.map(c => (
								<option key={c._id} value={c._id}>
									{c.name} ({c.nip})
								</option>
							))}
						</select>
					</div>
				</div>

				<div className='add-invoice__actions'>
					<Button variant='danger' type='button' onClick={handleCancel}>
						Anuluj
					</Button>
					<Button type='submit' variant='primary'>
						Zapisz fakturę
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AddInvoice

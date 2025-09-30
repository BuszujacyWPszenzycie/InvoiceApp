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
		date: '',
		amount: '',
		client: '',
	})
	const [clients, setClients] = useState([])
	const [prefix, setPrefix] = useState('')
	const [nextNumber, setNextNumber] = useState('') // podgląd numeru

	useEffect(() => {
		// pobranie kontrahentów
		axios
			.get('http://localhost:4000/api/clients')
			.then(res => setClients(res.data))
			.catch(err => console.error('❌ Błąd ładowania klientów:', err))

		// pobranie prefixu
		axios
			.get('http://localhost:4000/api/settings')
			.then(res => setPrefix(res.data.invoicePrefix || ''))
			.catch(err => console.error('❌ Błąd pobierania ustawień:', err))
	}, [])

	// aktualizacja formularza
	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	// wywołanie podglądu numeru po zmianie daty
	useEffect(() => {
		if (!form.date || !prefix) {
			setNextNumber('')
			return
		}

		const selectedDate = new Date(form.date)
		const month = selectedDate.getMonth() + 1
		const year = selectedDate.getFullYear()

		axios
			.get(`http://localhost:4000/api/invoices/nextNumber?prefix=${prefix}&month=${month}&year=${year}`)
			.then(res => setNextNumber(res.data.number))
			.catch(err => console.error('❌ Błąd pobierania numeru faktury:', err))
	}, [form.date, prefix])

	const handleSubmit = e => {
		e.preventDefault()

		axios
			.post('http://localhost:4000/api/invoices', {
				prefix,
				date: form.date,
				amount: Number(form.amount),
				client: form.client,
			})
			.then(res => {
				console.log('✔️ Faktura zapisana:', res.data)
				navigate('/dashboard/invoices')
			})
			.catch(err => {
				console.error('❌ Błąd zapisu faktury:', err.response?.data || err.message)
				alert(err.response?.data?.error || 'Błąd zapisu faktury')
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
						<div className='invoice-preview'>{nextNumber ? <strong>{nextNumber}</strong> : <em>----</em>}</div>
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

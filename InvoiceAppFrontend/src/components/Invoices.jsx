import React, { useEffect, useState } from 'react'
import './Invoices.scss'
import axios from 'axios'
import FloatingButton from './FloatingButton'
import { FaTrash } from 'react-icons/fa'
import ConfirmDialog from './ui/ConfirmDialog'

function Invoices() {
	const [invoices, setInvoices] = useState([])
	const [invoiceToDelete, setInvoiceToDelete] = useState(null)
	const [filters, setFilters] = useState({
		startDate: '',
		endDate: '',
	})

	const fetchInvoices = () => {
		axios
			.get('http://localhost:4000/api/invoices', { params: filters })
			.then(res => setInvoices(res.data))
			.catch(err => console.error('❌ Błąd pobierania faktur:', err))
	}

	useEffect(() => {
		fetchInvoices()
	}, [])

	const handleFilterChange = e => {
		setFilters({ ...filters, [e.target.name]: e.target.value })
	}

	const applyFilter = () => {
		fetchInvoices()
	}

	const clearFilters = () => {
		setFilters({ startDate: '', endDate: '' })
		// fetch z pustymi filtrami od razu
		axios
			.get('http://localhost:4000/api/invoices', { params: {} })
			.then(res => setInvoices(res.data))
			.catch(err => console.error('❌ Błąd pobierania faktur:', err))
	}

	const formatDateForInput = date => {
		const y = date.getFullYear()
		const m = String(date.getMonth() + 1).padStart(2, '0')
		const d = String(date.getDate()).padStart(2, '0')
		return `${y}-${m}-${d}`
	}

	const setCurrentMonth = () => {
		const now = new Date()
		const start = new Date(now.getFullYear(), now.getMonth(), 1) // 1-szy dzień bieżącego miesiąca
		const end = new Date(now.getFullYear(), now.getMonth() + 1, 0) // ostatni dzień bieżącego miesiąca

		const startStr = formatDateForInput(start)
		const endStr = formatDateForInput(end)

		setFilters({ startDate: startStr, endDate: endStr })
		fetchInvoices({ startDate: startStr, endDate: endStr })
	}

	const setPreviousMonth = () => {
		const now = new Date()
		const start = new Date(now.getFullYear(), now.getMonth() - 1, 1) // 1-szy dzień poprzedniego miesiąca
		const end = new Date(now.getFullYear(), now.getMonth(), 0) // ostatni dzień poprzedniego miesiąca

		const startStr = formatDateForInput(start)
		const endStr = formatDateForInput(end)

		setFilters({ startDate: startStr, endDate: endStr })
		fetchInvoices({ startDate: startStr, endDate: endStr })
	}

	const setCurrentYear = () => {
		const now = new Date()
		const start = new Date(now.getFullYear(), 0, 1) // 1 stycznia bieżącego roku
		const end = new Date(now.getFullYear(), 11, 31) // 31 grudnia bieżącego roku
		const startStr = formatDateForInput(start)
		const endStr = formatDateForInput(end)
		setFilters({ startDate: startStr, endDate: endStr })
		fetchInvoices({ startDate: startStr, endDate: endStr })
	}

	const setPreviousYear = () => {
		const now = new Date()
		const prevYear = now.getFullYear() - 1
		const start = new Date(prevYear, 0, 1) // 1 stycznia poprzedniego roku
		const end = new Date(prevYear, 11, 31) // 31 grudnia poprzedniego roku
		const startStr = formatDateForInput(start)
		const endStr = formatDateForInput(end)
		setFilters({ startDate: startStr, endDate: endStr })
		fetchInvoices({ startDate: startStr, endDate: endStr })
	}
	const handleDeleteClick = id => setInvoiceToDelete(id)

	const confirmDelete = () => {
		axios
			.delete(`http://localhost:4000/api/invoices/${invoiceToDelete}`)
			.then(() => {
				setInvoices(prev => prev.filter(inv => inv._id !== invoiceToDelete))
				setInvoiceToDelete(null)
			})
			.catch(err => {
				console.error('Błąd podczas usuwania:', err)
				alert('Nie udało się usunąć faktury.')
			})
	}

	// funkcja formatująca datę
	const formatDate = isoDate => {
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	return (
		<div className='invoices'>
			<h1>Lista faktur</h1>

			{/* Filtry */}
			<div className='invoices__filters'>
				<label>
					Od:
					<input type='date' name='startDate' value={filters.startDate} onChange={handleFilterChange} />
				</label>
				<label>
					Do:
					<input type='date' name='endDate' value={filters.endDate} onChange={handleFilterChange} />
				</label>
				<button onClick={applyFilter}>Filtruj</button>
				<button onClick={clearFilters}>Wyczyść filtry</button>
			</div>

			<div className='invoices__quick-filters'>
				<span className='invoices__quick-label'>Szybkie filtry:</span>
				<div className='invoices__quick-buttons'>
					<button onClick={setCurrentMonth}>Bieżący miesiąc</button>
					<button onClick={setPreviousMonth}>Poprzedni miesiąc</button>
					<button onClick={setCurrentYear}>Bieżący rok</button>
					<button onClick={setPreviousYear}>Poprzedni rok</button>
				</div>
			</div>

			<ul className='invoices__list'>
				{invoices.map(invoice => (
					<li key={invoice._id} className='invoices__item'>
						<div className='invoices__content'>
							<div>
								<strong>Numer:</strong> {invoice.number}
							</div>
							<div>
								<strong>Data:</strong> {formatDate(invoice.date)}
							</div>
							<div>
								<strong>Kwota:</strong> {invoice.amount} zł
							</div>
							{invoice.client && (
								<div>
									<strong>Kontrahent:</strong> {invoice.client.name}
								</div>
							)}
						</div>
						<button onClick={() => handleDeleteClick(invoice._id)} className='invoices__delete-btn'>
							<FaTrash />
						</button>
					</li>
				))}
			</ul>

			{invoiceToDelete && (
				<ConfirmDialog
					message='Czy na pewno chcesz usunąć tę fakturę?'
					onConfirm={confirmDelete}
					onCancel={() => setInvoiceToDelete(null)}
				/>
			)}

			<FloatingButton to='/dashboard/invoices/new' />
		</div>
	)
}

export default Invoices

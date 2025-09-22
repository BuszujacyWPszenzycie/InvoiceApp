import React, { useEffect, useState } from 'react'
import './Invoices.scss'
import axios from 'axios'
import FloatingButton from './FloatingButton'
import { FaTrash } from 'react-icons/fa'
import ConfirmDialog from './ui/ConfirmDialog'

function Invoices() {
	const [invoices, setInvoices] = useState([])
	const [invoiceToDelete, setInvoiceToDelete] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:4000/api/invoices').then(res => {
			setInvoices(res.data)
		})
	}, [])

	const handleDeleteClick = id => {
		setInvoiceToDelete(id)
	}

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

	return (
		<div className='invoices'>
			<h1>Lista faktur</h1>
			<ul className='invoices__list'>
				{invoices.map(invoice => (
					<li key={invoice._id} className='invoices__item'>
						<div className='invoices__content'>
							<div>
								<strong>Numer:</strong> {invoice.number}
							</div>
							<div>
								<strong>Data:</strong> {invoice.date}
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

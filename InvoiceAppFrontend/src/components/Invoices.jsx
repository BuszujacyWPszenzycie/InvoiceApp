import React, { useEffect, useState } from 'react'
import './Invoices.scss'
import axios from 'axios'

function Invoices() {
	const [invoices, setInvoices] = useState([])

	useEffect(() => {
		// Tymczasowo możesz ustawić sobie własne dane lub mocka
		axios.get('http://localhost:4000/api/invoices').then(res => {
			setInvoices(res.data)
		})
	}, [])

	return (
		<div className='invoices'>
			<h1>Lista faktur</h1>
			<ul className='invoices__list'>
				{invoices.map(invoice => (
					<li key={invoice.id} className='invoices__item'>
						<div>
							<strong>Numer:</strong> {invoice.number}
						</div>
						<div>
							<strong>Data:</strong> {invoice.date}
						</div>
						<div>
							<strong>Kwota:</strong> {invoice.amount} zł
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Invoices

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import ConfirmDialog from './ui/ConfirmDialog'
import FloatingButton from './FloatingButton'
import './Clients.scss'

function Clients() {
	const [clients, setClients] = useState([])
	const [clientToDelete, setClientToDelete] = useState(null)

	useEffect(() => {
		axios.get('http://localhost:4000/api/clients').then(res => setClients(res.data))
	}, [])

	const confirmDelete = id => {
		setClientToDelete(id)
	}

	const cancelDelete = () => {
		setClientToDelete(null)
	}

	const handleDelete = () => {
		axios
			.delete(`http://localhost:4000/api/clients/${clientToDelete}`)
			.then(() => {
				setClients(clients.filter(c => c._id !== clientToDelete))
				setClientToDelete(null)
			})
			.catch(err => {
				console.error('Błąd usuwania klienta:', err)
				alert('Nie udało się usunąć klienta')
				setClientToDelete(null)
			})
	}

	return (
		<div className='clients'>
			<h1>Lista kontrahentów</h1>
			<ul className='clients__list'>
				{clients.map(client => (
					<li key={client._id} className='clients__item'>
						<div>
							<strong>{client.name}</strong> - {client.nip}
						</div>
						<button className='clients__deleteBtn' onClick={() => confirmDelete(client._id)} title='Usuń klienta'>
							<FaTrash />
						</button>
					</li>
				))}
			</ul>

			<FloatingButton to='/dashboard/clients/new' />

			{clientToDelete && (
				<ConfirmDialog
					message='Czy na pewno chcesz usunąć tego klienta?'
					onConfirm={handleDelete}
					onCancel={cancelDelete}
				/>
			)}
		</div>
	)
}

export default Clients

import React from 'react'
import './ConfirmDialog.scss' // styl pod spodem

function ConfirmDialog({ message, onConfirm, onCancel }) {
	return (
		<div className='confirm'>
			<div className='confirm__box'>
				<p className='confirm__message'>{message}</p>
				<div className='confirm__actions'>
					<button className='btn btn--danger' onClick={onConfirm}>
						Tak
					</button>
					<button className='btn btn--secondary' onClick={onCancel}>
						Nie
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDialog

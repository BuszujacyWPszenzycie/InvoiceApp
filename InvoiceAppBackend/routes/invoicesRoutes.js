const express = require('express')
const router = express.Router()
const { getInvoices, addInvoice, deleteInvoice } = require('../controllers/invoiceControllers')

router.get('/', getInvoices)
router.post('/', addInvoice)
router.delete('/:id', deleteInvoice)

module.exports = router

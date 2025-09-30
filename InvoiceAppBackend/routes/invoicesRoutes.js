const express = require('express')
const router = express.Router()
const { getInvoices, addInvoice, deleteInvoice, getNextInvoiceNumber } = require('../controllers/invoiceControllers')

router.get('/', getInvoices)
router.post('/', addInvoice)
router.delete('/:id', deleteInvoice)
router.get('/nextNumber', getNextInvoiceNumber)

module.exports = router

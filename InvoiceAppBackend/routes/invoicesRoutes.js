const express = require('express')
const router = express.Router()
const { getInvoices, addInvoice } = require('../controllers/invoiceControllers')

router.get('/', getInvoices)
router.post('/', addInvoice)

module.exports = router

const express = require('express')
const router = express.Router()
const { getClients, addClient, deleteClient, getVatData } = require('../controllers/clientControllers')

router.get('/', getClients)
router.post('/', addClient)
router.delete('/:id', deleteClient)
router.get('/vat/:nip', getVatData)

module.exports = router

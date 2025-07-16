const express = require('express')
const router = express.Router()
const { getClients, addClient, deleteClient } = require('../controllers/clientControllers')

router.get('/', getClients)
router.post('/', addClient)
router.delete('/:id', deleteClient)

module.exports = router

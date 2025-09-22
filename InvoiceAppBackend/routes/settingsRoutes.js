const express = require('express')
const router = express.Router()
const settingsControllers = require('../controllers/settingsControllers')

// GET /api/settings
router.get('/', settingsControllers.getSettings)

// POST /api/settings
router.post('/', settingsControllers.updateSettings)

module.exports = router

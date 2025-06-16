const express = require('express');
const router = express.Router();

const entryController = require('../Controller/entryController');
const authMiddleware = require('../middleware/authMiddleware');

// Route untuk membuat entry baru
router.post('/entries', authMiddleware, entryController.createEntry);

// Route untuk mendapatkan semua entry user yang login
router.get('/entries', authMiddleware, entryController.getAllEntries);

// Route untuk mendapatkan satu entry berdasarkan ID
router.get('/entries/:id', authMiddleware, entryController.getEntryById);

router.get("/entries/recent", authMiddleware, entryController.getRecentEntries);

// routes/entryRoutes.js
router.get("/entries/range", authMiddleware, entryController.getEntriesByDateRange);


// Route untuk menghapus entry berdasarkan ID
router.delete('/entries/:id', authMiddleware, entryController.deleteEntry);

module.exports = router;

const axios = require('axios');
const Entry = require('../Model/entryModel');

// @desc    Membuat entri baru
// @route   POST /api/entries
// @access  Private
exports.createEntry = async (req, res) => {
  const { title, entry_text, entry_date } = req.body;
  const userId = req.user.id; // ✅ dari token JWT (pastikan middleware benar)

  try {
    // Step 1: Kirim teks ke model AI untuk mendapatkan mood
    const aiResponse = await axios.post("http://127.0.0.1:8000/get_mood/", {
      text: entry_text,
    });

    const emotion_id = aiResponse.data.mood;
    const result = await Entry.create({
      userId,
      title,
      entryText: entry_text,
      entryDate: entry_date,
      emotion_id: emotion_id,
    });

    res.status(201).json({ message: "Entry berhasil dibuat", entry: result });
  } catch (error) {
    console.error("Create entry error:", error);
    res.status(500).json({ message: "Gagal membuat entri baru", error });
  }
};

// @desc    Mendapatkan semua entri milik user yang login
// @route   GET /api/entries
// @access  Private
// @desc    Mendapatkan semua entri milik user yang login
// @route   GET /api/entries
// @access  Private
exports.getAllEntries = async (req, res) => {
  const userId = req.user.id;

  try {
    const entries = await Entry.findAllByUser(userId);

    const formattedEntries = entries.map(entry => ({
        id: entry.id,
        title: entry.title,
        entry_text: entry.entry_text,
        emotion_id: entry.emotion_id,
        entry_date: entry.entry_date instanceof Date
            ? entry.entry_date.toISOString().split("T")[0]
            : entry.entry_date,
        created_at: entry.created_at,
    }));

    res.status(200).json(formattedEntries);
  } catch (error) {
    console.error('Get all entries error:', error);
    res.status(500).json({ message: 'Gagal mengambil data entri.' });
  }
};

// @desc    Mendapatkan entri 7 hari terakhir milik user
// @route   GET /api/entries/recent
// @access  Private
exports.getRecentEntries = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await Entry.findRecentByUser(userId);

    const formatted = result.map(entry => ({
      id: entry.id,
      title: entry.title,
      entry_text: entry.entry_text,
      emotion_id: entry.emotion_id,
      entry_date: entry.entry_date instanceof Date
        ? entry.entry_date.toISOString().split("T")[0]
        : entry.entry_date,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Get recent entries error:", error);
    res.status(500).json({ message: "Gagal mengambil entri terbaru." });
  }
};



// @desc    Mendapatkan satu entri berdasarkan ID
// @route   GET /api/entries/:id
// @access  Private
exports.getEntryById = async (req, res) => {
  try {
    const entryId = req.params.id;
    const userId = req.user.id;

    const entry = await Entry.findById(entryId, userId); // ✅ panggil langsung param

    if (!entry) {
      return res.status(404).json({ message: 'Entri tidak ditemukan atau Anda tidak memiliki akses.' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error('Get entry by ID error:', error);
    res.status(500).json({ message: 'Gagal mengambil data entri.' });
  }
};

// @desc    Menghapus sebuah entri
// @route   DELETE /api/entries/:id
// @access  Private
exports.deleteEntry = async (req, res) => {
  const entryId = req.params.id;
  const userId = req.user.id;

  try {
    const deletedEntry = await Entry.delete(entryId, userId); // ✅
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entri tidak ditemukan atau Anda tidak punya akses.' });
    }
    res.status(200).json({ message: 'Entri berhasil dihapus.' });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ message: 'Gagal menghapus entri.' });
  }
};

// entryController.js
exports.getEntriesByDateRange = async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  try {
    const result = await Entry.findByDateRange(userId, start, end);
    const formatted = result.map(entry => ({
      id: entry.id,
      title: entry.title,
      entry_text: entry.entry_text,
      emotion_id: entry.emotion_id,
      entry_date: entry.entry_date instanceof Date
        ? entry.entry_date.toISOString().split("T")[0]
        : entry.entry_date,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil entri berdasarkan rentang tanggal." });
  }
};

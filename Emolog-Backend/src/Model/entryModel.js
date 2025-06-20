const db = require('../Config/db');

class Entry {

  // CREATE: Menyimpan entry baru
    static async create({ userId, title, entryText, entryDate, emotion_id }) {
        const entryTimestamp = new Date(entryDate + 'T16:56:50.639Z');

        const result = await db.query(
          `INSERT INTO tbl_entries (user_id, title, entry_text, emotion_id, entry_date, created_at)
          VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
          [userId, title, entryText, emotion_id, entryTimestamp]
    );

        return result.rows[0];
    }

    static async findByDateRange(userId, startDate, endDate) {
        const query = `
            SELECT * FROM entries
            WHERE user_id = $1
            AND entry_date BETWEEN $2 AND $3
            ORDER BY entry_date ASC
        `;
        const result = await db.query(query, [userId, startDate, endDate]);
        return result.rows;
    }


  // READ: Menampilkan semua entry milik user
    static async findAllByUser(userId) {
        const query = `SELECT * FROM entries WHERE user_id = $1 ORDER BY entry_date DESC`;
        const result = await db.query(query, [userId]);
        return result.rows;
    }

    static async findRecentByUser(userId) {
        const query = `
            SELECT * FROM entries
            WHERE user_id = $1
            AND entry_date >= CURRENT_DATE - INTERVAL '7 days'
            ORDER BY entry_date DESC
        `;
        const result = await db.query(query, [userId]);
        return result.rows;
    }


  // READ: Menampilkan satu entry tertentu
  static async findById(entryId, userId) {
    const result = await db.query(
      'SELECT * FROM entries WHERE id = $1 AND user_id = $2',
      [entryId, userId]
    );
    return result.rows[0];
  }

  // DELETE: Menghapus entry milik user
  static async delete(entryId, userId) {
    const result = await db.query(
      'DELETE FROM entries WHERE id = $1 AND user_id = $2 RETURNING id',
      [entryId, userId]
    );
    return result.rows[0];
  }
}

module.exports = Entry;


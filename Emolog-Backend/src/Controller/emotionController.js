const axios = require("axios");

exports.getMood = async (req, res) => {
  try {
    const { text, only } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "text tidak boleh kosong dan harus berupa teks." });
    }

    // Kirim ke model FastAPI (lokal)
    const response = await axios.post("http://127.0.0.1:8000/get_mood/", {
      text: text,
    });

    const { mood } = response.data;

    // Kembalikan semua hasil
    return res.json({ mood });

  } catch (error) {
    console.error("Error in getMood:", error.message);
    return res.status(500).json({ message: "Gagal memanggil AI model lokal." });
  }
};

exports.getSuggestion = async (req, res) => {
  try {
    const { emotion_id } = req.body;

    if (![0, 1, 2].includes(emotion_id)) {
      return res.status(400).json({ message: `emotion_id '${emotion_id}' tidak dikenali.` });
    }

    const moodMap = {
      0: "happy",
      1: "neutral",
      2: "sad"
    };

    const mood = moodMap[emotion_id];

    const suggestions = {
      happy: [
        "Selamat! Hari ini kamu penuh kebahagiaan! Semoga hari-harimu selalu cerah!",
        "Kebahagiaanmu hari ini menyinari dunia di sekitarmu. Terus sebarkan energi positif!",
        "Hari ini adalah harimu! Semoga kebahagiaan terus mengiringi setiap langkahmu.",
        "Wah, kamu bahagia hari ini! Semoga kebahagiaanmu bertahan lama.",
        "Selamat! Keberuntunganmu terus datang hari ini, semoga semakin banyak hal baik yang terjadi.",
        "Kebahagiaan adalah hasil dari pilihanmu, dan hari ini kamu memilih untuk bahagia!",
        "Waktu untuk merayakan kebahagiaanmu! Teruslah tersenyum dan berbagi kebahagiaan dengan orang lain.",
        "Semoga kebahagiaan ini membawa banyak berkah untukmu. Nikmati setiap momennya!"
      ],
      neutral: [
        "Hidup kadang memang datar, tapi kamu selalu punya potensi untuk berubah. Semangat untuk hari ini!",
        "Setiap hari adalah kesempatan baru untuk memulai sesuatu yang lebih baik.",
        "Hari ini mungkin biasa saja, tapi kamu bisa membuatnya luar biasa!",
        "Jangan lupa untuk menikmati setiap detik hidup, meski itu hari biasa.",
        "Mungkin hari ini biasa saja, tapi ingat, kebahagiaan kecil datang dari hal-hal sederhana.",
        "Ketika hidup terasa datar, cobalah untuk menemukan keindahan di dalam kesederhanaan.",
        "Terkadang, hal terkecil bisa membuat perbedaan besar dalam hidup kita.",
        "Tidak ada yang pernah tahu apa yang akan terjadi esok hari. Tetap semangat untuk hari ini!"
      ],
      sad: [
        "Jangan khawatir, badai pasti berlalu. Semangat, kamu lebih kuat dari yang kamu kira!",
        "Hari-hari buruk pasti akan berlalu, tetaplah berjuang!",
        "Meskipun sekarang terasa berat, ingatlah bahwa kamu sudah melewati banyak hal sebelumnya.",
        "Setiap kesulitan pasti ada akhirnya, tetaplah bertahan.",
        "Semangat! Ingatlah, setelah hujan pasti ada pelangi.",
        "Tak ada yang abadi, bahkan kesedihan sekalipun.",
        "Kamu mungkin merasa terpuruk sekarang, tapi hari esok selalu memberi harapan baru.",
        "Jangan pernah merasa sendirian, banyak orang yang peduli padamu."
      ]
    };

    const suggestionList = suggestions[mood];
    const suggestion = suggestionList[Math.floor(Math.random() * suggestionList.length)];

    return res.json({ emotion_id, mood, suggestion });

  } catch (error) {
    console.error("Error in getSuggestion:", error.message);
    return res.status(500).json({ message: "Gagal menghasilkan saran." });
  }
};


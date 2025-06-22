// script/index.js (VERSI FINAL YANG SUDAH DIPERBAIKI)

import '../pages/styles.css'; // Pastikan path ini benar

document.addEventListener("DOMContentLoaded", () => {
  const isSplashScreen = document.getElementById("page-splash-screen");

  // Menggunakan IF/ELSE untuk memisahkan logika
  if (isSplashScreen) {
    function isLoggedIn() {
      return localStorage.getItem('userToken') !== null;
    }

    setTimeout(() => {
      if (isLoggedIn()) {
        // MENGGUNAKAN PATH ABSOLUT
        window.location.href = "/home/homepage.html";
      } else {
        // MENGGUNAKAN PATH ABSOLUT
        window.location.href = "/login/login.html";
      }
    }, 3000);

  } else {
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) {
      // MENGGUNAKAN PATH FETCH YANG BENAR
      fetch("/header.html")
        .then(res => res.text())
        .then(data => headerContainer.innerHTML = data)
        .catch(err => console.error("Gagal memuat header:", err));
    }

    if (footerContainer) {
      // MENGGUNAKAN PATH FETCH YANG BENAR
      fetch("/footer.html")
        .then(res => res.text())
        .then(data => footerContainer.innerHTML = data)
        .catch(err => console.error("Gagal memuat footer:", err));
    }

    const path = window.location.pathname;
    if (path.includes("register.html")) {
      import("./register.js");
    } else if (path.includes("login.html")) {
      import("./login.js");
    } else if (path.includes("profile.html")) {
      import("./profile.js");
    } else if (path.includes("homepage.html")) {
      import("./homepage.js");
    }
  }
});
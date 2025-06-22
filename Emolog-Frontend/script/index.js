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
        window.location.href = "/home/homepage";
      } else {
        // MENGGUNAKAN PATH ABSOLUT
        window.location.href = "/login/login";
      }
    }, 3000);

  } else {
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    if (headerContainer) {
      // MENGGUNAKAN PATH FETCH YANG BENAR
      fetch("/header")
        .then(res => res.text())
        .then(data => headerContainer.innerHTML = data)
        .catch(err => console.error("Gagal memuat header:", err));
    }

    if (footerContainer) {
      // MENGGUNAKAN PATH FETCH YANG BENAR
      fetch("/footer")
        .then(res => res.text())
        .then(data => footerContainer.innerHTML = data)
        .catch(err => console.error("Gagal memuat footer:", err));
    }

    const path = window.location.pathname;
    if (path.includes("/register/")) {
      import("./register.js");
    } else if (path.includes("/login/")) {
      import("./login.js");
    } else if (path.includes("/profile/")) {
      import("./profile.js");
    } else if (path.includes("/homepage/")) {
      import("./homepage.js");
    }
  }
});
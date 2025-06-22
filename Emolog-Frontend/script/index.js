import '../pages/styles.css';

document.addEventListener("DOMContentLoaded", () => {
  const SplashScreen = document.getElementById("page-splash-screen");
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  if(SplashScreen){
    function isLoggedIn() {
      // Misalnya, periksa keberadaan token di localStorage atau cookie.
      return localStorage.getItem('userToken') !== null;
    }
    // Redirect setelah animasi selesai (misalnya 3 detik)
    setTimeout(() => {
      if (isLoggedIn()) {
        // Jika sudah login, arahkan ke halaman home
        window.location.href = "home/homepage.html"; // Sesuaikan path jika perlu
      } else {
        // Jika belum login, arahkan ke halaman login
        window.location.href = "login/login.html"; // Sesuaikan path jika perlu
      }
    }, 3000);
  }

  if (headerContainer) {
    fetch("/pages/header.html")
      .then(res => res.text())
      .then(data => headerContainer.innerHTML = data)
      .catch(err => console.error("Failed to load header:", err));
  }

  if (footerContainer) {
    fetch("/pages/footer.html")
      .then(res => res.text())
      .then(data => footerContainer.innerHTML = data)
      .catch(err => console.error("Failed to load footer:", err));
  }

  // Routing dynamic JS seperti login.js, register.js, dll tetap di sini
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
});
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
  } else {
    // 1. Muat komponen header dan footer dengan PATH YANG BENAR
    loadComponent("header-container", "/header.html");
    loadComponent("footer-container", "/footer.html");

    // 2. Jalankan router untuk memuat JS spesifik halaman
    const currentPath = window.location.pathname;
    for (const page in pageRoutes) {
      if (currentPath.includes(page)) {
        import(pageRoutes[page]);
        break;
      }
    }
  }
});
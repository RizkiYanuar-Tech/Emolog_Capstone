import '../pages/styles.css';

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

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

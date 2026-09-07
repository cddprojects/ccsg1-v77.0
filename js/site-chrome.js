/**
 * Shared header and footer for all Flexikits static pages.
 * Include once per page: <script src="js/site-chrome.js"></script>
 * Placeholders: <div data-site-header></div> and <div data-site-footer></div>
 */
(function () {
  const LOGO = `
  <span class="logo-mark" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
      <path
        d="M9 8.5h14v2.7H12.2v3.5h8.7v2.7h-8.7V23H9V8.5z"
        fill="#E8F3EF"
      />
      <rect
        x="9"
        y="25"
        width="14"
        height="1.6"
        rx="0.8"
        fill="#1F7A68"
      />
    </svg>
  </span>`;

  const path = (window.location.pathname || "/").replace(/\\/g, "/");
  const onHome = path === "/" || path.endsWith("/index.html");
  const section = (id) => (onHome ? `#${id}` : `/#${id}`);

  function renderHeader(el) {
    el.outerHTML = `
<header class="site-header">
  <div class="container navbar">
    <a class="brand" href="/" aria-label="Flexikits home">
      ${LOGO}
      <span>Flexikits</span>
    </a>
    <nav class="nav-links" aria-label="Main">
      <a href="${section("opportunities")}">Opportunities</a>
      <a href="${section("flexibility")}">Flexibility</a>
      <a href="${section("how-it-works")}">How it works</a>
      <a href="${section("faq")}">FAQ</a>
      <a class="btn" href="${section("profile")}">Create profile</a>
    </nav>
    <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">&#9776;</button>
  </div>
</header>`;
  }

  function renderFooter(el) {
    el.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/">
          ${LOGO}
          Flexikits
        </a>
        <p>A Singapore website for career switchers moving into digital support work, and for saying the Flexi-Time or Flexi-Load you need.</p>
      </div>
      <div>
        <h3>Legal</h3>
        <div class="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
        </div>
      </div>
      <div>
        <h3>Contact</h3>
        <p>
          Email: <a href="mailto:support@flexikits.com">support@flexikits.com</a><br>
          Business correspondence: 1 Raffles Quay, Singapore 048583
        </p>
      </div>
    </div>
    <!--
      BUILD NOTE (not shown to visitors)
      Outstanding before launch: registered legal entity name, PDPA data protection
      officer details if required, and legal sign-off on Privacy Policy and
      Terms. See README.md "Before production".
    -->
    <div class="footer-bottom">
      Flexikits is not the employer for the opportunity areas shown unless a listing says otherwise, opportunity areas are not confirmed vacancies, and employers are not required to offer flexible work arrangements. Flexikits is not affiliated with the Ministry of Manpower.<br>
      &copy; 2026 Flexikits. All rights reserved.
    </div>
  </div>
</footer>`;
  }

  document.querySelectorAll("[data-site-header]").forEach(renderHeader);
  document.querySelectorAll("[data-site-footer]").forEach(renderFooter);

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav && !toggle.dataset.bound) {
    toggle.dataset.bound = "1";
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();

// 1. Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile menu
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", () => navLinks.classList.remove("open"));

// 3. Dark / light theme (remembers your choice)
const themeBtn = document.querySelector(".theme-toggle");
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// 4. Typing effect (edit the words!)
const words = ["websites", "web apps", "useful tools"];
const typed = document.getElementById("typed");
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 100); }
  else if (!deleting) { deleting = true; setTimeout(type, 1500); }
  else if (c > 0) { c--; setTimeout(type, 50); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

// 5. Reveal sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 6. Contact form validation
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email, message } = form.elements;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!name.value.trim() || !emailOk || !message.value.trim()) {
    status.className = "error";
    status.textContent = "Please fill in all fields with a valid email.";
    return;
  }
  // This only simulates sending. See notes to connect a real service.
  status.className = "ok";
  status.textContent = "Thanks! Your message was sent (demo).";
  form.reset();
});

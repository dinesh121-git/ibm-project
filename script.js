// Starry background animation
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create star objects
const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5,
  alpha: Math.random(),
  delta: Math.random() * 0.02
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;
  });
  requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach(s => observer.observe(s));

// Animated custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent actual form submit

  emailjs.sendForm("service_1vacwdk", "template_rf13p02", this)
    .then(() => {
      alert("✅ Message sent successfully!");
      this.reset(); // Clear form
    }, (error) => {
      alert("❌ Failed to send. Try again.");
      console.error("EmailJS Error:", error);
    });
});


// Expand cursor on hover
document.querySelectorAll('a, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
const taglines = [
  "ML Enthusiast",
  "Web Developer",
  "Python Programmer"
];

const typingText = document.getElementById('typing-text');
let index = 0;
let charIndex = 0;
let currentTagline = '';
let isDeleting = false;

function typeEffect() {
  if (index >= taglines.length) index = 0;
  currentTagline = taglines[index];

  let displayed = isDeleting
    ? currentTagline.substring(0, charIndex--)
    : currentTagline.substring(0, charIndex++);

  typingText.textContent = displayed;

  if (!isDeleting && charIndex === currentTagline.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 40 : 100);
  }
}

typeEffect();


// --- 1. Typing Animation ---
const typingElement = document.getElementById('typing');
const texts = [
  "A Professional Front-End Developer.",
  "Expert in HTML, CSS & JavaScript.",
  "Building modern, responsive user interfaces."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];
  let display = currentText;

  if (isDeleting) {
    display = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    display = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  typingElement.textContent = display;

  let typingSpeed = 100;

  if (isDeleting) {
    typingSpeed /= 2; // Faster deletion
  }

  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 2000; // Pause at end of sentence
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500; // Pause before starting new sentence
  }

  setTimeout(type, typingSpeed);
}

// --- 2. Theme Toggle ---
const themeToggleBtn = document.querySelector('.theme-toggle');

window.toggleTheme = function () {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  // Update icon based on mode
  themeToggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Start typing animation after initial setup
  type();
});

// --- 3. Scroll-to-Top Button ---
const scrollTopButton = document.querySelector('.scroll-top');

window.onscroll = function () {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
};

window.scrollToTop = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// --- 4. Intersection Observer for Animations (Skills) ---
const skillCards = document.querySelectorAll('.skill-card');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2 // Trigger when 20% of the item is visible
};

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const progress = card.getAttribute('data-progress');
      // Set the CSS variable to trigger the progress animation
      card.style.setProperty('--progress', `${progress}%`);
      card.classList.add('animate');
      observer.unobserve(card); // Stop observing once animated
    }
  });
}, observerOptions);

skillCards.forEach(card => {
  skillObserver.observe(card);
});

// --- 5. Project Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons and add to the clicked one
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block'; // Show the card
        setTimeout(() => { card.style.opacity = 1; card.style.transform = 'scale(1)'; }, 10);
      } else {
        card.style.opacity = 0; // Hide it smoothly
        card.style.transform = 'scale(0.8)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// --- 6. Contact Form Submission (Prevent Default) ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! (Form submission is disabled in this demo)');
    // Here you would typically send data using fetch() or XMLHttpRequest
    contactForm.reset();
  });
}
// ===== SWIPER CONFIGURATION =====
var projectsSwiper = new Swiper(".projectsSwiper", {
  cssMode: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// ===== NAVIGATION MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== ACTIVE NAVIGATION LINK ON SCROLL =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
    } else {
      document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
    }
  });

  // Header background on scroll
  const header = document.querySelector('.header');
  if (scrollY > 50) {
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const texts = [
  'Desenvolvedor Full Stack',
  'Especialista em Python',
  'Desenvolvedor Web',
  'Entusiasta de Tecnologia'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
}

if (typingText) {
  setTimeout(type, 1000);
}

// ===== PROJECT FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectSlides = document.querySelectorAll('.swiper-slide[data-category]');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectSlides.forEach(slide => {
      const categories = slide.getAttribute('data-category').split(' ');
      
      if (filter === 'all' || categories.includes(filter)) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });

    // Update swiper after filtering
    projectsSwiper.update();
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const whatsappMessage = `*Nova mensagem do portfólio*%0A%0A*Nome:* ${name}%0A*Email:* ${email}%0A*Assunto:* ${subject}%0A*Mensagem:* ${message}`;
    
    // WhatsApp number (remove spaces and special characters)
    const phoneNumber = '5511944427626';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');

    // Reset form
    contactForm.reset();

    // Show success message (you can customize this)
    alert('Redirecionando para o WhatsApp...');
  });

  // Form validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.style.borderColor = '#ff4444';
      } else {
        input.style.borderColor = '#e0e0e0';
      }
    });

    input.addEventListener('focus', () => {
      input.style.borderColor = '#fd4766';
    });
  });
}

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  '.about-content, .skills-category, .timeline-item, .education-item, .project-card, .contact-item'
);

animateElements.forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// ===== SMOOTH SCROLL FOR ALL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== PRELOAD IMAGES =====
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
});

// ===== PREVENT FLASH OF UNSTYLED CONTENT =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.visibility = 'visible';
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Olá! Bem-vindo ao meu portfólio!', 'color: #fd4766; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Desenvolvido por Rafael Ken Miyamoto', 'color: #6c63ff; font-size: 14px;');
console.log('%c💼 Entre em contato: rafaelmiyamoto.rm15@gmail.com', 'color: #1d1d24; font-size: 12px;');
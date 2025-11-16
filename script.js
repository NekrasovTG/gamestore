function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

function initParallax() {
  const floatingGames = document.querySelectorAll('.game-card');
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    floatingGames.forEach((card) => {
      const depth = parseFloat(card.dataset.depth) || 0.3;
      const x = (clientX - centerX) * depth * 0.05;
      const y = (clientY - centerY) * depth * 0.05;
      
      card.style.setProperty('--parallax-x', `${x}px`);
      card.style.setProperty('--parallax-y', `${y}px`);
    });
  });
}

function startCountdown() {
  let hours = 12;
  let minutes = 34;
  let seconds = 56;

  setInterval(() => {
    seconds--;
    
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    
    if (minutes < 0) {
      minutes = 59;
      hours--;
    }
    
    if (hours < 0) {
      hours = 23;
      minutes = 59;
      seconds = 59;
    }
    
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString('en-US');
  }, 16);
}

function updateLiveCounter() {
  const counter = document.getElementById('live-counter');
  let count = 1247;
  
  setInterval(() => {
    if (Math.random() > 0.7) {
      count += Math.floor(Math.random() * 3) + 1;
      counter.textContent = count.toLocaleString('en-US');
      counter.style.color = '#4CAF50';
      setTimeout(() => {
        counter.style.color = '#667eea';
      }, 300);
    }
  }, 5000);
}

const purchaseNotifications = [
  { avatar: '👨‍💼', name: 'Alexander', product: 'GTA V' },
  { avatar: '👩‍🎓', name: 'Anna', product: 'Steam Wallet $20' },
  { avatar: '🧑‍💻', name: 'Max', product: 'Valorant Points' },
  { avatar: '👨‍🔬', name: 'Dmitry', product: 'Elden Ring' },
  { avatar: '👩‍🎨', name: 'Catherine', product: 'Cyberpunk 2077' },
  { avatar: '🧑‍🚀', name: 'Ivan', product: 'PSN $50' },
];

function showRandomNotification() {
  const notification = purchaseNotifications[Math.floor(Math.random() * purchaseNotifications.length)];
  const notificationEl = document.createElement('div');
  notificationEl.className = 'notification';
  notificationEl.innerHTML = `
    <div class="notification-header">
      <span class="notification-avatar">${notification.avatar}</span>
      <div>
        <div class="notification-text">
          <strong>${notification.name}</strong> purchased
        </div>
        <div class="notification-product">${notification.product}</div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('notifications');
  container.appendChild(notificationEl);
  
  setTimeout(() => {
    notificationEl.remove();
  }, 3000);
}

let cartCount = 0;

function addToCart(productName, price) {
  cartCount++;
  document.querySelector('.cart-count').textContent = cartCount;
  
  const cartBtn = document.querySelector('.cart-btn');
  cartBtn.style.transform = 'scale(1.2)';
  setTimeout(() => {
    cartBtn.style.transform = 'scale(1)';
  }, 200);
  
  const notificationEl = document.createElement('div');
  notificationEl.className = 'notification';
  notificationEl.innerHTML = `
    <div class="notification-header">
      <span class="notification-avatar">✅</span>
      <div>
        <div class="notification-text">Added to cart!</div>
        <div class="notification-product">${productName} - $${price.toLocaleString('en-US')}</div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('notifications');
  container.appendChild(notificationEl);
  
  setTimeout(() => {
    notificationEl.remove();
  }, 3000);
}

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const elementsToObserve = [
    ...document.querySelectorAll('.product-item'),
    ...document.querySelectorAll('.sale-item'),
    ...document.querySelectorAll('.currency-card'),
    ...document.querySelectorAll('.review-card')
  ];

  elementsToObserve.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.05}s`;
    observer.observe(item);
  });
}

function initStatCounters() {
  const statCounter = document.getElementById('total-sales');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statCounter.dataset.animated) {
        animateCounter(statCounter, 15234);
        statCounter.dataset.animated = 'true';
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statCounter);
}

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initParallax();
  startCountdown();
  updateLiveCounter();
  observeElements();
  initStatCounters();
  
  setInterval(showRandomNotification, 8000);
  setTimeout(showRandomNotification, 3000);
});

document.querySelector('.cta-button')?.addEventListener('click', () => {
  document.querySelector('#games').scrollIntoView({ behavior: 'smooth' });
});
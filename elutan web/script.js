// Mobile menu toggle with overlay
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking overlay
menuOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Form will submit to Formspree
    });
}

// Order form handling
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    const checkboxes = document.querySelectorAll('.product-option input[type="checkbox"]');
    const selectedProductsInput = document.getElementById('selectedProducts');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedProducts);
    });

    function updateSelectedProducts() {
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        selectedProductsInput.value = selected.join(', ') || 'None selected';
    }

    orderForm.addEventListener('submit', (e) => {
        const hasSelection = Array.from(checkboxes).some(cb => cb.checked);
        
        if (!hasSelection) {
            e.preventDefault();
            alert('Please select at least one product to order.');
            return;
        }
        
        updateSelectedProducts();
        console.log('Selected Products:', selectedProductsInput.value);
    });
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};
// Product availability management
const productAvailability = {
    0: 'available',      // Livestock & Pork
    1: 'available',      // Palm Oil
    2: 'available',      // Plantain
    3: 'available',      // Catfish
    4: 'limited',        // Honey
    5: 'available',      // Vegetables
    6: 'available'       // Cocoa
};

// Update availability badges
document.querySelectorAll('.product-card').forEach((card, index) => {
    const badge = card.querySelector('.availability-badge');
    if (badge) {
        const status = productAvailability[index];
        badge.className = `availability-badge ${status}`;
        
        // Update text based on status
        const statusText = {
            'available': 'Available',
            'limited': 'Limited Stock',
            'out-of-stock': 'Out of Stock',
            'seasonal': 'Seasonal',
            'pre-order': 'Pre-Order'
        };
        
        badge.textContent = statusText[status];
    }
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .operation-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});
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
// Order form handling - FIXED VERSION
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    const checkboxes = document.querySelectorAll('.product-checkbox-card input[type="checkbox"]');
    const selectedProductsInput = document.getElementById('selectedProducts');

    // Update selected products when checkboxes change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedProducts);
    });

    function updateSelectedProducts() {
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        if (selectedProductsInput) {
            selectedProductsInput.value = selected.join(', ') || 'None';
        }
        
        console.log('Selected products:', selected); // For debugging
    }

    // Handle form submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default first
        
        const hasSelection = Array.from(checkboxes).some(cb => cb.checked);
        
        if (!hasSelection) {
            alert('Please select at least one product to order.');
            return;
        }
        
        // Update the hidden field with selected products
        updateSelectedProducts();
        
        // Show loading state
        const submitBtn = orderForm.querySelector('.submit-order-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Submitting...</span>';
        submitBtn.disabled = true;
        
        // Submit the form
        const formData = new FormData(orderForm);
        
        fetch(orderForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('✅ Thank you! Your order request has been submitted successfully. We will contact you within 24 hours.');
                orderForm.reset();
                checkboxes.forEach(cb => cb.checked = false);
            } else {
                alert('⚠️ There was an issue submitting your order. Please try again or call us directly.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('⚠️ Network error. Please check your connection and try again.');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
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

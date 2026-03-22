// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');

// Update theme toggle button icon
function updateThemeToggleIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Theme toggle event listener
if (themeToggle) {
    // Initialize theme toggle icon
    updateThemeToggleIcon();

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');

        // Save theme preference
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        // Update icon
        updateThemeToggleIcon();
    });
}
// Contact Form Validation and Submission
const CONTACT_EMAIL = 'manojreddi2005@gmail.com';
const contactForm = document.querySelector('.contact-form form'); // Make sure we're grabbing the actual form
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const message = this.querySelector('textarea[name="message"]');

        // Simple validation
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            hideError(name);
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            hideError(email);
        }

        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else {
            hideError(message);
        }

        if (isValid) {
            e.preventDefault(); // Prevent default since we'll submit via AJAX
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Submit using FormSubmit AJAX API
            fetch('https://formsubmit.co/ajax/manojreddi2005@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                    _template: 'box',
                    _subject: `New Portfolio Message from ${name.value}`
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success || data.success === "true") {
                    alert('Message sent successfully! Thank you for reaching out.');
                    this.reset();
                } else {
                    alert('Oops! There was a problem confirming your message.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! There was a problem submitting your form. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
            
        } else {
            e.preventDefault(); // Only prevent submission if validation fails
        }
    });
}

function showError(element, message) {
    const formGroup = element.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff007f';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    element.style.borderColor = '#ff007f';
}

function hideError(element) {
    const formGroup = element.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        errorElement.remove();
    }

    element.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Initialize Typed.js for Hero Section
    const typingElement = document.getElementById('typing-effect');
    if (typingElement && typeof Typed !== 'undefined') {
        new Typed('#typing-effect', {
            strings: [
                'Data Analyst',
                'Dashboard Developer',
                'Problem Solver',
                'Aspiring Data Scientist'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});

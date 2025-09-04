document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    let message = '';

    // Get form values
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const msg = document.getElementById('message').value.trim();

    // Basic validation
    if (!fullname || !email || !subject || !msg) {
        valid = false;
        message = 'Please fill in all fields.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        valid = false;
        message = 'Please enter a valid email address.';
    }

    const formMessage = document.getElementById('form-message');
    if (valid) {
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.style.background = '#27ae60';
        formMessage.classList.add('active');
        this.reset();
        setTimeout(() => {
            formMessage.classList.remove('active');
        }, 3000);
    } else {
        formMessage.textContent = message;
        formMessage.style.background = '#e74c3c';
        formMessage.classList.add('active');
        setTimeout(() => {
            formMessage.classList.remove('active');
        }, 3000);
    }
});
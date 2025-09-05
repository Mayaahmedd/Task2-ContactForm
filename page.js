// Enhanced contact form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    // Real-time validation for better UX
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearMessage();
        
        // Validate all fields
        const validation = validateForm();
        
        if (validation.isValid) {
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            // In a real application, you would send the data to a server here
        } else {
            showMessage(validation.message, 'error');
        }
    });
    
    function validateForm() {
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Check for empty fields
        if (!fullname) {
            return { isValid: false, message: 'Full name is required.' };
        }
        
        if (!email) {
            return { isValid: false, message: 'Email address is required.' };
        }
        
        if (!subject) {
            return { isValid: false, message: 'Subject is required.' };
        }
        
        if (!message) {
            return { isValid: false, message: 'Message is required.' };
        }
        
        // Validate name (at least 2 characters, no numbers)
        if (fullname.length < 2) {
            return { isValid: false, message: 'Full name must be at least 2 characters long.' };
        }
        
        if (/\d/.test(fullname)) {
            return { isValid: false, message: 'Full name should not contain numbers.' };
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, message: 'Please enter a valid email address.' };
        }
        
        // Validate subject (at least 3 characters)
        if (subject.length < 3) {
            return { isValid: false, message: 'Subject must be at least 3 characters long.' };
        }
        
        // Validate message (at least 10 characters)
        if (message.length < 10) {
            return { isValid: false, message: 'Message must be at least 10 characters long.' };
        }
        
        return { isValid: true, message: '' };
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove any existing error styling
        field.style.borderColor = '';
        
        if (field.hasAttribute('required') && !value) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Specific validations
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
        }
        
        if (field.id === 'fullname' && value && value.length < 2) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (field.id === 'subject' && value && value.length < 3) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (field.id === 'message' && value && value.length < 10) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
        
        // Valid field
        field.style.borderColor = '#27ae60';
        return true;
    }
    
    function clearFieldError(e) {
        const field = e.target;
        if (field.style.borderColor === 'rgb(231, 76, 60)') {
            field.style.borderColor = '';
        }
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.style.background = type === 'success' ? '#27ae60' : '#e74c3c';
        formMessage.classList.add('active');
        
        setTimeout(() => {
            formMessage.classList.remove('active');
        }, 5000);
    }
    
    function clearMessage() {
        formMessage.classList.remove('active');
        formMessage.textContent = '';
    }
});
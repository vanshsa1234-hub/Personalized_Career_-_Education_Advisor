// Common JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const setupNavigation = () => {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const currentActive = document.querySelector('nav a.active');
                if (currentActive) currentActive.classList.remove('active');
                link.classList.add('active');
            });
        });
    };

    // User authentication check
    const checkAuth = () => {
        const user = localStorage.getItem('user');
        if (!user && !window.location.pathname.includes('login.html') && 
            !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    };

    // Initialize
    setupNavigation();
    checkAuth();
});

// Utility functions
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('input[required]').forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// ============================================
// SMART HEALTH SURVEILLANCE SYSTEM
// Interactive JavaScript Functions
// ============================================

// ====================================== 
// GLOBAL VARIABLES & CONFIGURATION
// ====================================== 
const config = {
    animationDuration: 300,
    toastDuration: 3000,
    loadingDelay: 1500,
    counterSpeed: 2000,
};

// ====================================== 
// INITIALIZATION
// ====================================== 
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCounters();
    initializeCharts();
    initializeForms();
    initializeInteractions();
    initializeAI();
    initializeAnimations();
    console.log('Smart Health Surveillance System Initialized ✓');
});

// ====================================== 
// NAVIGATION FUNCTIONS
// ====================================== 
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
    }
    
    // Highlight active section on scroll
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ====================================== 
// COUNTER ANIMATIONS
// ====================================== 
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target], .card-value[data-count]');
    
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target') || element.getAttribute('data-count'));
    const duration = config.counterSpeed;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            // Handle decimal values
            if (target % 1 !== 0) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = Math.floor(target).toLocaleString();
            }
        }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(element);
}

// ====================================== 
// CHART INITIALIZATION (Placeholder)
// ====================================== 
function initializeCharts() {
    // Chart period buttons
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            chartButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            updateChartData(period);
        });
    });
}

function updateChartData(period) {
    showLoading();
    
    // Simulate data loading
    setTimeout(() => {
        hideLoading();
        showToast(`Chart updated for ${period} period`);
    }, 1000);
}

// ====================================== 
// FORM HANDLING
// ====================================== 
function initializeForms() {
    // Consultation Form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmit);
    }
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
    
    // AI Query Form
    const aiQueryForm = document.getElementById('aiQueryForm');
    if (aiQueryForm) {
        aiQueryForm.addEventListener('submit', handleAIQuery);
    }
    
    // Set minimum date for appointment (today)
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDate.setAttribute('min', today);
    }
}

function handleConsultationSubmit(e) {
    e.preventDefault();
    
    showLoading();
    
    const formData = {
        name: document.getElementById('patientName').value,
        age: document.getElementById('patientAge').value,
        gender: document.getElementById('patientGender').value,
        symptoms: document.getElementById('symptoms').value,
        contact: document.getElementById('contactNumber').value
    };
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showToast('Consultation request submitted successfully! Our team will contact you soon.');
        e.target.reset();
    }, config.loadingDelay);
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    showLoading();
    
    const formData = {
        name: document.getElementById('appointmentName').value,
        hospital: document.getElementById('hospitalSelect').value,
        department: document.getElementById('department').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        reason: document.getElementById('reason').value
    };
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showToast('Appointment booked successfully! You will receive a confirmation SMS.');
        e.target.reset();
    }, config.loadingDelay);
}

// ====================================== 
// AI CHAT FUNCTIONALITY
// ====================================== 
function initializeAI() {
    // Suggestion chips
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const query = this.textContent;
            document.getElementById('aiQueryInput').value = query;
            handleAIQuery(new Event('submit'));
        });
    });
}

function handleAIQuery(e) {
    e.preventDefault();
    
    const input = document.getElementById('aiQueryInput');
    const query = input.value.trim();
    
    if (!query) return;
    
    // Add user message
    addAIMessage(query, 'user');
    input.value = '';
    
    // Show typing indicator
    showAITyping();
    
    // Simulate AI response
    setTimeout(() => {
        removeAITyping();
        const response = generateAIResponse(query);
        addAIMessage(response, 'ai');
    }, 1500);
}

function addAIMessage(message, type) {
    const messagesContainer = document.getElementById('aiMessages');
    const welcomeMessage = document.querySelector('.ai-welcome');
    
    // Hide welcome message on first interaction
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
            <div class="message-text">${message}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showAITyping() {
    const messagesContainer = document.getElementById('aiMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-typing';
    typingDiv.innerHTML = `
        <i class="fas fa-robot"></i>
        <div class="typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeAITyping() {
    const typingIndicator = document.querySelector('.ai-typing');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateAIResponse(query) {
    // Simple keyword-based responses
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('cold') || lowerQuery.includes('flu')) {
        return 'For common cold symptoms, I recommend rest, staying hydrated, and over-the-counter medications. If symptoms persist for more than a week or worsen, please consult a doctor. Would you like to book an appointment?';
    } else if (lowerQuery.includes('vaccine') || lowerQuery.includes('vaccination')) {
        return 'We have COVID-19, Flu, and Hepatitis B vaccines available. Vaccination schedule can be customized based on age and medical history. Would you like me to help you schedule a vaccination appointment?';
    } else if (lowerQuery.includes('diabetes')) {
        return 'Diabetes management includes regular blood sugar monitoring, healthy diet, exercise, and medication as prescribed. Our diabetes care team can provide personalized guidance. Would you like to consult with a specialist?';
    } else if (lowerQuery.includes('appointment')) {
        return 'I can help you book an appointment! Please use the appointment booking form on this page, or let me know which hospital and department you prefer.';
    } else {
        return 'Thank you for your question. For accurate medical advice specific to your situation, I recommend consulting with one of our healthcare professionals. Would you like to book a consultation or appointment?';
    }
}

// Add CSS for AI messages dynamically
const aiMessageStyles = document.createElement('style');
aiMessageStyles.textContent = `
    .ai-message {
        margin-bottom: 1rem;
        animation: slideIn 0.3s ease-out;
    }
    
    .message-content {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
    }
    
    .user-message .message-content {
        flex-direction: row-reverse;
    }
    
    .message-content i {
        font-size: 1.5rem;
        color: var(--primary-color);
        margin-top: 0.25rem;
    }
    
    .message-text {
        background: white;
        padding: 0.75rem 1rem;
        border-radius: 1rem;
        max-width: 80%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .user-message .message-text {
        background: var(--primary-color);
        color: white;
    }
    
    .ai-typing {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .typing-indicator {
        display: flex;
        gap: 0.25rem;
        padding: 0.75rem 1rem;
        background: white;
        border-radius: 1rem;
    }
    
    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: var(--gray-400);
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(aiMessageStyles);

// ====================================== 
// BUTTON INTERACTIONS
// ====================================== 
function initializeInteractions() {
    // Refresh Data Button
    const refreshDataBtn = document.getElementById('refreshDataBtn');
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', function() {
            this.classList.add('spinning');
            showLoading();
            setTimeout(() => {
                hideLoading();
                this.classList.remove('spinning');
                showToast('Data refreshed successfully!');
                // Reset and re-animate counters
                initializeCounters();
            }, 1500);
        });
    }
    
    // View Analytics Button
    const viewAnalyticsBtn = document.getElementById('viewAnalyticsBtn');
    if (viewAnalyticsBtn) {
        viewAnalyticsBtn.addEventListener('click', function() {
            showToast('Opening detailed analytics dashboard...');
        });
    }
    
    // Generate Alert Button
    const generateAlertBtn = document.getElementById('generateAlertBtn');
    if (generateAlertBtn) {
        generateAlertBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to generate an outbreak alert? This will notify all registered hospitals and health officials.')) {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showToast('Outbreak alert generated and sent to all stakeholders!');
                }, 1500);
            }
        });
    }
    
    // Update Inventory Button
    const updateInventoryBtn = document.getElementById('updateInventoryBtn');
    if (updateInventoryBtn) {
        updateInventoryBtn.addEventListener('click', function() {
            showToast('Opening inventory update panel...');
        });
    }
    
    // Hospital Status Button
    const viewHospitalStatusBtn = document.getElementById('viewHospitalStatusBtn');
    if (viewHospitalStatusBtn) {
        viewHospitalStatusBtn.addEventListener('click', function() {
            showToast('Loading comprehensive hospital status...');
        });
    }
    
    // Download Report Button
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function() {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast('Report downloaded successfully!');
            }, 1500);
        });
    }
    
    // Generate Report Button
    const generateReportBtn = document.getElementById('generateReportBtn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast('Comprehensive report generated and ready for download!');
            }, 2000);
        });
    }
    
    // Strategic Planning Button
    const strategicPlanningBtn = document.getElementById('strategicPlanningBtn');
    if (strategicPlanningBtn) {
        strategicPlanningBtn.addEventListener('click', function() {
            showToast('Launching strategic planning module...');
        });
    }
    
    // Table search functionality
    const hospitalSearch = document.getElementById('hospitalSearch');
    if (hospitalSearch) {
        hospitalSearch.addEventListener('input', function() {
            filterHospitalTable(this.value);
        });
    }
    
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showToast('You have 3 new notifications');
        });
    }
    
    // User button
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            showToast('User profile menu');
        });
    }
}

// Add spinning animation CSS
const spinAnimation = document.createElement('style');
spinAnimation.textContent = `
    .spinning i {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(spinAnimation);

// ====================================== 
// HOSPITAL TABLE FILTER
// ====================================== 
function filterHospitalTable(query) {
    const table = document.getElementById('hospitalTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const hospitalName = rows[i].cells[0].textContent.toLowerCase();
        const location = rows[i].cells[1].textContent.toLowerCase();
        
        if (hospitalName.includes(query.toLowerCase()) || location.includes(query.toLowerCase())) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// ====================================== 
// TOAST NOTIFICATION
// ====================================== 
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, config.toastDuration);
}

// ====================================== 
// LOADING OVERLAY
// ====================================== 
function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.remove('show');
}

// ====================================== 
// ANIMATIONS & SCROLL EFFECTS
// ====================================== 
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.dash-card, .resource-card, .admin-card, .service-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ====================================== 
// REAL-TIME CLOCK (Optional)
// ====================================== 
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // You can add a clock element to display this
    // For now, it's just available for use
}

// Update clock every second
setInterval(updateClock, 1000);

// ====================================== 
// KEYBOARD SHORTCUTS (Optional)
// ====================================== 
document.addEventListener('keydown', function(e) {
    // Alt + H: Go to home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('[href="#home"]').click();
    }
    
    // Alt + S: Go to surveillance
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.querySelector('[href="#surveillance"]').click();
    }
    
    // Alt + A: Go to admin
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        document.querySelector('[href="#admin"]').click();
    }
    
    // Escape: Close any open modals/menus
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mainNav');
        if (mobileNav && mobileNav.classList.contains('mobile-open')) {
            mobileNav.classList.remove('mobile-open');
        }
    }
});

// ====================================== 
// PERFORMANCE MONITORING (Development)
// ====================================== 
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', (pageLoadTime / 1000).toFixed(2), 'seconds');
        }, 0);
    });
}

// ====================================== 
// UTILITY FUNCTIONS
// ====================================== 
function formatNumber(num) {
    return num.toLocaleString();
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================================== 
// EXPORT FOR CONSOLE DEBUGGING
// ====================================== 
window.healthSystem = {
    showToast,
    showLoading,
    hideLoading,
    version: '1.0.0',
    build: '2024.02.20'
};

console.log('%c Smart Health Surveillance System ', 'background: #0066CC; color: white; font-size: 16px; padding: 10px;');
console.log('%c Version 1.0.0 | Build 2024.02.20 ', 'background: #00A896; color: white; font-size: 12px; padding: 5px;');
console.log('%c System Status: Online ✓ ', 'color: #10B981; font-weight: bold; font-size: 14px;');
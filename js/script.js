let currentSlide = 0;
let slides = [];
let totalSlides = 0;

// Uuenda kõik esineja fotod localStorage-ist
function updateAllPresenterPhotos() {
    const savedPhoto = localStorage.getItem('presenterPhoto');
    if (savedPhoto) {
        const presenterPhotos = document.querySelectorAll('.presenter-photo');
        presenterPhotos.forEach(img => {
            img.src = savedPhoto;
        });
    }
}

// Mine otse slaidile (kasutatakse setup slaidist)
function goToSlide(n) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');

    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }

    // Uuenda fotod iga kord kui slaid vahetub
    updateAllPresenterPhotos();
}

// Initialize slides after DOM is fully loaded
function initSlides() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    const totalSlidesElement = document.getElementById('totalSlides');
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }

    // Show first slide on load (setup slide)
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // Uuenda esineja fotod kohe laadimisel
    updateAllPresenterPhotos();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlides);
} else {
    initSlides();
}

function showSlide(n) {
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');

    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }

    // Uuenda esineja fotod iga slaidi vahetusel
    updateAllPresenterPhotos();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('keydown', (e) => {
    // Ära reageeri kui fookus on input väljal
    const activeElement = document.activeElement;
    const isInputField = activeElement.tagName === 'INPUT' ||
                         activeElement.tagName === 'TEXTAREA' ||
                         activeElement.isContentEditable;

    if (isInputField) {
        return; // Lase kasutajal tippida
    }

    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

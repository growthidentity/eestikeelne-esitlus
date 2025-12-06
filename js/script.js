let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('totalSlides').textContent = totalSlides;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
    document.getElementById('currentSlide').textContent = currentSlide + 1;

    // Update presenter photos from localStorage
    updateAllPresenterPhotos();

    // Apply localization to the new slide
    if (window.MarketLocalization) {
        window.MarketLocalization.applyFullLocalization();
    }

    // Update calculator and leverage slides if they exist
    if (typeof window.updateCalculator === 'function') {
        window.updateCalculator();
    }
    if (typeof window.updateLeverageSlide === 'function') {
        window.updateLeverageSlide();
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Go to specific slide (for setup page)
function goToSlide(n) {
    showSlide(n);
}

// Update all presenter photos from localStorage
function updateAllPresenterPhotos() {
    const savedPhoto = localStorage.getItem('presenterPhoto');
    if (savedPhoto) {
        document.querySelectorAll('.presenter-photo').forEach(img => {
            img.src = savedPhoto;
        });
    }
}

// Update photos on load
window.addEventListener('load', updateAllPresenterPhotos);

// Apply localization on load
window.addEventListener('load', function() {
    if (window.MarketLocalization) {
        window.MarketLocalization.applyFullLocalization();
    }
});

document.addEventListener('keydown', (e) => {
    // Don't change slides if typing in an input field
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
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
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchStartTime = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchStartTime = Date.now();
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleTouchEnd(e);
});

function handleTouchEnd(e) {
    const touchDuration = Date.now() - touchStartTime;
    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);

    // Skip if on setup slide (slide 0)
    if (currentSlide === 0) {
        return;
    }

    // Check if it's a tap (not a swipe) - short duration and minimal movement
    const isTap = touchDuration < 300 && deltaX < 30 && deltaY < 30;

    // Check if tapped on interactive element (buttons, inputs, links, etc.)
    const target = e.target;
    const isInteractive = target.closest('button, a, input, select, textarea, .market-option, [onclick]');

    if (isTap && !isInteractive) {
        // Tap navigation - left half = back, right half = forward
        const screenWidth = window.innerWidth;
        const tapX = touchEndX;

        if (tapX < screenWidth * 0.35) {
            // Tapped on left 35% - go back
            prevSlide();
        } else if (tapX > screenWidth * 0.65) {
            // Tapped on right 35% - go forward
            nextSlide();
        }
        // Middle 30% does nothing (safe zone)
    } else {
        // Handle as swipe
        if (deltaX > 50 && deltaX > deltaY) {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
            } else if (touchEndX > touchStartX + 50) {
                prevSlide();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    window.openLightbox = (index) => {
        if (lightbox && galleryItems[index]) {
            lightbox.style.display = 'flex';
            lightboxImg.src = galleryItems[index].src;
        }
    };

    window.closeLightbox = () => {
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    };

    // Close lightbox on outside click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Video Autoplay on Scroll
    const video = document.getElementById('promo-video');
    const videoWrapper = document.querySelector('.video-wrapper');

    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(error => {
                        console.log("Autoplay prevented by browser policy", error);
                    });
                    videoWrapper.classList.add('playing');
                } else {
                    video.pause();
                    videoWrapper.classList.remove('playing');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }

    // Hero Auto Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Floating Bubbles Generation
    const bubblesContainer = document.querySelector('.bubbles-container');
    if (bubblesContainer) {
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Randomize size and position
            const size = Math.random() * 40 + 10 + 'px';
            bubble.style.width = size;
            bubble.style.height = size;
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = Math.random() * 5 + 5 + 's';
            bubble.style.animationDelay = Math.random() * 5 + 's';

            bubblesContainer.appendChild(bubble);
        }
    }
});

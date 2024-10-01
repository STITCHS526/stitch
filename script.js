function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const navButtons = document.querySelectorAll('.hero-nav-button');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.opacity = '1';
                slide.style.zIndex = '1';
            } else {
                slide.style.opacity = '0';
                slide.style.zIndex = '0';
            }
        });
        navButtons.forEach((button, i) => {
            button.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    showSlide(0); // 显示第一张幻灯片
    setInterval(nextSlide, 5000); // 每5秒自动切换幻灯片
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initLightbox() {
    const projectItems = document.querySelectorAll('.project-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    console.log('Lightbox elements:', { lightbox, lightboxImg, lightboxClose });

    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Image clicked:', this.src);
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
            lightboxImg.style.maxHeight = '90vh';
            lightboxImg.style.maxWidth = '90vw';
            document.body.style.overflow = 'hidden';
            console.log('Lightbox displayed, image src set to:', lightboxImg.src);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        console.log('Closing lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    console.log('Lightbox initialization complete');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    initHeroCarousel();
    initSmoothScroll();
    initLightbox();
});

// 添加导航栏交互
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // 切换导航菜单
        nav.classList.toggle('nav-active');

        // 动画链接
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 汉堡菜单动画
        burger.classList.toggle('toggle');
    });
}

navSlide();
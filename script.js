// Navbar dark on scroll
window.addEventListener("scroll", function(){
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const hamburger = document.getElementById("hamburger");
const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");

// Open menu
hamburger.addEventListener("click", () => {
    hamburger.classList.add("active");
    menuOverlay.classList.add("active");
});

menuClose.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menuOverlay.classList.remove("active");

    // Reset animation
    document.querySelectorAll(".menu-links li").forEach(link => {
        link.style.animation = "none";
        link.offsetHeight; // trigger reflow
        link.style.animation = "";
    });
});

// Close when clicking link
document.querySelectorAll(".menu-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menuOverlay.classList.remove("active");

        document.querySelectorAll(".menu-links li").forEach(link => {
            link.style.animation = "none";
            link.offsetHeight;
            link.style.animation = "";
        });
    });
});






//intro video
const videoPreview = document.getElementById("videoPreview");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.getElementById("closeVideo");
const modalVideo = document.getElementById("modalVideo");

/* Scroll zoom effect, scaled for responsiveness */
window.addEventListener("scroll", () => {
    const rect = videoPreview.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if(rect.top < windowHeight && rect.bottom > 0){
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clamped = Math.min(Math.max(progress, 0), 1);

        // scale from 0.95 → 1.05
        const scale = 0.95 + (clamped * 0.1);

        // apply only on desktop
        if(window.innerWidth > 768){
            videoPreview.style.transform = `scale(${scale})`;
        }
    }
});

/* Open modal when clicking preview */
videoPreview.addEventListener("click", () => {
    videoModal.classList.add("active");

    // wait until modal renders
    setTimeout(() => {
        modalVideo.currentTime = 0;
        modalVideo.play().catch(err => {
            // if autoplay blocked, mute and play
            console.log("Autoplay blocked, muting video", err);
            modalVideo.muted = true;
            modalVideo.play();
        });
    }, 50);
});

closeVideo.addEventListener("click", () => {
    modalVideo.pause();
    videoModal.classList.remove("active");
});

videoModal.addEventListener("click", e => {
    if(e.target === videoModal){
        modalVideo.pause();
        videoModal.classList.remove("active");
    }
});






//trusted by and the carousel section
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let scrollAmount = 0;
const scrollStep = 220; // width + gap
let autoScrollInterval = null;

// Move carousel left
prevBtn.addEventListener('click', () => {
    scrollAmount -= scrollStep;
    if(scrollAmount < 0) scrollAmount = 0;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
    resetAutoScroll();
});

// Move carousel right
nextBtn.addEventListener('click', () => {
    scrollAmount += scrollStep;
    const maxScroll = carousel.scrollWidth - carousel.parentElement.offsetWidth;
    if(scrollAmount > maxScroll) scrollAmount = 0; // loop back
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
    resetAutoScroll();
});

// Automatic scrolling
function autoScroll(){
    const maxScroll = carousel.scrollWidth - carousel.parentElement.offsetWidth;
    scrollAmount += scrollStep;
    if(scrollAmount > maxScroll) scrollAmount = 0;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
}

autoScrollInterval = setInterval(autoScroll, 3000);

// Reset auto scroll when manually clicked
function resetAutoScroll(){
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScroll, 3000);
}







//swiper slider 
const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 2000,
    slidesPerView: 1,
    spaceBetween: 40,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
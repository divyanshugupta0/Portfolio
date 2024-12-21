const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1.5, // Show 1.5 slides (fully visible center + partial sides)
    centeredSlides: true, // Center the active slide
    spaceBetween: 20, // Space between slides
    loop: true, // Infinite looping
    autoplay: {
        delay: 3000, // Auto swipe every 3 seconds
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChangeTransitionStart: function () {
            const slides = document.querySelectorAll('.swiper-slide');
            slides.forEach((slide) => {
                slide.classList.remove('dimmed');
            });
            const activeSlide = document.querySelector('.swiper-slide.swiper-slide-active');
            activeSlide.previousElementSibling?.classList.add('dimmed');
            activeSlide.nextElementSibling?.classList.add('dimmed');
        },
    },
});

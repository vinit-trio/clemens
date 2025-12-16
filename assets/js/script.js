// ------------------------------------------------------------------
// Home hero swiper
// ------------------------------------------------------------------
var swiper = new Swiper(".home_hero_swiper", {
    spaceBetween: 0,
    centeredSlides: true,
    effect: "fade",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// ------------------------------------------------------------------
// Home hero swiper
// ------------------------------------------------------------------
var swiper = new Swiper(".testimonial_swiper", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// ------------------------------------------------------------------
// Back to top button
// ------------------------------------------------------------------

function backToTop() {
    return {
        visible: false,

        init() {
            const toggle = () => {
                this.visible = window.scrollY > 300;
            };

            toggle();
            window.addEventListener("scroll", toggle);
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
}

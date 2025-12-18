// ------------------------------------------------------------------
// Home hero swiper
// ------------------------------------------------------------------
var swiper = new Swiper(".home_hero_swiper", {
    spaceBetween: 0,
    centeredSlides: true,
    effect: "fade",
    speed: 1000,
    autoplay: {
        delay: 5000,
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
    speed: 1000,
    autoplay: {
        delay: 5000,
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

// ------------------------------------------------------------------
// Counter
// ------------------------------------------------------------------

document.addEventListener('alpine:init', () => {
    Alpine.data('counters', () => ({
        started: false,
        duration: 5000,
        frameTime: 20,
        start() {
            if (this.started) return;
            this.started = true;
            document.querySelectorAll('.counting').forEach(el => {
                const target = +el.textContent;
                el.textContent = '0';
                let count = 0;
                const steps = this.duration / this.frameTime;
                const increment = target / steps;
                const interval = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        el.textContent = target;
                        clearInterval(interval);
                    } else {
                        el.textContent = Math.round(count);
                    }
                }, this.frameTime);
            });
        }
    }));
});
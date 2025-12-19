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

// ------------------------------------------------------------------
// Auto link activation
// ------------------------------------------------------------------

const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('a[href*="#"]');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href').endsWith(`#${entry.target.id}`)
                    );
                });
            }
        });
    },
    {
        threshold: 0.6
    }
);

sections.forEach(section => observer.observe(section));

// ------------------------------------------------------------------
// Lightbox image gallery
// ------------------------------------------------------------------

document.addEventListener('alpine:init', () => {
    try {
        Alpine.data('lightbox', () => ({
            images: [],
            current: null,
            zoomed: false,

            init() {
                if (!this.$refs.gallery) {
                    console.log('Lightbox: gallery ref not found');
                    return;
                }

                this.images = [...this.$refs.gallery.querySelectorAll('img')]
                    .map(img => img.src)
                    .filter(Boolean);

                if (!this.images.length) {
                    console.log('Lightbox: no images found');
                }
            },

            open(i = 0) {
                if (!this.images.length) return;

                this.current = i;
                this.zoomed = false;
                document.body.classList.add('overflow-hidden');
            },

            close() {
                this.current = null;
                this.zoomed = false;
                document.body.classList.remove('overflow-hidden');
            },

            next() {
                if (this.current === null || !this.images.length) return;

                this.current = (this.current + 1) % this.images.length;
                this.zoomed = false;
            },

            prev() {
                if (this.current === null || !this.images.length) return;

                this.current =
                    (this.current - 1 + this.images.length) % this.images.length;
                this.zoomed = false;
            },

            toggleZoom() {
                if (this.current === null) return;
                this.zoomed = !this.zoomed;
            }
        }));
    } catch (e) {
        console.log('Alpine Lightbox not found in this page', e);
    }
});
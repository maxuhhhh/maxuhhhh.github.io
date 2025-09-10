let title = "🚀 Max's Portfolio ";
let position = 0;
let intervalId;
let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll(".logo");
const clickSound = new Audio("Assets/click.mp3");
// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    easing: (t) => 1 - Math.pow(1 - t, 3)
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Scroll Snap Functionality
const sections = Array.from(document.querySelectorAll(".scrollanchor"));
let isScrolling = false;

function getCurrentSectionIndex() {
    const scroll = window.scrollY + window.innerHeight / 2;
    return sections.findIndex((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return scroll >= top && scroll < bottom;
    });
}

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isScrolling = true;
    lenis.scrollTo(sections[index], {
        offset: 0,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
    });

    setTimeout(() => {
        isScrolling = false;
    }, 1); 
}

window.addEventListener(
    "wheel",
    (e) => {
        if (isScrolling) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        const currentIndex = getCurrentSectionIndex();
        const targetIndex = currentIndex + direction;

        scrollToSection(targetIndex);

        e.preventDefault();
    },
    { passive: false }
);
clickSound.volume = 0.5;

document.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
});

window.addEventListener("scroll", () => {
    const arrow = document.getElementById("arrow");
    const rect = arrow.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8) {
        arrow.classList.add("fade-out");
    } else {
        arrow.classList.remove("fade-out");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add("active");
            }, idx * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove("active");
                    span.classList.add("fade");
                }, idx * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = "-100vh";
        }, 2300);
    }, 0);
});

function animateTitle() {
    document.title = title.substring(position) + title.substring(0, position);
    position = (position + 1) % title.length;
}

function startAnimation() {
    if (!intervalId) {
        intervalId = setInterval(animateTitle, 200);
    }
}

function stopAnimation() {
    clearInterval(intervalId);
    intervalId = null;
}

window.onfocus = startAnimation;
window.onblur = stopAnimation;

startAnimation();

AOS.init({
    duration: 1000
});

document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const toggleSiblingClass = (items, index, offset, className, add) => {
        const sibling = items[index + offset];
        if (sibling) {
            sibling.classList.toggle(className, add);
        }
    };
    // Event listeners to toggle classes on hover
    navItems.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
            item.classList.add("hover"); // Add .hover to current item
            // Toggle classes for siblings
            toggleSiblingClass(navItems, index, -1, "sibling-close", true);
            toggleSiblingClass(navItems, index, 1, "sibling-close", true); 
            toggleSiblingClass(navItems, index, -2, "sibling-far", true);
            toggleSiblingClass(navItems, index, 2, "sibling-far", true);
        });
        item.addEventListener("mouseleave", () => {
            item.classList.remove("hover");

            toggleSiblingClass(navItems, index, -1, "sibling-close", false);
            toggleSiblingClass(navItems, index, 1, "sibling-close", false);
            toggleSiblingClass(navItems, index, -2, "sibling-far", false); 
            toggleSiblingClass(navItems, index, 2, "sibling-far", false); 
        });
    });
});

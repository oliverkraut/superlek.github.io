gsap.registerPlugin(ScrollTrigger);

/* =========================
   HERO TEXT REVEAL
========================= */

gsap.from(".reveal", {

    y: 120,
    opacity: 0,

    duration: 1.2,

    stagger: 0.2,

    ease: "power4.out"

});
gsap.from(".reveal1", {

    y: 120,
    opacity: 0,

    duration: 1.2,

    stagger: 0.2,

    ease: "power4.out"

});

/* =========================
   FLOATING SCROLL INDICATOR
========================= */

gsap.to(".scroll-indicator", {

    y: 8,

    duration: 1.5,

    repeat: -1,
    yoyo: true,

    ease: "sine.inOut"

});

/* =========================
   MOUSE FOLLOW EFFECT
========================= */

const indicator = document.querySelector(".scroll-indicator");

window.addEventListener("mousemove", (e) => {

    let x = (e.clientX / window.innerWidth - 0.5) * 25;
    let y = (e.clientY / window.innerHeight - 0.5) * 25;

    gsap.to(indicator, {

        rotationY: x,
        rotationX: -y,

        transformPerspective: 600,

        duration: 0.5

    });

});

/* =========================
   LOTTIE SCROLL
========================= */

const playhead = { frame: 0 };

const animation = lottie.loadAnimation({

    container: document.querySelector(".animation"),

    renderer: "svg",

    loop: false,

    autoplay: false,

    path: "gundam.mov.lottie.json"

});

animation.addEventListener("DOMLoaded", () => {

    gsap.to(playhead, {

        frame: animation.totalFrames - 1,

        ease: "none",

        onUpdate: () => {

            animation.goToAndStop(playhead.frame, true);

        },

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "+=2000",

            scrub: 1,

            pin: true

        }

    });

});

/* =========================
   HERO PARALLAX
========================= */

gsap.to(".hero-lottie", {

    scale: 1,
    y: -80,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: true

    }

});

gsap.to(".hero-text", {

    y: -120,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: true

    }

});

/* =========================
   SCROLL INDICATOR FADE
========================= */

gsap.to(".scroll-indicator", {

    opacity: 0,
    y: -40,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "30% top",

        scrub: true

    }

});

/* =========================
   PROJECT HOVER SYSTEM
========================= */

const previewImages = document.querySelectorAll(".preview-img");

const thumbItems = document.querySelectorAll(".thumb-item");

const projectItems = document.querySelectorAll(".project-item");

/* ACTIVATE PROJECT */

function activateProject(index) {

    // REMOVE ACTIVE

    previewImages.forEach((img) => {

        img.classList.remove("active");

    });

    thumbItems.forEach((thumb) => {

        thumb.classList.remove("active");

    });

    projectItems.forEach((item) => {

        item.classList.remove("active");

    });

    // ADD ACTIVE

    previewImages[index].classList.add("active");

    thumbItems[index].classList.add("active");

    projectItems[index].classList.add("active");

    // IMAGE REVEAL

    gsap.fromTo(
        previewImages[index],

        {
            clipPath: "inset(0% 100% 0% 0%)"
        },

        {
            clipPath: "inset(0% 0% 0% 0%)",

            duration: 1,

            ease: "power4.out"
        }
    );

    // TEXT REVEAL

    gsap.fromTo(
        projectItems[index].querySelectorAll("h1, p"),

        {
            y: 40,
            opacity: 0
        },

        {
            y: 0,
            opacity: 1,

            duration: 0.8,

            stagger: 0.05,

            ease: "power3.out"
        }
    );

}

/* =========================
   THUMB HOVER
========================= */

thumbItems.forEach((thumb, index) => {

    // SHOW IMAGE + TEXT

    thumb.addEventListener("mouseenter", () => {

        activateProject(index);

    });

    // HIDE EVERYTHING

    thumb.addEventListener("mouseleave", () => {

        previewImages.forEach((img) => {

            img.classList.remove("active");

        });

        thumbItems.forEach((thumb) => {

            thumb.classList.remove("active");

        });

        projectItems.forEach((item) => {

            item.classList.remove("active");

        });

    });

});


gsap.registerPlugin(ScrollTrigger);



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



gsap.to(".scroll-indicator", {

    y: 8,

    duration: 1.5,

    repeat: -1,
    yoyo: true,

    ease: "sine.inOut"

});


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



const previewImages = document.querySelectorAll(".preview-img");

const thumbItems = document.querySelectorAll(".thumb-item");

const projectItems = document.querySelectorAll(".project-item");



function activateProject(index) {

    

    previewImages.forEach((img) => {

        img.classList.remove("active");

    });

    thumbItems.forEach((thumb) => {

        thumb.classList.remove("active");

    });

    projectItems.forEach((item) => {

        item.classList.remove("active");

    });



    previewImages[index].classList.add("active");

    thumbItems[index].classList.add("active");

    projectItems[index].classList.add("active");



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



thumbItems.forEach((thumb, index) => {



    thumb.addEventListener("mouseenter", () => {

        activateProject(index);

    });

  

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
console.clear();


const circleElement = document.querySelector('.circle');


const mouse = { x: 0, y: 0 }; 
const previousMouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 }; 


let currentScale = 0; 
let currentAngle = 0; 


window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});


const speed = 0.17;


const tick = () => {
  
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;

  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

 
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
 
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
 
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
 
  const scaleValue = (mouseVelocity / 150) * 0.5;
 
  currentScale += (scaleValue - currentScale) * speed;
  
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

 
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
 
  const rotateTransform = `rotate(${currentAngle}deg)`;

 
  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;


  window.requestAnimationFrame(tick);
};


tick();
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.elements.name.value = '';
    e.target.elements.email.value = '';
    e.target.elements.message.value = '';
    
});

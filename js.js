const loadingScreen = document.getElementById('loading');
const continueBtn = document.getElementById('continue');
const muteBtn = document.getElementById('mute');
const audio = document.getElementById('bg-music');
const muteText = document.querySelector('#mute p');
const muteIcon = document.querySelector('#mute img');
const audioPrompt = document.getElementById('audio-prompt');
const resumeBtn = document.getElementById('resume-btn');
const wrapper = document.getElementById('stack-wrapper');
const floatingMute = document.getElementById('floating-mute');
const floatingMuteIcon = document.getElementById('floating-mute-icon');
const clickSound = document.getElementById('click-sound');

// ── LOADING SCREEN ──
if (audio && loadingScreen) {
    if (sessionStorage.getItem('audioConfirmed')) {
        loadingScreen.style.display = 'none'; // hides screen if the user has alread seen it
        document
            .body
            .classList
            .remove('no-scroll'); // removes the scroll lock after a user clicks continue
        audio.muted = sessionStorage.getItem('audioMuted') === 'true';
        if (muteText) 
            muteText.textContent = audio.muted
                ? 'Unmute Sound'
                : 'Mute Sound';
        if (muteIcon) 
            muteIcon.src = audio.muted
                ? 'Assets/Images/muteMusic.png'
                : 'Assets/Images/MusicNote.png'; // changing the mute button icon to mute or not muted
        if (floatingMuteIcon) 
            floatingMuteIcon.src = audio.muted
                ? 'Assets/Images/muteMusic.png'
                : 'Assets/Images/MusicNote.png';
        audio
            .play()
            .catch(() => {
                if (audioPrompt) 
                    audioPrompt.style.display = 'flex';
                }
            );
    } else {
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                sessionStorage.setItem('audioConfirmed', 'true');
                audio.play();
                loadingScreen
                    .classList
                    .add('hidden');
                loadingScreen.addEventListener('transitionend', () => {
                    loadingScreen.style.display = 'none';
                    document
                        .body
                        .classList
                        .remove('no-scroll');
                });
            });
        }
    }
}

// ── MUTE BUTTON (loading screen) ──
if (muteBtn && audio) {
    muteBtn.addEventListener('click', () => { // waits for the user imput
        audio.muted = !audio.muted;
        sessionStorage.setItem('audioMuted', audio.muted); // saves the users choice, e.g. muted or not
        if (muteText) 
            muteText.textContent = audio.muted
                ? 'Unmute Sound'
                : 'Mute Sound';
        if (muteIcon) 
            muteIcon.src = audio.muted
                ? 'Assets/Images/muteMusic.png'
                : 'Assets/Images/MusicNote.png';
        if (floatingMuteIcon) 
            floatingMuteIcon.src = audio.muted
                ? 'Assets/Images/muteMusic.png'
                : 'Assets/Images/MusicNote.png'; // updates the icon on the button
        }
    );
}

// ── FLOATING MUTE BUTTON ──
if (floatingMute && audio) {
    floatingMute.addEventListener('click', () => { // waits for the user imput
        audio.muted = !audio.muted;
        sessionStorage.setItem('audioMuted', audio.muted); // saves the users choice, e.g. muted or not
        const isMuted = audio.muted;
        if (floatingMuteIcon) 
            floatingMuteIcon.src = isMuted
                ? 'Assets/Images/muteMusic.png'
                : 'Assets/Images/MusicNote.png';
        if (muteIcon) 
            muteIcon.src = isMuted
                ? 'Assets/Images/muteMusic.png'
                : 'Assets/Images/MusicNote.png'; // updates the icon
        if (muteText) 
            muteText.textContent = isMuted
                ? 'Unmute Sound'
                : 'Mute Sound';
        }
    );
}

// ── FIREFOX RESUME ──
if (resumeBtn && audioPrompt && audio) { // firefox has strickt autoplay rules, so I need to ask the user to start playing on sub sites
    resumeBtn.addEventListener('click', () => {
        audio.play();
        audioPrompt.style.display = 'none';
    });
}

// ── IMAGE CARD STACK ──
if (wrapper) {
    gsap.registerPlugin(ScrollTrigger); // this triggers when a user scrolls the stack into view

    const imgs = [...document.querySelectorAll('.stack-img')];
    const baseRotations = [0, -4, 5];
    const directions = [110, -110, 110]; // right, left, right

    gsap.to(imgs, {
        x: (i) => `${directions[i]}%`,
        rotation: (i) => baseRotations[i] + 8,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        stagger: 0.5, // each card leaves 0.5s after the last
        scrollTrigger: {
            trigger: wrapper,
            start: 'top 60%', // starts when stack is 60% down the viewport
            toggleActions: 'play none none none' // plays once only
        }
    });
}

// ── ACCORDION (teken from the MTK tutorial) ──
const acc = document.getElementsByClassName('accordion');
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
        this
            .classList
            .toggle('active');
        const panel = this.nextElementSibling;
        panel.style.display = panel.style.display === 'block'
            ? 'none'
            : 'block'; // this hides or shows the text under the accordion
    });
}

// ── FORM ──
function myFunction() {
    var firstname = document
        .getElementById("firstname")
        .value;
    var lastname = document
        .getElementById("lastname")
        .value;
    var email = document
        .getElementById("email")
        .value;
    var message = "Thanks for subscribing to our newsletter " + firstname + " " +
            lastname + ". We have sent an email to " + email + " to confirm your subscripti" +
            "on."; // creates a browser pop up
    var agree = document
        .getElementById("agree")
        .checked;
    if (firstname == "" || lastname == "" || email == "" || agree == false) {
        alert(
            'Please make sure you have entered your full name, email address and you agree ' +
            'to our terms of service.'
        ); // checks if a user has entered all the info
    } else {
        alert(message);
    }
}

// ── SLIDES (on the artists page) ──
var slideIndex = 0;

function plusSlides(n) {
    slideIndex = slideIndex + n;
    showSlides();
}

function showSlides() {
    var slides = document.getElementsByClassName("mySlides");
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

window.onload = function () {
    const slides = document.getElementsByClassName('mySlides');
    if (slides.length > 0) {
        showSlides();
    }
};

// ── GSAP (JS library for animations) ──
document.addEventListener("DOMContentLoaded", () => {
    gsap.from(
        '.headingFirstRow, .headingSecondRow, .headingThirdRow, .headingFourthRow',
        { // gets the headline text from the hero
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power2.out' // built in animation
        }
    );

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.introText', {
        opacity: 0,
        y: 90,
        duration: 1,
        scrollTrigger: '.introText'
    });
});

// ── CLICK SOUND (for enter button on loading screen) ──
document
    .querySelectorAll('.sound-btn')
    .forEach(btn => {
        btn.addEventListener('click', () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play(); // plays a click sound when the button is clicked
            }
        });
    });

// ── SCROLL ARROW ──
gsap.to(".scrollArrow", {
    y: -15, // moves the arrow down -15
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true // animation
});
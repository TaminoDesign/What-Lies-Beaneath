const loadingScreen = document.getElementById('loading');
const continueBtn   = document.getElementById('continue');
const muteBtn       = document.getElementById('mute');
const audio         = document.getElementById('bg-music');
const muteText      = document.querySelector('#mute p');
const muteIcon      = document.querySelector('#mute img');
const audioPrompt   = document.getElementById('audio-prompt');
const resumeBtn     = document.getElementById('resume-btn');
const wrapper       = document.getElementById('stack-wrapper');

// ── LOADING SCREEN — only runs if these elements exist on this page ──
if (audio && loadingScreen) {
  if (sessionStorage.getItem('audioConfirmed')) {
    loadingScreen.style.display = 'none';
    document.body.classList.remove('no-scroll');
    audio.muted = sessionStorage.getItem('audioMuted') === 'true';
    if (muteText) muteText.textContent = audio.muted ? 'Unmute Sound' : 'Mute Sound';
    if (muteIcon) muteIcon.src = audio.muted ? 'Assets/Images/muteMusic.png' : 'Assets/Images/MusicNote.png';
    audio.play().catch(() => {
      if (audioPrompt) audioPrompt.style.display = 'flex';
    });
  } else {
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        sessionStorage.setItem('audioConfirmed', 'true');
        audio.play();
        loadingScreen.classList.add('hidden');
        loadingScreen.addEventListener('transitionend', () => {
          loadingScreen.style.display = 'none';
          document.body.classList.remove('no-scroll');
        });
      });
    }
  }
}

// ── MUTE BUTTON ──
if (muteBtn && audio) {
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    sessionStorage.setItem('audioMuted', audio.muted);
    if (muteText) muteText.textContent = audio.muted ? 'Unmute Sound' : 'Mute Sound';
    if (muteIcon) muteIcon.src = audio.muted ? 'Assets/Images/muteMusic.png' : 'Assets/Images/MusicNote.png';
  });
}

// ── FIREFOX RESUME PROMPT ──
if (resumeBtn && audioPrompt && audio) {
  resumeBtn.addEventListener('click', () => {
    audio.play();
    audioPrompt.style.display = 'none';
  });
}

// ── IMAGE CARD STACK — only runs if the wrapper exists on this page ──
if (wrapper) {
  const imgs  = [...document.querySelectorAll('.stack-img')];
  const total = imgs.length;
  const baseRotations = [0, -4, 5];

  window.addEventListener('scroll', () => {
    const wrapTop    = wrapper.getBoundingClientRect().top + window.scrollY;
    const scrollZone = wrapper.offsetHeight - window.innerHeight;
    const scrolled   = Math.max(0, Math.min(window.scrollY - wrapTop, scrollZone));
    const progress   = scrolled / scrollZone;

    imgs.forEach((img, i) => {
      const start = i / total;
      const p     = Math.max(0, Math.min((progress - start) * total, 1));
      const rot   = baseRotations[i] + p * 8;
      if (i === 0) img.style.transform = `rotate(${rot}deg) translateX(${p * 110}%)`;
      if (i === 1) img.style.transform = `rotate(${-rot}deg) translateX(${-p * 110}%)`;
      if (i === 2) img.style.transform = `rotate(${rot}deg) translateX(${p * 110}%)`;
    });
  });
}

// ── ACCORDION ──
const acc = document.getElementsByClassName('accordion');
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });
}

// FORM
function myFunction() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var message = "Thanks for subscribing to our newsletter " + firstname + " " + lastname + ". We have sent an email to " + email + " to confirm your subscription.";
    var agree = document.getElementById("agree").checked;
    if (firstname == "" || lastname == "" || email == "" || agree == false) {
        alert('Please make sure you have entered your full anme, email address and you agree to our terms of service.');
    } else {
        alert(message);
    }
}

//Slides


var slideIndex = 0;


// Next/previous controls
function plusSlides(n) {
    slideIndex = slideIndex + n;
    showSlides();
}

// Thumbnail image controls - when user clicks on one of the thumbnails, the currentSlide function runs because of the onclick event. The n corresponds the value on each thumbnail that is passed on the onclick event. onclick is a standard HTML event.
function currentSlide(thumbnailID) {
    //set slideIndex to the number of the thumbnail
    slideIndex = thumbnailID;
    //call the showSlides function
    showSlides();
}
// the number then gets passed to the showSlides function.
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var thumbnails = document.getElementsByClassName("myThumbnail");
    //find the caption element that will store the description of the image
    var captionText = document.getElementById("caption");

    //if slide is greater than the number of slides, then go to the beginning
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    //if slide is less than the first one, go to the last slide.
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    //step through all the slides and turn them off - reset them all
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // active class is from CSS. Remove the active class from all thumbnails (note that the class active needs to start with a space)
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");
    }
    //for the current thumbnail which is slideIndex minus 1 (because it's an array), set the display to block for the one we want to display.
    slides[slideIndex - 1].style.display = "block";
    //for the thumbnail that is associated with the current displayed image, we are going to make it active. The active CSS changes opacity to 1.
    thumbnails[slideIndex - 1].className += " active";
    //check the caption element, if found display the alt tag text.
    captionText.innerHTML = thumbnails[slideIndex - 1].alt;
}
//Display is set to none in the CSS. This overides that.
window.onload = showSlides;

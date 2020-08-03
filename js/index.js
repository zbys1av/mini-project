const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const chosenDay = document.querySelector("#chosenDay");
const chosenMonth = document.querySelector("#chosenMonth");
const chosenYear = document.querySelector("#chosenYear");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");
const textarea = document.getElementById("#text");
const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const readBtn = document.getElementById("read");
const toggle = document.getElementById("toggle");
const home = document.getElementById("home");
const navbar = document.getElementById("navbar");
const fullTime = "";

//SIDE BAR
function closeNavbar(e) {
  if (
    document.body.classList.contains("show-nav") &&
    e.target !== toggle &&
    !toggle.contains(e.target) &&
    e.target !== navbar &&
    !navbar.contains(e.target)
  ) {
    document.body.classList.toggle("show-nav");
    document.body.removeEventListener("click", closeNavbar);
  } else if (!document.body.classList.contains("show-nav")) {
    document.body.removeEventListener("click", closeNavbar);
  }
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});

home.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});

//TIMER
const currentYear = new Date().getFullYear();
let selectedDate = new Date(
  `${chosenMonth.value} ${chosenDay.value} ${chosenYear.value} 00:00:00`
);

//update time
function updateCountdown() {
  const currentTime = new Date();
  let diff = selectedDate - currentTime;
  if (diff < 0) {
    selectedDate = new Date(`August 1 ${currentYear + 1} 00:00:00`);
    diff = selectedDate - currentTime;
  }

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // add values to dom
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;
}

// show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

// run every second
setInterval(updateCountdown, 1000);

//SPEECH
// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

text.value += timeForText();

function timeForText() {
  const currentTime = new Date();
  let diff = selectedDate - currentTime;
  if (diff < 0) {
    selectedDate = new Date(`August 1 ${currentYear + 1} 00:00:00`);
    diff = selectedDate - currentTime;
  }

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // add values to dom
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? "0" + h : h;
  minutes.innerHTML = m < 10 ? "0" + m : m;
  seconds.innerHTML = s < 10 ? "0" + s : s;

  return " " + d + " days " + h + " hours " + m + " minutes " + s + " seconds ";
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(text.value);
  speakText();
});

getVoices();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");
const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const readBtn = document.getElementById("btn");
const text = hours.value + "hours";

//TIMER
const currentYear = new Date().getFullYear();
let selectedDate = new Date(`Sep 1 ${currentYear} 00:00:00`);

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

// show spinner before countdown                                // ?????
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

// run every second
setInterval(updateCountdown, 1000);

// //SPEAKER
// function createBox(item) {
//   const box = document.createAttribute("div");

//   box.addEventListener("click", () => {
//     setTextMessage(text);
//     speakText();
//   });
// }

// const message = new SpeechSynthesisUtterance();

// let voices = [];

// function getVoices() {
//   voice = speechSynthesis.getVoices();
// }

// voices.forEach((voice) => {
//   const option = document.createElement("option");

//   option.value = voice.name;
//   option.innerText = `${voice.name} ${voice.lang}`;

//   voicesSelect.appendChild(option);
// });

// function setTextMessage(text) {
//   message.text = text;
// }

// function speakText() {
//   speechSynthesis.speak(message);
// }

// function setVoice() {
//   message.voice = voices.find((voice) => voice.name === e.target.value);
// }

// speechSynthesis.addEventListener("voiceschanged", getVoices);

// voicesSelect.addEventListener("change", setVoice);

// readBtn.addEventListener("click", () => {
//   setTextMessage("suck");
//   speakText();
// });

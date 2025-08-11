const flashcards = [
  { phrase: "Hola", answer: "Hello" },
  { phrase: "Adiós", answer: "Goodbye" },
  { phrase: "Gracias", answer: "Thank you" },
  { phrase: "Por favor", answer: "Please" }
];

let current = 0;

const card = document.getElementById("card");
const front = document.getElementById("cardFront");
const back = document.getElementById("cardBack");
const listenBtn = document.getElementById("listenBtn");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message");

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function loadCard() {
  const { phrase, answer } = flashcards[current];
  front.textContent = phrase;
  back.textContent = answer;
  card.classList.remove("flipped");
  message.textContent = "";
  nextBtn.disabled = true;
}

loadCard();

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "es-ES";
  recognition.interimResults = false;
} else {
  listenBtn.disabled = true;
  message.textContent = "Speech recognition not supported in this browser.";
}

listenBtn.addEventListener("click", () => {
  if (!recognition) return;
  message.textContent = "Listening...";
  listenBtn.disabled = true;
  recognition.start();
});

if (recognition) {
  recognition.addEventListener("start", () => {
    if (nextBtn.disabled) {
      message.textContent = "Listening...";
    }
  });
  recognition.addEventListener("result", e => {
    const transcript = normalize(e.results[0][0].transcript.trim());
    const expected = normalize(flashcards[current].phrase);

    if (transcript === expected) {
      card.classList.add("flipped");
      message.textContent = "Correct!";
      nextBtn.disabled = false;
      recognition.stop();
    } else {
      message.textContent = `Heard "${transcript}". Try again.`;
    }
  });

  recognition.addEventListener("end", () => {
    if (nextBtn.disabled) {
      recognition.start();
    }
  });
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % flashcards.length;
  loadCard();
  recognition.start();
});

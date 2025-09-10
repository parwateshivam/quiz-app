// QUIZ DATA (Questions)
const quizData = [
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Undefined", "Boolean", "Float", "Number"],
    answer: "Float"
  },
  {
    question: "In CSS Grid, what does 'fr' unit represent?",
    options: [
      "Fraction of available space",
      "Fixed ratio",
      "Font-relative size",
      "Fraction of parent height"
    ],
    answer: "Fraction of available space"
  },
  {
    question: "Which HTTP status code means 'Unauthorized'?",
    options: ["200", "301", "401", "403"],
    answer: "401"
  },
  {
    question: "Which method in JavaScript is used to parse a JSON string?",
    options: ["JSON.stringify()", "JSON.parse()", "parse.JSON()", "toJSON()"],
    answer: "JSON.parse()"
  },
  {
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "No difference",
      "== compares value only, === compares value and type",
      "=== compares value only, == compares type and value",
      "== is strict, === is loose"
    ],
    answer: "== compares value only, === compares value and type"
  },
  {
    question: "Which of the following is NOT a valid CSS position value?",
    options: ["static", "relative", "absolute", "fixed", "float"],
    answer: "float"
  },
  {
    question: "Which JavaScript feature allows writing async code in sync style?",
    options: ["Promises", "Callbacks", "Async/Await", "Events"],
    answer: "Async/Await"
  },
  {
    question: "What does CORS stand for?",
    options: [
      "Cross-Origin Resource Sharing",
      "Cross-Origin Restricted Script",
      "Controlled Origin Resource Service",
      "Cross-Organization Resource Sharing"
    ],
    answer: "Cross-Origin Resource Sharing"
  },
  {
    question: "Which SQL command is used to remove a table completely?",
    options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
    answer: "DROP"
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript (default)?",
    options: [
      "The global object",
      "The current function",
      "The parent object",
      "Undefined always"
    ],
    answer: "The global object"
  }
];

// HTML ELEMENTS
const correctBox = document.getElementById("correct");
const wrongBox = document.getElementById("wrong");
const timerBox = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const questionBox = document.getElementById("questionBox");
const optionsBox = document.getElementById("optionsBox");
const totalBox = document.getElementById("total");
const qNumberBox = document.getElementById("qNumber");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

// VARIABLES (Game State)
let currentQuestion = 0;   // which question we are on
let timer;                 // timer interval
let timeLeft = 15;         // time per question
let correct = 0;
let wrong = 0;

// show one question on the screen
function showQuestion() {
  // reset things for new question
  clearInterval(timer);
  timeLeft = 15;
  timerBox.innerText = timeLeft;
  //get question from data
  const question = quizData[currentQuestion].question;
  qNumberBox.innerText = currentQuestion + 1;
  totalBox.innerText = quizData.length;
  questionBox.innerText = question;
  // updating progress bar before updating next question
  const progressBarPercent = Math.floor((currentQuestion / quizData.length) * 100);
  progressBar.style.width = progressBarPercent + "%";
  // adding options for the questions
  addOptions();
  // disabled next btn till the user not select the answer
  nextBtn.disabled = true;
  // start timer
  startTimer();
}

//add options one by one
function addOptions() {
  const answer = quizData[currentQuestion].answer;
  optionsBox.innerHTML = "";
  quizData[currentQuestion].options.forEach((opt) => {
    let btn = document.createElement("button");
    btn.className = "list-group-item list-group-item-action option-btn";
    btn.innerText = opt;
    optionsBox.appendChild(btn);
    btn.addEventListener("click", () => {
      checkAnswer(btn, opt, answer);
    });
  });
}

// check if selected answer is correct or wrong
function checkAnswer(selectedBtn, selectedBtnAnswer, correctAnswer) {
  stopTimer();
  let optionButtons = optionsBox.querySelectorAll("button");
  if (selectedBtnAnswer === correctAnswer) {
    selectedBtn.classList.add("list-group-item-success");
    correct++;
    correctBox.innerText = correct;
  } else {
    selectedBtn.classList.add("list-group-item-danger");
    wrong++;
    wrongBox.innerText = wrong;
    optionButtons.forEach(b => {
      if (b.innerText === correctAnswer) {
        b.classList.add("list-group-item-success");
      }
    });
  }
  // disable all options
  optionButtons.forEach(b => b.disabled = true);
  // enable Next button
  nextBtn.disabled = false;
}

// Start the countdown timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerBox.innerText = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
      // time ran out → show correct answer
      const correctAnswer = quizData[currentQuestion].answer;
      const optionButtons = optionsBox.querySelectorAll("button");
      optionButtons.forEach(b => {
        if (b.innerText === correctAnswer) {
          b.classList.add("list-group-item-success");
        }
        b.disabled = true;
      });
      nextBtn.disabled = false;
    }
  }, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timer);
}

// move to next question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    endGame();
  }
});

// End of quiz
function endGame() {
  stopTimer();
  questionBox.innerText = `🎉 Game Over! You scored ${correct} / ${quizData.length}`;
  optionsBox.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.classList.remove("d-none");
  progressBar.style.width = "100%";
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  correctBox.innerText = 0;
  wrongBox.innerText = 0;
  nextBtn.style.display = "inline-block";
  restartBtn.classList.add("d-none");
  showQuestion();
});

// Start Quiz
showQuestion();
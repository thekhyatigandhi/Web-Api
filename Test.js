// Select HTML elements
var timerEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-button");
var questionsEl = document.querySelector(".questions");
var answersEl = document.querySelector(".answers");
var commentsEl = document.querySelector("#comments");
var formEl = document.querySelector(".form");
var inputEl = document.querySelector("input");
var highScoresEl = document.querySelector("#highScores");
var scoreListEl = document.querySelector(".score-list");

// Quiz state
var timeLeft = 60;
var score = 0;
var currentQuestionIndex = 0;

// Quiz questions
var quizQuestions = [
  {
    question:
      "Which of the following is not a primitive data type in JavaScript?",
    answers: ["Numbers", "Objects", "Strings", "Boolean"],
    correctIndex: 1,
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    answers: [
      "There is no difference between == and ===",
      "== compares values, while === compares values and types",
      "=== compares values, while == compares values and types",
      "== and === are not valid comparison operators in JavaScript",
    ],
    correctIndex: 1,
  },
  {
    question: "Which of the following is not a loop in JavaScript?",
    answers: ["for", "foreach", "do while", "while"],
    correctIndex: 1,
  },
  {
    question: "What is the purpose of the keyword THIS in JavaScript?",
    answers: [
      "It refers to an object that is executing the current piece of code.",
      "It refers to the global object.",
      "It refers to the function itself.",
      "It refers to the parent object.",
    ],
    correctIndex: 0,
  },
];

// Add event listeners
startBtn.addEventListener("click", startQuiz);
highScoresEl.addEventListener("click", viewHighScores);

// Quiz functions
function startQuiz() {
  // Hide start button and show questions
  startBtn.classList.add("hide");
  questionsEl.classList.remove("hide");
  // Start timer and show first question
  timer();
  showQuestion();
}

function showQuestion() {
  // Get current question
  var currentQuestion = quizQuestions[currentQuestionIndex];
  // Set question text
  questionsEl.textContent = currentQuestion.question;
  // Clear previous answers
  answersEl.innerHTML = "";
  // Add new answers
  currentQuestion.answers.forEach(function (answer, index) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = answer;
    buttonEl.addEventListener("click", function () {
      // Check answer and show feedback
      if (index === currentQuestion.correctIndex) {
        commentsEl.textContent = "Correct!";
        score++;
      } else {
        commentsEl.textContent = "Wrong!";
        timeLeft -= 10;
      }
      // Move to next question or end quiz
      currentQuestionIndex++;
      if (currentQuestionIndex === quizQuestions.length || timeLeft <= 0) {
        endQuiz();
      } else {
        showQuestion();
      }
    });
    answersEl.appendChild(buttonEl);
  });
}

function endQuiz() {
  // Stop timer
  clearInterval(timerInterval);
  // Hide questions and show form to enter initials
  questionsEl.classList.add("hide");
  formEl.classList.remove("hide");
  // Set final score
  var finalScoreEl = document.querySelector("#finalScore");
  finalScoreEl.textContent = score;
}

function viewHighScores() {
  // Hide quiz elements and show high scores
  startBtn.classList.add("hide");
  questionsEl.classList.add("hide");
  formEl.classList.add("hide");
  highScoresEl.classList.add("hide");
  scoreListEl.classList.remove("hide");
  // Populate score list with stored scores
  var storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
  storedScores.forEach(function (score) {
    var scoreEl = document.createElement("li");
    scoreEl.textContent = score.initials + " - " + score.score;
    scoreListEl.appendChild(scoreEl);
  });
}

function timer() {
  // Set timer interval
  timerInterval = setInterval(function () {
    // Update time left
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    // End quiz if time runs out
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function saveScore(event) {
  event.preventDefault();
  // Get user initials
  var initials = inputEl.value.trim();
  // Return if no initials entered
  if (initials === "") {
    return;
  }
  // Store score in local storage
  var storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
  storedScores.push({ initials: initials, score: score });
  localStorage.setItem("highScores", JSON.stringify(storedScores));
  // Show high scores
  viewHighScores();
}

// Add event listener to form submit button
formEl.addEventListener("submit", saveScore);

var timerEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-button");
var headingEl = document.querySelector(".heading");
var questionsEl = document.querySelector(".questions");
var answersEl = document.querySelector(".answers");
var paragraphEl = document.querySelector(".paragraph");
var comments = document.querySelector("#comments");
var infoContainerEl = document.querySelector(".info-container");
var form = document.querySelector(".form");
var inputEl = document.querySelector("input");
var linkEl = document.querySelector("a");
var btnContainerEl = document.querySelector(".buttons-container");
var highScores = document.querySelector("#highScores");
var restartbtn = document.querySelector("#restart-btn");
var highScoresEl = document.getElementById("highScores-link");
var highScoresListEl = document.getElementById("highScores-list");
var initialsInputEl = document.getElementById("initials-input");
var submitFormEl = document.getElementById("submit-form");
var submitBtnEl = document.getElementById("submit-btn");

var timeLeft = 60;
var score = 0;
var currentQuestionIndex = 0;
var timeInterval;

// creating variable questions with options and answers
var questions = [
  {
    question:
      "Which of the following is not a primitive data type in JavaScript?",
    answer: "Object",
    options: ["Number", "String", "Boolean", "Object"],
  },

  {
    question: "What is the difference between == and === in JavaScript?",
    answer: " == compares values, while === compares values and types",
    options: [
      "There is no difference between == and ===",
      "== compares values, while === compares values and types",
      "=== compares values, while == compares values and types",
      "== and === are not valid comparison operators in JavaScript",
    ],
  },
  {
    question: "Which of the following is not a loop in JavaScript?",
    answer: "foreach",
    options: ["for", "while", "foreach", "do-while"],
  },
  {
    question: "What is the purpose of the keyword THIS in JavaScript?",
    answer: "It refers to the current object.",
    options: [
      "It refers to the current object.",
      "It refers to the global object.",
      "It refers to the function itself.",
      "It refers to the parent object.",
    ],
  },
];

//added event listener to the start button
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  timerEl.textContent = "Time: " + timeLeft + " seconds";
  document.querySelector(".start-screen").classList.add("hidden");
  timer();
  displayQuestions();
}

// eventlistener for highscore
highScoresEl.addEventListener("click", highScores);

// to store highscores
var maxHighScores = 5;

function addAnswer(answerText) {
  var buttonEl = document.createElement("button");
  buttonEl.textContent = answerText;
  buttonEl.setAttribute("value", answerText);
  buttonEl.addEventListener("click", checkAnswer);

  answersEl.appendChild(buttonEl);
}

// creating a function to display the questions
function displayQuestions() {
  var currentQ = questions[currentQuestionIndex];
  questionsEl.textContent = currentQ.question;
  answersEl.innerHTML = "";
  for (let i = 0; i < currentQ.options.length; i++) {
    addAnswer(currentQ.options[i]);
  }
}

// function to check if the answeres are right or wrong and if the answer is wrong, time will be deducted by 10 seconds
function checkAnswer() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    comments.innerHTML = "Wrong Answer";
    timeLeft -= 10;
    timerEl.textContent = "Time: " + timeLeft + " seconds";
  } else comments.innerHTML = "Correct Answer";
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || timeLeft <= 0) {
    gameOver();
  } else {
    displayQuestions();
  }
}

// when the game is over, the highscore list will show up
function gameOver() {
  clearInterval(timeInterval);
  document.querySelector(".container").classList.add("hidden"); //cant overwrite any display property
  document.querySelector(".info-container").classList.remove("hidden");
  document.querySelector("#highScores-list").classList.remove("hidden");
  showHighScores();
}

// json.parse to retrive the saved highscores
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var saveHighScore = (initials, score) => {
  const newHighScore = {
    initials: initials,
    score: score,
  };

  highScores.push(newHighScore);
  highScores.sort((a, b) => b.score - a.score);

  highScores = highScores.slice(0, maxHighScores);
  localStorage.setItem("highScores", JSON.stringify(highScores));
};

var showHighScores = () => {
  // Clearing existing list items
  highScoresListEl.innerHTML = "";

  // Generating new list items
  highScores.forEach((highScore) => {
    var liEl = document.createElement("li");
    liEl.textContent = `${highScore.initials}: ${highScore.score}`;
    highScoresListEl.appendChild(liEl);
  });
};

// Add event listeners
highScoresEl.addEventListener("click", (event) => {
  event.preventDefault();
  showHighScores();
});

// submitting the form
submitFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  // Retrieve score from quiz and initials from input
  var score = timeLeft;
  var initials = initialsInputEl.value.trim();

  // Validate initials
  if (initials === "") {
    alert("Please enter your initials");
    return;
  }

  // Save high score and update high scores list
  saveHighScore(initials, score);
  showHighScores();

  // Reset input field
  initialsInputEl.value = "";
});

function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft + " seconds";
  }, 1000);
}
// the restart button takes you back to the main page
restartbtn.addEventListener("click", function () {
  document.location.reload();
});

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

restartbtn.addEventListener("click", function () {
  document.location.reload();
});

var timeLeft = 60;
var score = 0;
var currentQuestionIndex = 0;
var timeInterval;

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
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(answersEl);

function addAnswer(answerText) {
  var buttonEl = document.createElement("button");
  buttonEl.textContent = answerText;
  buttonEl.setAttribute("value", answerText);
  buttonEl.addEventListener("click", checkAnswer);

  answersEl.appendChild(buttonEl);
}

function displayQuestions() {
  var currentQ = questions[currentQuestionIndex];
  questionsEl.textContent = currentQ.question;
  answersEl.innerHTML = "";
  for (let i = 0; i < currentQ.options.length; i++) {
    addAnswer(currentQ.options[i]);
  }
}

function checkAnswer() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    // comments.innerHTML = "Wrong Answer";
    timeLeft -= 10;
    timerEl.textContent = "Time: " + timeLeft + " seconds";
  }
  // comments.innerHTML = "Correct Answer";
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length || timeLeft <= 0) {
    gameOver();
  } else {
    displayQuestions();
  }
}

function gameOver() {
  clearInterval(timeInterval);
  document.querySelector(".container").classList.add("hidden"); //cant overwrite any display property
  document.querySelector(".info-container").classList.remove("hidden");

  //display finalscore
  var finalScore = score + timeLeft;
  paragraphEl.textContent = "Your final score is " + finalScore;

  //save highscore
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var initials = inputEl.value.trim();
    if (initials === "") {
      alert("Please enter your initials to save your highscore.");
    } else {
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      var newScore = {
        initials: initials,
        score: finalScore,
      };
      highScores.push(newScore);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      inputEl.value = "";
      viewHighscores();
    }
  });
}
function storeHighscore() {
  //store initials and then view highscore
}

function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft + " seconds";
  }, 1000);
}

restartbtn.addEventListener("click", function () {
  document.location.reload();
});

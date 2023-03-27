var timerEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-button");
var questionsEl = document.querySelector(".questions");
var answersEl = document.querySelector(".answers");
var paragraphEl = document.querySelector(".paragraph");
var comments = document.querySelector("#comments");
var infoContainerEl = document.querySelector(".info-container");
var form = document.querySelector(".form");
var inputEl = document.querySelector("input");
var linkEl = document.querySelector("a");
var btnContainerEl = document.querySelector(".buttons-container");

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

startBtn.addEventListener("click", startQuiz);
linkEl.addEventListener("click", viewHighScores);

function startQuiz() {
  var timeLeft = 60;
  var questionIndex = 0;
  var score = 0;

  timer();
  displayQuestion();

  function displayQuestion() {
    var currentQuestion = questions[questionIndex];
    questionsEl.innerHTML = currentQuestion.question;
    answersEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice) {
      createButton(choice, checkAnswer);
    });
  }

  function checkAnswer() {
    var selectedAnswer = this.textContent;
    var currentQuestion = questions[questionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      comments.innerHTML = "Correct!";
      score++;
    } else {
      comments.innerHTML = "Wrong!";
      timeLeft -= 10;
    }
    questionIndex++;
    if (questionIndex === questions.length || timeLeft <= 0) {
      gameOver();
    } else {
      displayQuestion();
    }
  }

  function gameOver() {
    clearInterval(timeInterval);
    timerEl.textContent = "Game over!";
    questionsEl.innerHTML = "";
    answersEl.innerHTML = "";
    comments.innerHTML = "";
    infoContainerEl.style.display = "block";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var initials = inputEl.value.toUpperCase();
      var newScore = { initials: initials, score: score };
      highScores.push(newScore);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      viewHighScores();
    });
  }

  function timer() {
    var timeInterval = setInterval(function () {
      if (timeLeft > 0) {
        timerEl.textContent = "Time: " + timeLeft + " seconds";
        timeLeft--;
      } else {
        gameOver();
      }
    }, 1000);
  }
}

function viewHighScores() {
  clearInterval(timeInterval);
  timerEl.style.display = "none";
  questionsEl.innerHTML = "High Scores";
  answersEl.innerHTML = "";
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  highScores.forEach(function (score) {
    var scoreEl = document.createElement("li");
    scoreEl.textContent = score.initials + ": " + score.score;
    answersEl.appendChild(scoreEl);
  });
  infoContainerEl.style.display = "none";
  comments.innerHTML = "";
}

function createButton(text, clickHandler) {
  var button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  answersEl.appendChild(button);
}

var questions = [
  {
    question:
      "Which of the following is not a primitive data type in JavaScript?",
    choices: ["Numbers", "Objects", "Strings", "Boolean"],
    answer: "Objects",
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    choices: [
      "There is no difference between == and ===",
      "== compares values, while === compares values and types",
      "=== compares values, while == compares values and types, but performs type coercion",
      "=== performs a strict comparison, while == performs a loose comparison",
    ],
    answer:
      "=== performs a strict comparison, while == performs a loose comparison",
  },
  {
    question: "What does the acronym 'DOM' stand for?",
    choices: [
      "Document Object Model",
      "Direct Object Mapping",
      "Data Object Manager",
      "Document Object Mapping",
    ],
    answer: "Document Object Model",
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    choices: [
      "The current function",
      "The global object",
      "The parent object",
      "The object that the function is a method of",
    ],
    answer: "The object that the function is a method of",
  },
  {
    question:
      "What is the output of the following code: console.log(typeof null);",
    choices: ["'null'", "'undefined'", "'object'", "'string'"],
    answer: "'object'",
  },
];

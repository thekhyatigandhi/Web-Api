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
var highScores = document.querySelector("#highScores");
// to store highscores
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//added event listener to the start button
startBtn.addEventListener("click", startQuiz);
function startQuiz() {
  var timeLeft = 60;
  var score = 0;

  timer();
  question1();
  answersEl();
}

linkEl.addEventListener("click", highScores);
//need to call a function to view the highscore

function correctAnswer() {
  comments.innerHTML = "Correct Answer";
}

function wrongAnswer() {
  comments.innerHTML = "Wrong Answer";
}

function answersEl(answerText, callback) {
  var buttonEl = document.createElement("button");
  buttonEl.textContent = answerText;
  buttonEl.addEventListener("click", callback);
  questionsEl.appendChild(buttonEl);
}

function question1() {
  questionsEl.innerHTML =
    "Which of the following is not a primitive data type in JavaScript?";
  answersEl("Numbers", wrongAnswer);
  answersEl("Objects", correctAnswer); //correct Answer
  answersEl("Strings", wrongAnswer);
  answersEl("Boolean", wrongAnswer);
  question2();
}

function question2() {
  questionsEl.innerHTML =
    "What is the difference between == and === in JavaScript?";
  answersEl("There is no difference between == and ===", wrongAnswer);
  answersEl(
    "== compares values, while === compares values and types",
    correctAnswer
  ); //correct Answer
  answersEl(
    "=== compares values, while == compares values and types",
    wrongAnswer
  );
  answersEl(
    "== and === are not valid comparison operators in JavaScript",
    wrongAnswer
  );
  question3();
}

function question3() {
  questionsEl.innerHTML = "Which of the following is not a loop in JavaScript?";
  answersEl("for", wrongAnswer);
  answersEl("while", wrongAnswer);
  answersEl("foreach", correctAnswer); //correct Answer
  answersEl("do while", wrongAnswer);
  question4();
}

function question4() {
  questionsEl.innerHTML =
    "What is the purpose of the keyword THIS in JavaScript?";
  answersEl(
    "It refers to an object that is executing the current piece of code.",
    correctAnswer
  ); //correct answer
  answersEl("It refers to the global object.", wrongAnswer);
  answersEl("It refers to the function itself.", wrongAnswer);
  answersEl("It refers to the parent object.", wrongAnswer);
  clearInterval(timeInterval);
}

function timer() {
  var timeLeft = 60;
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Time: " + timeLeft + " seconds";
      timeLeft--;
    } else if (wrongAnswer()) {
      timeLeft -= 10;
      if (timeLeft <= 0) {
        timerEl.textContent = "Your Time Is Up";
        clearInterval(timeInterval);
      }
    } else {
      timerEl.textContent = "Your Time Is Up";
      clearInterval(timeInterval);
    }
  }, 1000);
}

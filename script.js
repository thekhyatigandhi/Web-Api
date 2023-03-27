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
function startQuiz() {
  timer();
  question1();
}

linkEl.addEventListener("click", viewHighScores);
//need to call a function to view the highscore

function wrongAnswer() {
  comments.innerHTML = "Wrong Answer";
}

function correctAnswer() {
  comments.innerHTML = "Correct Answer";
}

function question1() {
  questionsEl.innerHTML =
    "Which of the following is not a primitive data type in JavaScript?";
  createButton("Numbers");
  createButton("Objects", correctAnswer()); //correct Answer
  createButton("Strings");
  createButton("Boolean");
}

question2();

function question2() {
  questionsEl.innerHTML =
    "What is the difference between == and === in JavaScript?";
  createButton("There is no difference between == and ===");
  createButton(
    "== compares values, while === compares values and types",
    question3
  ); //correct Answer
  createButton("=== compares values, while == compares values and types");
  createButton("== and === are not valid comparison operators in JavaScript");
}
question3();

function question3() {
  questionsEl.innerHTML = "Which of the following is not a loop in JavaScript?";
  createButton("for");
  createButton("while");
  createButton("foreach", question4); //correct Answer
  createButton("do while");
}
question4();

function question4() {
  questionsEl.innerHTML =
    "What is the purpose of the keyword THIS in JavaScript?";
  createButton(
    "It refers to an object that is executing the current piece of code."
  ); //correct answer
  createButton("It refers to the global object.");
  createButton("It refers to the function itself");
  createButton("It refers to the parent object.");
}

function timer() {
  var timeLeft = 60;
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Time: " + timeLeft + " seconds";
      timeLeft--;
      //if the answer is wrong, timeLeft -10;
    } else {
      timerEl.textContent = "Your Time Is Up";
      clearInterval(timeInterval);
    }
  }, 1000);
}
timer();

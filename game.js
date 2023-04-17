// Get the game mode from the query parameter in the URL
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var mode = urlParams.get("mode");

// Initialize variables
var num1, num2, answer, choices, correct, score, mode;
score = 0;

function showModes() {
  document.getElementById("info-container").style.display = "none";
  document.getElementById("modes-container").style.display = "block";
  document.getElementsByClassName("content-container")[0].style.display =
    "flex";
  document.getElementsByClassName("restart-container")[0].style.display =
    "flex";
}

// Function to set the game mode
function setMode(gameMode) {
  mode = gameMode || "addition"; // set "addition" as default mode if gameMode is undefined
  restartGame();
}

function newProblem() {
  // Generate random game mode if the current mode is "random"
  if (mode === "random") {
    var modes = ["addition", "subtraction", "multiplication", "division"];
    mode = modes[Math.floor(Math.random() * modes.length)];
  }

  // Generate random numbers for the problem based on the game mode
  switch (mode) {
    case "addition":
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      answer = num1 + num2;
      break;
    case "subtraction":
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * num1);
      answer = num1 - num2;
      break;
    case "multiplication":
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      answer = num1 * num2;
      break;
    case "division":
      num2 = Math.floor(Math.random() * 5) + 1; // Generate a number between 1 and 5
      answer = Math.floor(Math.random() * 10) + 1; // Generate a number between 1 and 10
      num1 = answer * num2; // Calculate num1 such that the answer is an integer
      break;
  }
  // Set up the answer choices
  choices = [answer];
  while (choices.length < 4) {
    var rand = Math.floor(Math.random() * 20);
    if (rand != answer && rand <= 10) choices.push(rand);
  }
  // Shuffle the answer choices
  choices.sort(function () {
    return 0.5 - Math.random();
  });
  // Set up the problem text
  var problemText = "";
  switch (mode) {
    case "addition":
      problemText = num1 + " + " + num2 + " = ?";
      break;
    case "subtraction":
      problemText = num1 + " - " + num2 + " = ?";
      break;
    case "multiplication":
      problemText = num1 + " x " + num2 + " = ?";
      break;
    case "division":
      problemText = num1 + " / " + num2 + " = ?";
      break;
  }
  document.getElementById("problem").innerHTML = problemText;
  // Set up the answer choice buttons
  var optionsText = "";
  for (var i = 0; i < choices.length; i++) {
    optionsText +=
      "<button onclick='selectAnswer(" +
      choices[i] +
      ")'>" +
      choices[i] +
      "</button>";
  }
  document.getElementById("options").innerHTML = optionsText;
}

// Function to check if the selected answer is correct
function selectAnswer(selected) {
  var isCorrect = selected == answer;
  if (isCorrect) {
    document.getElementById("result").innerHTML =
      "<span style='color:#74D149'>Correct!</span>";
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
    if (score == 10) {
      document.getElementById("problem").innerHTML = "You Win!";
      document.getElementById("options").innerHTML = "";
      setTimeout(function () {
        document.getElementById("result").innerHTML = "";
      }, 1000);
      document.getElementById("win-sound").play(); 
    } else {
      newProblem();
      setTimeout(function () {
        document.getElementById("result").innerHTML = "";
      }, 1000);
    }
    document.getElementById("correct-sound").play(); // play correct sound effect
  } else {
    document.getElementById("result").innerHTML =
      "<span style='color:red'>Incorrect!</span>";
    if (score > 0) {
      score--;
      document.getElementById("score").innerHTML = "Score: " + score;
    }
    setTimeout(function () {
      document.getElementById("result").innerHTML = "";
    }, 1000);
    document.getElementById("incorrect-sound").play(); // play incorrect sound effect
  }
}

// Function to handle the "Restart Game" button click
function restartGame() {
  score = 0;
  document.getElementById("score").innerHTML = "Score: " + score;
  newProblem();
}

// Generate the first problem
setMode(mode);

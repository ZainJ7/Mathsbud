// Get the game mode from the query parameter in the URL
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var mode = urlParams.get("mode");

// Initialize variables
var num1, num2, answer, choices, correct, score, mode;
score = 0;
var coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 0;
document.getElementById("coins").innerHTML = "Coins: " + coins;
var currentAvatar = localStorage.getItem("currentAvatar") || "";
document.getElementById("current-avatar").innerHTML =
  "Avatar: " + currentAvatar;
  var questionsAnswered = 0;


function showModes() {
  document.getElementById("info-container").style.display = "none";
  document.getElementById("modes-container").style.display = "block";
  document.getElementsByClassName("content-container")[0].style.display =
    "flex";
  document.getElementsByClassName("content-container")[1].style.display =
    "flex";
  document.getElementsByClassName("restart-container")[0].style.display =
    "flex";
}

// Generate the first problem
setMode(mode);

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
    questionsAnswered++;
    document.getElementById("remaining-questions").innerHTML = "Questions Answered: " + questionsAnswered;
    document.getElementById("score").innerHTML = "Score: " + score;
    if (score == 10) {
      document.getElementById("problem").innerHTML = "You Win!";
      document.getElementById("options").innerHTML = "";
      setTimeout(function () {
        document.getElementById("result").innerHTML = "";
      }, 1000);
      document.getElementById("win-sound").play();
      updateCoins();
    } else {
      newProblem();
      setTimeout(function () {
        document.getElementById("result").innerHTML = "";
      }, 1000);
      var correctSounds = [
        "correct-sound",
        "correct-sound-2",
        "correct-sound-3",
      ]; // array of sound files
      var randomIndex = Math.floor(Math.random() * correctSounds.length); // select a random index from the array
      var soundFile = correctSounds[randomIndex]; // get the sound file at the random index
      var audio = document.getElementById(soundFile); // get the audio element using the ID
      audio.play(); // play the sound effect
    }
  } else {
    document.getElementById("result").innerHTML =
      "<span style='color:red'>Incorrect!</span>";
    if (score > 0) {
      score--;
    }
    questionsAnswered++;
    document.getElementById("remaining-questions").innerHTML = "Questions Answered: " + questionsAnswered;
    document.getElementById("score").innerHTML = "Score: " + score;
    setTimeout(function () {
      document.getElementById("result").innerHTML = "";
    }, 1000);
    var incorrectSounds = ["incorrect-sound", "incorrect-sound-2"]; // array of sound files
    var randomIndex = Math.floor(Math.random() * incorrectSounds.length); // select a random index from the array
    var soundFile = incorrectSounds[randomIndex]; // get the sound file at the random index
    var audio = document.getElementById(soundFile); // get the audio element using the ID
    audio.play(); // play the sound effect
  }
}



// Update coins after winning
function updateCoins() {
  coins += 10;
  localStorage.setItem("coins", coins);
  document.getElementById("coins").innerHTML = "Coins: " + coins;
}

function showAlertMessage(message) {
  var alertMessageElement = document.getElementById("alert-message");
  alertMessageElement.innerHTML = message;
  alertMessageElement.style.display = "block";
  setTimeout(function () {
    alertMessageElement.style.display = "none";
  }, 2000);
}

// Function to handle the "Restart Game" button click
function restartGame() {
  score = 0;
  questionsAnswered = 0;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("remaining-questions").innerHTML = "Questions Answered: " + questionsAnswered;
  newProblem();
}


// Generate the first problem
setMode(mode);

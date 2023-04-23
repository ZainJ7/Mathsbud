// Initialize variables
var coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 0;
document.getElementById("coins").innerHTML = "Coins: " + coins;
var avatars = [
  { emoji: "🐶", price: 10 },
  { emoji: "🐱", price: 20 },
  { emoji: "🦊", price: 30 },
  { emoji: "🦁", price: 40 },
  { emoji: "🐵", price: 50 },
  { emoji: "🦄", price: 60 },
];
var currentAvatar = localStorage.getItem("currentAvatar") || "";
document.getElementById("current-avatar").innerHTML =
  "Avatar: " + currentAvatar;

function showAvatars() {
  var avatarsContainer = document.getElementById("avatars");
  avatarsContainer.innerHTML = "";
  for (var i = 0; i < avatars.length; i++) {
    var avatarButton = document.createElement("button");
    avatarButton.classList.add("avatar-button", "avatar-button-style");
    avatarButton.innerHTML =
      avatars[i].emoji + "<br>(" + avatars[i].price + " coins)";

    // Use an IIFE to pass the current value of i to the event listener
    (function (index) {
      avatarButton.addEventListener("click", function () {
        buyAvatar(index);
      });
    })(i);

    avatarsContainer.appendChild(avatarButton);
  }
}

function showAlertMessage(message) {
  var alertMessageElement = document.getElementById("alert-message");
  alertMessageElement.innerHTML = message;
  alertMessageElement.style.display = "block";
  setTimeout(function () {
    alertMessageElement.style.display = "none";
  }, 2000);
}

function buyAvatar(index) {
  var avatar = avatars[index];
  if (coins >= avatar.price) {
    coins -= avatar.price;
    currentAvatar = avatar.emoji;
    document.getElementById("coins").innerHTML = "Coins: " + coins;
    document.getElementById("current-avatar").innerHTML =
      "Avatar: " + currentAvatar;
    localStorage.setItem("currentAvatar", currentAvatar);
    localStorage.setItem("coins", coins); // Save the updated coin amount in localStorage
    document.getElementById("nice-choice").play();
  } else {
    showAlertMessage("Not enough coins to buy this avatar!");
  }
}

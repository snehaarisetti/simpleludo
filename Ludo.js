var roll = 0;
var clicked = false;
var currPos = 0;
var currPlayer = "";
var currToken = "";
var stepHor = 85;
var stepVer = 84;
var numToken = "";
var players = ["A", "B"];
var tokenWin = { A: 0, B: 0 };
var pos = { TokenA1: 0, TokenA2: 0, TokenB1: 0, TokenB2: 0 };
var onBoard = { TokenA1: 0, TokenA2: 0, TokenB1: 0, TokenB2: 0 };
var count = 0;
var stepsA = [];
var stepsB = [];

function killToken() {
  var kill = "";
  for (var i = 0; i < players.length; i++) {
    for (var j = 1; j <= 2; j++) {
      var token1 = document.getElementById(players[i] + "token" + j);
      var token2 = document.getElementById(currToken);
      if (
        token1.style.top == token2.style.top &&
        token1.style.left == token2.style.left &&
        currPlayer != players[i] &&
        currPos + roll < 44
      ) {
        count++;
        kill = players[i] + "token" + j;
        return kill;
      }
    }
  }
  return false;
}

function sendToLocker(killed) {
  pos[killed] = 0;
  onBoard[killed] = 0;
  var doc = document.getElementById(killed);

  switch (killed) {
    case "Atoken1":
      doc.style.top = 90 + "px";
      doc.style.left = 90 + "px";
      break;
    case "Atoken2":
      doc.style.top = 90 + "px";
      doc.style.left = 175 + "px";
      break;
    case "Btoken1":
      doc.style.top = 685 + "px";
      doc.style.left = 1200 + "px";
      break;
    case "Btoken2":
      doc.style.top = 685 + "px";
      doc.style.left = 1275 + "px";
      break;
  }
}

function changePlayer() {
  if (roll != 6) {
    var text = document.getElementById("player");
    switch (text.innerHTML) {
      case "A":
        text.innerHTML = "B";
        break;
      case "B":
        text.innerHTML = "A";
        break;
    }
  }

  var doc = document.getElementById("demo");
  doc.innerHTML = "You rolled ";
}

function checkWin() {
  if (tokenWin[currPlayer] == 2) {
    document.getElementById("demo").innerHTML = "The Winner is " + currPlayer;
    document.getElementsByClassName("button").style.display = "none";
    document.getElementsByClassName("turn").style.display = "none";
  }
}

function pushSteps(value, steps, count) {
  for (i = 0; i < count; i++) steps.push(value);
}

function moveRight() {
  var doc = document.getElementById(currToken);
  var curr = Number(doc.style.left.replace(/[a-z]/g, ""));
  doc.style.left = curr + stepHor + "px";
  currPos++;
}

function moveDown() {
  var doc = document.getElementById(currToken);
  var curr = Number(doc.style.left.replace(/[a-z]/g, ""));
  doc.style.left = curr + stepVer + "px";
  currPos++;
}

function moveLeft() {
  var doc = document.getElementById(currToken);
  var curr = Number(doc.style.left.replace(/[a-z]/g, ""));
  doc.style.left = curr - stepHor + "px";
  currPos++;
}

function moveUp() {
  var doc = document.getElementById(currToken);
  var curr = Number(doc.style.left.replace(/[a-z]/g, ""));
  doc.style.left = curr - stepVer + "px";
  currPos++;
}


pushSteps(moveRight, stepsA, 7);
pushSteps(moveDown, stepsA, 7);
pushSteps(moveLeft, stepsA, 7);
pushSteps(moveUp, stepsA, 6);


pushSteps(moveLeft, stepsB, 7);
pushSteps(moveUp, stepsB, 7);
pushSteps(moveRight, stepsB, 7);
pushSteps(moveDown, stepsB, 6);

function dieRoll() {
  if (!clicked) {
    roll = Math.floor(Math.random() * 6 + 1);
    document.getElementById("demo").innerHTML = "You rolled " + roll;
    clicked = true;
  }

  if (roll != 6) {
    window.setTimeout(changePlayer, 1000);
    clicked = false;
  }
}

function moveToken(Player, tok) {
  var doc = document.getElementById("player");
  numToken = tok;
  currPlayer = Player;
  currToken = currPlayer + "token" + numToken;
  currPos = pos[currToken];

  if (roll + currPos > 27) {
    var text = document.getElementById("player");
    switch (text.innerHTML) {
      case "A":
        text.innerHTML = "B";
        break;
      case "B":
        text.innerHTML = "A";
        break;
    }
    var doc = document.getElementById("demo");
    doc.innerHTML = "You rolled ";
  } else {
    if (clicked) {
      var position = currPos;
      if (doc.innerHTML == currPlayer) {
        if (onBoard[currToken] == 1 || roll == 6) {
          if (onBoard[currToken] == 0) {
            var text = document.getElementById(currToken);

            switch (Player) {
              case "A":
                text.style.left = 387 + "px";
                text.style.top = 55 + "px";
                break;
              case "B":
                text.style.left = 967 + "px";
                text.style.top = 643 + "px";
                break;
            }

            onBoard[currToken] = 1;
          } else {
            switch (Player) {
              case "A":
                for (i = currPos; i < position + roll; i++) {
                  stepsA[i]();
                }
                break;
              case "B":
                for (i = currPos; i < position + roll; i++) {
                  stepsB[i]();
                }
                break;
            }

            pos[currToken] = currPos;
            var killed = killToken();

            if (killed != false) {
              sendToLocker(killed);
            }

            if (currPos == 27) {
              tokenWin[currPlayer]++;
              onBoard[currToken] = 0;
              pos[currToken] = 0;
              document.getElementById(currToken).style.display = "none";
              checkWin();
              changePlayer();
            }

            roll = 0;
            clicked = false;
            document.getElementById("demo").innerHTML = "You rolled ";
          }
        }
      }
    }
  }
}

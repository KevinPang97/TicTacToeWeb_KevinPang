/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn to mark a position with mouse-left click
Position is assigned with numbers as shown:

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

*/

//Board Object initialize for computation
//This board object will be updated with player mark (eg. 1:'X' ...)
let board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

//Update the gameboard with the user input
//by reading recorded inputs in html page of each players
function markBoard(Xrecord, Orecord) {
  var Xrecord = document.getElementById("Xinput").textContent;
  var Orecord = document.getElementById("Oinput").textContent;
  for (let i = 0; i < Xrecord.length; i++) {
    let position = Xrecord.slice(i, i + 1);
    board[position.toString()] = "X";
  }
  for (let i = 0; i < Orecord.length; i++) {
    let position = Orecord.slice(i, i + 1);
    board[position.toString()] = "O";
  }
}

// Validate if the input position is already occupied this function should return true or false.
// this function should return true or false.
function validateMove(position) {
  if (board[position.toString()] == " ") {
    return true;
  }
  return false;
}

// List of all winning combination
let winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// to check if the current winner just win
// also store the win combination of the player (3 numbers, ascending order)
// this method should return true or false
function checkWin(player) {
  let playerInput = [];

  for (let validPosition in board) {
    if (board[validPosition] == player) {
      playerInput[playerInput.length] = Number(validPosition);
    }
  }

  for (let element of winCombinations) {
    let all3Match = 0;
    for (let k = 0; k < playerInput.length; k++) {
      if (element.indexOf(playerInput[k]) >= 0) {
        all3Match++;
      }
      if (all3Match == 3) {
        winningPosition(element);
        return true;
      }
    }
  }

  return false;
}

// Check if the board is full (ie all position occupied)
// This function should return true/ false
function checkFull() {
  for (let element in board) {
    if (board[element] == " ") {
      return false;
    }
  }

  return true;
}

// Record all user input in html page
// This record is hidden to user
// Read the record and updates each time recieved a valid input
function recordEntry(player, userInput) {
  if (player == "X") {
    let tempXrecord = document.getElementById("Xinput").innerHTML;
    document.getElementById("Xinput").innerHTML = tempXrecord.concat(userInput);
  }

  if (player == "O") {
    let tempOrecord = document.getElementById("Oinput").innerHTML;
    document.getElementById("Oinput").innerHTML = tempOrecord.concat(userInput);
  }
}

// Display the user input on web browser with corresponding mark (X/O)
function dispMark(userInput, currentTurnPlayer) {
  let imgId = "box" + userInput + currentTurnPlayer;
  document.getElementById(imgId).style.display = block;
  document.getElementById("test").innerHTML = imgId;
  return;
}

// Entry Point of the program
// This parts starts by checking is there any winners
// then validate is the input is valid (unoccupied)
// followed by checking if the new input results in winning
// else it will check if the board is full
// if not full, game continues by changing to next player (X -> O -> X...)
function gameUpdate(userInput) {
  var winnerIdentified =
    document.getElementById("winnerIdentified").textContent;
  if (winnerIdentified == "y") {
    return;
  }

  markBoard();

  if (validateMove(userInput)) {
    var currentTurnPlayer =
      document.getElementById("currentPlayer").textContent;
    imgDisplaySetting(userInput, "inline", "1");
    hoverFrameSetting(userInput, "none");
    recordEntry(currentTurnPlayer, userInput);
    markBoard();
    if (checkWin(currentTurnPlayer)) {
      document.getElementById("winner").innerHTML = "Winner!";
      document.getElementById("winnerIdentified").textContent = "y";

      return;
    } else {
      if (checkFull()) {
        document.getElementById("winner").innerHTML = "Tie !";
        document.getElementById("winner").style.animationName =
          "textAnimationTie";
        return;
      }
    }

    if (currentTurnPlayer == "X") {
      document.getElementById("currentPlayer").innerHTML = "O";
    } else if (currentTurnPlayer == "O") {
      document.getElementById("currentPlayer").innerHTML = "X";
    }
  }
  return;
}

//Reload Html page
function restartGame() {
  location.reload();
}

//-----------------------------------------------------------------//
//----------------------CSS Animation Section----------------------//
//-----------------------------------------------------------------//

// Animation when mouse hover over an unoccupied position
// show blinking frame and semi-transparent mark of current player
function hoverAnimation(hoverPosition) {
  if (document.getElementById("winnerIdentified").textContent == "y") {
    return;
  }
  if (validateMove(hoverPosition)) {
    hoverFrameSetting(hoverPosition, "dashed");

    imgDisplaySetting(hoverPosition, "block", "0.1");
  }

  return;
}

// Remove hover animation when mouse leaves the position
function hoverEnd(hoverPosition) {
  if (document.getElementById("winnerIdentified").textContent == "y") {
    return;
  }
  if (validateMove(hoverPosition)) {
    hoverFrameSetting(hoverPosition, "none");
    imgDisplaySetting(hoverPosition, "none", "1");
  }
  return;
}

// This function handles display parameter of blinking frame
function hoverFrameSetting(hoverPosition, text_borderStyle) {
  let hoverFrameID = "hoverFrame" + hoverPosition;
  document.getElementById(hoverFrameID).style.borderStyle = text_borderStyle;
  return;
}

// This function handles all parameters related to blinking frame animation
// When winning, win position will be marked with different colour from other keyframes
function hoverFrameWin(
  hoverPosition,
  text_aniName,
  text_aniDuration,
  text_borderRadius
) {
  let hoverFrameID = "hoverFrame" + hoverPosition;
  document.getElementById(hoverFrameID).style.animationName = text_aniName;
  document.getElementById(hoverFrameID).style.animationDuration =
    text_aniDuration;
  document.getElementById(hoverFrameID).style.borderRadius = text_borderRadius;
  return;
}

// This function handles parameter for winning frame
function winningPosition(winPosition) {
  for (e of winPosition) {
    hoverFrameSetting(e, "solid");
    hoverFrameWin(e, "winMatch", "0.2s", "10px");
  }
  return;
}

// This function handles display and opacity of the mark images
// when hover, this function should display semi transparent mark images
// when input is validated, this function should display full opacity image on the position
function imgDisplaySetting(hoverPosition, text_imgDisplay, text_imgOpacity) {
  var currentTurnPlayer = document.getElementById("currentPlayer").textContent;
  let imgId = "box" + hoverPosition + currentTurnPlayer;
  document.getElementById(imgId).style.display = text_imgDisplay;
  document.getElementById(imgId).style.opacity = text_imgOpacity;
  return;
}

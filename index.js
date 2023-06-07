const boardFields = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let turnPlayer = "";
/*const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");*/

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h3").innerHTML =
    'Vez do(a): <span id="turnPlayer"></span>';
  updateTitle();
  boardFields.forEach(function (fieldBoard) {
    fieldBoard.classList.remove("win");
    fieldBoard.innerText = "";
    fieldBoard.addEventListener("click", clickBoard);
  });
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function disableField(field) {
  field.removeEventListener("click", clickBoard);
}

function clickWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  if (playerName === "player1") {
    document.querySelector("h3").innerHTML = player2 + " venceu!";
  } else {
    player2;
  }
}

function clickBoard(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region;
  const rowColumnPair = region.split(".");
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];

  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X";
    turnPlayer = "player2";
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
    turnPlayer = "player1";
  }

  console.clear();
  console.table(vBoard);
  disableField(span);

  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    clickWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    //turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h3").innerHTML = "Empate!";
  }
}

document.getElementById("start").addEventListener("click", initializeGame);

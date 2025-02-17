const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msgText = document.getElementById("msg");
const newGameBtn = document.getElementById("new-btn");
const resetBtn = document.querySelector(".reset-btn");

let currentPlayer = "X";
let board = Array(9).fill(null);

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : "Tie";
}

function handleBoxClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    msgText.textContent = winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`;
    msgContainer.classList.add("show");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function resetGame() {
  board.fill(null);
  currentPlayer = "X";
  boxes.forEach(box => (box.textContent = ""));
}

function newGame() {
  msgContainer.classList.remove("show");
  resetGame();
}

boxes.forEach(box => box.addEventListener("click", handleBoxClick));
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("board");
    const rotatingElements = document.querySelector(".rotatingElements");
    const leftBtn = document.querySelector(".leftBtn");
    const rightBtn = document.querySelector(".rightBtn");
    const resetBtn = document.getElementById("reset-btn")
    const player1TimerDisplay = document.getElementById("player1Timer");
    const player2TimerDisplay = document.getElementById("player2Timer");
    const pauseBtn = document.getElementById("pause-btn");
    const resumeBtn = document.getElementById("resume-btn");
    let player1Time = 5 * 60; // 5 minutes in seconds
    let player2Time = 5 * 60; // 5 minutes in seconds
    let intervalId;
  
    const boardSize = 8;
    const initialSetup = [
      "tank1",
      "richo1",
      "semiRicho1",
      "titan",
      "cannon",
      "semiRicho2",
      "richo2",
      "tank2",
    ];
  
    let selectedPiece = null;
    let isPaused = false;
    let playerTurn = "player1";
  
    const board = Array(boardSize)
      .fill()
      .map(() => Array(boardSize).fill(null));
  
    //Intiate and store the data for reflection direction and rotation angle.
    const reflectionHistory = {
      player1: {
        rotationAngle: {
          richo1: 0,
          semiRicho1: 0,
          semiRicho2: 0,
          richo2: 0,
        },
        reflectionStatus: {
          richo1: "left",
          semiRicho1: "flat",
          semiRicho2: "flat",
          richo2: "right",
        },
      },
      player2: {
        rotationAngle: {
          richo1: 0,
          semiRicho1: 0,
          semiRicho2: 0,
          richo2: 0,
        },
        reflectionStatus: {
          richo1: "right",
          semiRicho1: "flat",
          semiRicho2: "flat",
          richo2: "left",
        },
      },
    };
  
    let isActionInProgress = false;
  
    function updatePlayerTurn() {
      const el = document.querySelector(".displayPlayerTurn");
      if(playerTurn==="player1"){
        el.innerHTML = `<p>Turn: <span class="turn" style="color:blue" >BLUE</span> </p>`;
      }else{
        el.innerHTML = `<p>Turn: <span class="turn" style="color:red" >RED</span> </p>`;
      }
      isActionInProgress = false;
    }
  
    function startTimer() {
      intervalId = setInterval(() => {
        if (playerTurn === "player1") {
          player1Time--;
          player1TimerDisplay.textContent = formatTime(player1Time);
          if (player1Time === 0) {
            clearInterval(intervalId);
            alert("RED won by Timeout")
            return;
          }
        } else {
          player2Time--;
          player2TimerDisplay.textContent = formatTime(player2Time);
          if (player2Time === 0) {
            clearInterval(intervalId);
            alert("BLUE won by Timeout")
            return;
          }
        }
      }, 1000);
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      if (playerTurn === "player1")
      return `Blue's-Time : ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      else{
        return `Red's-Time : ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      }
    }

    startTimer();
  
    function pauseGame() {
        clearInterval(intervalId);
        isPaused = true;}

    function resumeGame() {
        if (isPaused) {
            startTimer();
            isPaused = false;}
    }


    function resetTimer() {
      clearInterval(intervalId);
      player1Time = 5 * 60;
      player2Time = 5 * 60;
      startTimer();
    }
  
    // Initialize board
    function initBoard() {
      updatePlayerTurn();
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          const square = document.createElement("div");
          square.classList.add("square");
          square.dataset.row = i;
          square.dataset.col = j;
          boardElement.appendChild(square);
  
          if (i === 0) {
            addPiece(square, initialSetup[j], "player1");
          } else if (i === 7) {
            addPiece(square, initialSetup[j], "player2");
          }
        }
      }
    }
  
    // Add piece to a square
    function addPiece(square, type, player) {
      const piece = document.createElement("div");
      piece.classList.add("piece", type, player);
  
      const img = document.createElement("img");
      img.src = `svgs/${player}_${type}.svg`;
      piece.appendChild(img);
  
      piece.dataset.type = type;
      piece.dataset.player = player;
      square.appendChild(piece);
      board[square.dataset.row][square.dataset.col] = piece;
    }
  
    // Handle piece click
    function handlePieceClick(e) {
        if(isPaused) return;
        else{

            console.log("Handle piece click started");
            const piece = e.target.closest(".piece");
            console.log(piece);
            const square = piece.parentElement;
            console.log(square);
            console.log(piece.dataset.player);
            console.log(playerTurn);
            if (piece.dataset.player === playerTurn) {
              clearHighlights();
              selectedPiece = piece;
        
              highlightMoves(square, piece);
            } else if (selectedPiece) {
              movePiece(selectedPiece, square);
            }

        }
    }
  
    // Highlight possible moves
    function highlightMoves(square, piece) {
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);
  
      let moves = [];
  
      switch (piece.dataset.type.replace(/[0-9]/g, "")) {
        case "tank":
        case "richo":
        case "semiRicho":
        case "titan":
          moves = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
            [row - 1, col - 1],
            [row - 1, col + 1],
            [row + 1, col - 1],
            [row + 1, col + 1],
          ];
          break;
        case "cannon":
          moves = [
            [row, col - 1],
            [row, col + 1],
          ];
          break;
      }
  
      moves.forEach((move) => {
        const [r, c] = move;
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
          const targetSquare = document.querySelector(
            `.square[data-row='${r}'][data-col='${c}']`
          );
          //check whether the highlights includes square of opponent's pieces and empty squares
          if (!board[r][c] || board[r][c].dataset.player !== playerTurn) {
            targetSquare.classList.add("highlight");
          }
        }
      });
  
      console.log(piece);
  
      if (piece.dataset.type.toLowerCase().includes("richo")) {
        rotatingElements.style.display = "block";
      } else {
        rotatingElements.style.display = "none";
      }
    }
  
    // Clear highlights
    function clearHighlights() {
      document.querySelectorAll(".square.highlight").forEach((square) => {
        square.classList.remove("highlight");
      });
    }
  
    // Move piece
    function movePiece(piece, square) {
      if (isActionInProgress) return;
      console.log(piece);
      const currentSquare = piece.parentElement;
      const targetSquare = square;
      console.log(currentSquare);
      console.log(targetSquare);
  
      if (targetSquare.classList.contains("highlight")) {
        targetSquare.appendChild(piece);
        board[currentSquare.dataset.row][currentSquare.dataset.col] = null;
        board[targetSquare.dataset.row][targetSquare.dataset.col] = piece;
        clearHighlights();
        selectedPiece = null;
        shooting();
      }
    }
  
    initBoard();
  
    //Update the reflections direction and rotation angle of the richo and semiRicho
    function updateReflectionHistory(playerTurn, selectedPiece) {
      let currRotationAngle =
        reflectionHistory[playerTurn].rotationAngle[selectedPiece];
      let normalizedAngle = ((currRotationAngle % 360) + 360) % 360;
  
      console.log(
        `Updating reflection status for ${playerTurn}, ${selectedPiece}, normalized angle: ${normalizedAngle}`
      );
  
      switch (selectedPiece) {
        case "richo1":
          if (playerTurn === "player1") {
            if (normalizedAngle === 90 || normalizedAngle === 270) {
              reflectionHistory[playerTurn].reflectionStatus.richo1 = "right";
            } else if (
              normalizedAngle === 180 ||
              normalizedAngle === 360 ||
              normalizedAngle === 0
            ) {
              reflectionHistory[playerTurn].reflectionStatus.richo1 = "left";
            }
          } else if (playerTurn === "player2") {
            if (normalizedAngle === 90 || normalizedAngle === 270) {
              reflectionHistory[playerTurn].reflectionStatus.richo1 = "left";
            } else if (
              normalizedAngle === 180 ||
              normalizedAngle === 360 ||
              normalizedAngle === 0
            ) {
              reflectionHistory[playerTurn].reflectionStatus.richo1 = "right";
            }
          }
          console.log(
            `Updated richo1 status: ${reflectionHistory[playerTurn].reflectionStatus.richo1}`
          );
          break;
  
        case "richo2":
          if (playerTurn === "player1") {
            if (normalizedAngle === 90 || normalizedAngle === 270) {
              reflectionHistory[playerTurn].reflectionStatus.richo2 = "left";
            } else if (
              normalizedAngle === 180 ||
              normalizedAngle === 360 ||
              normalizedAngle === 0
            ) {
              reflectionHistory[playerTurn].reflectionStatus.richo2 = "right";
            }
          } else if (playerTurn === "player2") {
            if (normalizedAngle === 90 || normalizedAngle === 270) {
              reflectionHistory[playerTurn].reflectionStatus.richo2 = "right";
            } else if (
              normalizedAngle === 180 ||
              normalizedAngle === 360 ||
              normalizedAngle === 0
            ) {
              reflectionHistory[playerTurn].reflectionStatus.richo2 = "left";
            }
          }
          console.log(
            `Updated richo2 status: ${reflectionHistory[playerTurn].reflectionStatus.richo2}`
          );
          break;
  
        case "semiRicho1":
          if (playerTurn === "player1") {
            // Player 1 and semiRicho 1:
            // 90deg - flat
            // 180deg - right
            // 270deg- left
            // 360deg - flat
            // -90deg - left
            // -180deg - right
            // -270deg - flat
            // -360deg - flat
  
            if (
              normalizedAngle === 90 ||
              normalizedAngle === 360 ||
              normalizedAngle === 0
            ) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "flat";
            } else if (normalizedAngle === 180 || normalizedAngle === -180) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "right";
            } else if (normalizedAngle === 270 || normalizedAngle === -90) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "left";
            } else if (normalizedAngle === -270 || normalizedAngle === -360) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "flat";
            }
          } else if (playerTurn === "player2") {
            // Player 2 and semiRicho 1:
            // 90deg - left
            // 180deg - right
            // 270deg - flat
            // 360deg - flat
            // -90deg - flat
            // -180deg - right
            // -270deg - left
            // -360deg - flat
            if (normalizedAngle === 90 || normalizedAngle === -270) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "left";
            } else if (normalizedAngle === 180 || normalizedAngle === -180) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "right";
            } else if (
              normalizedAngle === 270 ||
              normalizedAngle === 360 ||
              normalizedAngle === 0
            ) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "flat";
            } else if (normalizedAngle === -90 || normalizedAngle === -360) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho1 = "flat";
            }
          }
          console.log(
            `Updated semiRicho1 status: ${reflectionHistory[playerTurn].reflectionStatus.semiRicho1}`
          );
          break;
  
        case "semiRicho2":
          // player 1 and semiRIcho 2:
          // 90deg - right
          // 180deg - left
          // 270deg- flat
          // 360deg - flat
          // -90deg - flat
          // -180deg - left
          // -270deg - right
          // -360deg - flat
  
          if (playerTurn === "player1") {
            if (normalizedAngle === 90) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "right";
            } else if (normalizedAngle === 180 || normalizedAngle === -180) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "left";
            } else if (normalizedAngle === 270 || normalizedAngle === -90) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "flat";
            } else if (
              normalizedAngle === 360 ||
              normalizedAngle === 0 ||
              normalizedAngle === -360
            ) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "flat";
            } else if (normalizedAngle === -270) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "right";
            }
          } else if (playerTurn === "player2") {
            // player 2 and semiRIcho 2:
            // 90deg - flat
            // 180deg - left
            // 270deg- right
            // 360deg - flat
            // -90deg - right
            // -180deg - left
            // -270deg - flat
            // -360deg - flat
            if (
              normalizedAngle === 90 ||
              normalizedAngle === 360 ||
              normalizedAngle === -270 ||
              normalizedAngle === -360
            ) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "flat";
            } else if (normalizedAngle === 180 || normalizedAngle === -180) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "left";
            } else if (normalizedAngle === 270) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "right";
            } else if (normalizedAngle === 270 || normalizedAngle === -90) {
              reflectionHistory[playerTurn].reflectionStatus.semiRicho2 = "right";
            }
          }
          console.log(
            `Updated semiRicho2 status: ${reflectionHistory[playerTurn].reflectionStatus.semiRicho2}`
          );
          break;
  
        default:
          break;
      }
    }
  
    //Rotate richo and semiRich with respect to left and right button
    function rotate(e) {
      if (isActionInProgress) return;
  
      console.log(selectedPiece);
      let type = selectedPiece.dataset.type;
      console.log(type.toLowerCase().includes("richo"));
      if (!type.toLowerCase().includes("richo")) return;
      let currRotationAngle = reflectionHistory[playerTurn].rotationAngle[type];
      console.log(currRotationAngle);
      console.log(e.target.innerText);
      let targetedAngle =
        e.target.innerText === "Left"
          ? currRotationAngle - 90
          : currRotationAngle + 90;
      selectedPiece.style.transform = `rotate(${targetedAngle}deg)`;
      reflectionHistory[playerTurn].rotationAngle[type] = targetedAngle;
  
      updateReflectionHistory(playerTurn, type);
  
      clearHighlights();
      selectedPiece = null;
      shooting();
      // playerTurn = playerTurn === "player1" ? "player2" : "player1";
      // updatePlayerTurn();
    }
  
    //Shoot from cannon
    function shooting() {
        if (isPaused) return;
        else{
            
        }
      isActionInProgress = true;
      console.log(isActionInProgress);
  
      const allSquares = document.querySelectorAll(".square");
      console.log(allSquares);
  
      const cannonSquare = Array.from(allSquares).filter((square) =>
        square.querySelector(`.cannon.${playerTurn}`)
      )[0];
  
      console.log(cannonSquare);
  
      let r = parseInt(cannonSquare.dataset.row, 10);
      let c = parseInt(cannonSquare.dataset.col, 10);
      console.log(r, c);
  
      console.log(playerTurn);
      let targetRow = playerTurn === "player1" ? r + 1 : r - 1;
  
      //Move the bullet from current square to the targeted square
      function moveBullet(row, col, direction = "down") {
        // Select the target square
        let targetSquare = document.querySelector(
          `.square[data-row='${row}'][data-col='${col}']`
        );
  
        if (!targetSquare) {
          console.log("Target square not found or out of bounds");
          playerTurn = playerTurn === "player1" ? "player2" : "player1";
          updatePlayerTurn();
          return;
        }
  
        // Check if the target square contains any piece
        if (targetSquare.querySelector(".piece")) {
          //Check if the target square contains my own player and not an opponent player
          console.log(targetSquare.querySelector(".piece").dataset.player);
          console.log(playerTurn);
          console.log(
            targetSquare.querySelector(".piece").dataset.player === playerTurn
          );
          if (
            targetSquare.querySelector(".piece").dataset.player === playerTurn
          ) {
            console.log(
              "Target square contains my own player and not an opponent player."
            );
            playerTurn = playerTurn === "player1" ? "player2" : "player1";
            updatePlayerTurn();
            return;
          }
  
          console.log(
            "Bullet hit a piece:",
            targetSquare.querySelector(".piece").dataset.type
          );
  
          let opponentPiece = targetSquare.querySelector(".piece").dataset.type;
          let opponentPlayer =
            targetSquare.querySelector(".piece").dataset.player;
  
          if (opponentPiece === "titan") {
            if(playerTurn==="player1"){
              alert(`BLUE wins the game.`);
            }else{
              alert(`RED wins the game.`);
            }
            
            clearHighlights();
            selectedPiece = null;
            // Reset game code
            resetGame();
            return;
          }
  
          let isRicho = opponentPiece.toLowerCase().includes("richo");
          let isSemiRicho = opponentPiece.toLowerCase().includes("semiricho");
          let isReflected =
            reflectionHistory[opponentPlayer].reflectionStatus[opponentPiece] !==
            "flat";
  
          console.log("isReflected: ", isReflected);
  
          if ((isRicho && isReflected) || (isSemiRicho && isReflected)) {
            const reflectDirection =
              reflectionHistory[opponentPlayer].reflectionStatus[opponentPiece];
            console.log(reflectDirection);
  
            let targetColumn = reflectDirection === "left" ? col - 1 : col + 1;
            let newDirection = reflectDirection === "left" ? "left" : "right";
  
            moveBullet(row, targetColumn, newDirection);
            return;
          }
  
          playerTurn = playerTurn === "player1" ? "player2" : "player1";
          updatePlayerTurn();
          return;
        }
  
        // Append the bullet to the target square
        targetSquare.appendChild(bullet);
  
        // Move to the next row or column
        if (direction === "down") {
          row = playerTurn === "player1" ? row + 1 : row - 1;
        } else if (direction === "left") {
          col -= 1;
        } else if (direction === "right") {
          col += 1;
        }
  
        // Use setTimeout to create a delay effect for the bullet movement
        setTimeout(() => {
          // Remove the bullet from the current square before moving to the next
          targetSquare.removeChild(bullet);
          moveBullet(row, col, direction);
        }, 300); // Adjust the delay time as needed
      }
  
      // Create the bullet element
      const bullet = document.createElement("div");
      bullet.style.width = "15px";
      bullet.style.height = "15px";
      bullet.style.backgroundColor = "red";
      bullet.style.borderRadius = "50%";
  
      // Start moving the bullet
      moveBullet(targetRow, c);
    }
  
    // Event listeners
    document.querySelectorAll(".square").forEach((square) => {
      square.addEventListener("click", (e) => {
        console.log(e.target);
        console.log(e.target.closest(".square"));
        console.log(isActionInProgress);
        if (isActionInProgress) return;
        if (e.target.closest(".piece")) {
          handlePieceClick(e);
        } else if (selectedPiece) {
          movePiece(selectedPiece, e.target.closest(".square"));
        }
      });
    });
  
    console.log(leftBtn);
    console.log(rightBtn);
    leftBtn.addEventListener("click", (e) => rotate(e));
    rightBtn.addEventListener("click", (e) => rotate(e));
    resetBtn.addEventListener("click", ()=>{location.reload()});
    pauseBtn.addEventListener("click", () => {pauseGame()});
    resumeBtn.addEventListener("click", () => {resumeGame()});
  });
  
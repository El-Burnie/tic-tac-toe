const gameBoard = (function () {
    const board = [];

    function createCell () {
        let value = null;
        const getValue = () => value;
        const markX = () => value = "X";
        const markO = () => value = "O";
        return { getValue, markX, markO };
    };

    // Clear the board and fill it with new blank cell objects
    const initBoard = () => {
        board.splice(0);
        for (let i = 0; i < 3; i++) {
            const row = [];
            for(let j = 0; j < 3; j++) {
                row.push(createCell());
            }
            board.push(row);
        }
    };

    const markCell = (row, column, mark) => {
        switch (mark) {
            case "X":
                board[row][column].markX();
                break;
            case "O":
                board[row][column].markO();
        }
        
    };

    //checks all possible win conditions.  Returns true if a win condition is met
    const checkForWin = () => {
        for (let i = 0; i < 3; i++) {
            // check row
            if ((board[i][0].getValue() != null) && board[i][0].getValue() == board[i][1].getValue() && board[i][1].getValue() == board[i][2].getValue()) {
                return true;
            }
            // check column
            if ((board[0][i].getValue() != null) && board[0][i].getValue() == board[1][i].getValue() && board[1][i].getValue() == board[2][i].getValue()) {
                return true;
            }
        }
        //check diagonals
        if ((((board[0][0].getValue() != null) && board[0][0].getValue() == board[1][1].getValue()) && board[1][1].getValue() == board[2][2].getValue()) ||
            (((board[0][2].getValue() != null) && board[0][2].getValue() == board[1][1].getValue()) && board[1][1].getValue() == board[2][0].getValue())) {
                return true;
        }
        return false;
    };

    // returns the symbol in the specified cell, or null if there isn't one
    const valueAt = (row, col) => {
        return board[row][col].getValue();
    };

    // Returns the board state as a string to be printed to the console
    const toString = () => {
        let boardString = "";

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cellValue = board[i][j].getValue();
                boardString += (cellValue) ? `[${cellValue}]` : "[ ]";
            }
            boardString += "\n";
        }
        return boardString; 
    };

    return { initBoard, markCell, checkForWin, valueAt, toString };
})();

// Initializes and operates the game
const gameController = (function () {
    
    //constructor for player objects, which contain a name and "X" or "O" token
    function Player(playerName, playerToken) {
        this.name = playerName;
        this.token = playerToken;
    };

    const TOTAL_CELLS = 9;
    const Players = [];
    let gameOver = true;
    let turnCounter = 0;
    let activePlayer;

    // Initializes players and game board
    const newGame = () => {
        Players.splice(0, Players.length);
        Players.push(new Player(prompt("Input Player 1 Name", "Player 1"), "X"));
        Players.push(new Player(prompt("Input Player 2 Name", "Player 2"), "O"));
        gameBoard.initBoard();
        displayController.update();
        gameOver = false;
        turnCounter = 0;
        activePlayer = Players[0];
        displayController.prompt(`${activePlayer.name}'s turn`);
    };
        
    const playRound = (row, col) => {
        if (gameOver) {
            return false;
        }
        gameBoard.markCell(row, col, activePlayer.token);
        turnCounter++;
        displayController.update();
        console.log(gameBoard.toString());

        if (gameBoard.checkForWin()) {
            gameOver = true;
            displayController.prompt(`${activePlayer.name} Wins!`);

        } else if (turnCounter >= TOTAL_CELLS) {
            gameOver = true;
            displayController.prompt("It's a tie!");
        } else {
            // player 1 is index 0 and player 2 is at index 1 in Players array.
            // Incrementing the turnCounter will alternate the selected player.
            activePlayer = Players[turnCounter % 2];
            displayController.prompt(`${activePlayer.name}'s turn`);
        }
    }  

    return { newGame, playRound };
})();

// Updates the display on the webpage to reflect the game state in gameController
const displayController = (function () {
    
    // initialize display
    const promptBar = document.getElementById("prompt-bar");
    const displayBoard = [];
    let counter = 1;

    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            const cell = document.querySelector(`div.square:nth-child(${counter})`)
            cell.addEventListener("click", () => {
                if (!cell.classList.contains("invalid")) {
                    gameController.playRound(i, j);
                    cell.classList.add("invalid");
                }
            });
            row.push(cell);
            counter++;
        }
        displayBoard.push(row);
    };

    //initialize the new game button.
    const newGameButton = document.querySelector("#new-game-button");
    newGameButton.addEventListener("click", () => {
        clearDisplay();
        gameController.newGame();
    });

    const clearDisplay = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                displayBoard[i][j].classList.remove("invalid");
            }
        }
    };

    const update = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = displayBoard[i][j];
                cell.textContent = gameBoard.valueAt(i, j);
            }
        }
    };

    //sets the text above the game board as the input. Blank will clear the prompt bar.
    const prompt = (message) => {
        promptBar.textContent = message;
    }

    return { update, prompt };
})();
function createCell () {
    let value = null;
    const getValue = () => value;
    const markX = () => value = "X";
    const markO = () => value = "O";
    return { getValue, markX, markO };
};

const gameBoard = (function () {
    const board = [];

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

    return { initBoard, markCell, toString };
})();

// Tracks player names and prompts each player for input on their turn.
// Declares when the game has ended.
const gameController = (function () {
    const play = (playerOneName = "Player 1", playerTwoName = "Player 2") => {
        gameBoard.initBoard();
        let gameOver = false;
        let turnCounter = 0;
        while (!gameOver) {
            const activePlayer = (turnCounter % 2 === 0) ? "X" : "O";
            switch (activePlayer) {
                case "X":
                    console.log(`${playerOneName}'s turn.`);
                    break;
                case "O":
                    console.log(`${playerTwoName}'s turn.`);
            }
            const { row, col } = getPlayerInput();
            gameBoard.markCell(row, col, activePlayer);
            console.log(gameBoard.toString());
            turnCounter++;
            gameOver = (turnCounter >= 9);
        }
        console.log("Game Over!");
    };

    const getPlayerInput = () => {
        const row = +prompt("Select your row");
        const col = +prompt("Select your column")
        return { row, col }; 
    };

    return { play };
})();


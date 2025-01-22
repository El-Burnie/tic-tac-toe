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

    return { initBoard, markCell, checkForWin, toString };
})();

// Tracks player names and prompts each player for input on their turn.
// Declares when the game has ended.
const gameController = (function () {
    const play = (playerOneName = "Player 1", playerTwoName = "Player 2") => {
        gameBoard.initBoard();
        const TOTAL_SQUARES = 9;
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
            turnCounter++;
            console.log(gameBoard.toString());

            //checks for win condition. If there is none, checks if the last turn has been taken
            if (gameBoard.checkForWin()) {
                gameOver = true;
                console.log("Winner!");

            } else if (turnCounter >= TOTAL_SQUARES) {
                gameOver = true;
                console.log("It's a tie!");
            }
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


function createCell () {
    let value = null;
    const getValue = () => value;
    const markX = () => value = "X";
    const markO = () => value = "O";
    return { getValue, markX, markO };
};
/*
MODULE gameBoard
    INIT board to []
    FUNCTION initBoard
        SET board to []
        FOR three rows
            INIT row to []
            FOR three columns
                ADD cell() to row
            ENDFOR
            ADD row to board
        ENDFOR

    FUNCTION markCell (row, column, mark)
        CASE mark OF
            X: CALL board[row][column].markX()
            O: CALL board[row][column].markO()
        ENDCASE

    FUNCTION toString
        INIT boardString to ""
        FOR three rows
            FOR three columns
                ADD cell value to boardString
            ENDFOR
            ADD newline to boardString
        ENDFOR
        RETURN boardString
*/
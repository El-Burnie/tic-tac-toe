/*
FACTORY cell
    INIT value to null
    FUNCTION getValue
        RETURN value
    FUNCTION markX
        SET value to X
    FUNCTION markO
        SET value to O
    RETURN { getValue, markX, markO }

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
*/
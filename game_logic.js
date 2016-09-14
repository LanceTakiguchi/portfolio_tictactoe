/**
 Project Name: Tic-Tac-Toe
 File Name: game_logic.js
 Author: Lance Takiguchi, Collette Tamez, Dave Weizenegger
 Date: 09/14/2016 Time: 09:54
 Objective: Create a online game of TicTacToe
 Prompt: https://github.com/Learning-Fuze/c10_tictactoe/blob/master/README.md
 */
// ** GLOBAL VARIABLES
var player_1_turn = null; // ** A boolean variable that will tell if it is the first players turn, or if false, the second player's turn
var to_win_number_condition = null; //** A number variable that will tell many pieces in a column you need win
var coin_toss_winner = null; //** A number variable that tells which player one the coin toss, player 1 or player 2
var board_size = null; //** A number variable that holds how many columns and rows the game will have will have
var board_2d_array = null; //**An array that holds arrays (the columns) where each nested array holds row values

/**
 * Simulates a coin flip if given a true parameter. Whenever calls, returns the winner
 *@param {boolean} do_flip A optional parameter that if set to true, will simulate a coin flip
 *@return {number} 1 or 2 that tells which player won the flip
*/
function coin_toss(do_flip){
    if(do_flip === true){ //** Checks if you want to do a coin flip.
        coin_toss_winner = Math.floor(Math.random() * 2) + 1; //** Random coin flip
    }
    return coin_toss_winner; //** Returns what the coin_toss result was
}
/**
 * If asked, sets the number of pieces in a column needed to win. Always returns the number needed to win.
 * @param {number} set_number_to_win A number that if passed resets the global variable.
 * @return {number} Returns the number in a column needed to win.
 */
function win_condition(set_number_to_win){
    if(typeof set_number_to_win === "number"){ //** If set_number_to_win is not set to a number, typeof is undefined and does not set the global variable
        to_win_number_condition = set_number_to_win;
    }
    return to_win_number_condition;
}
/**
 * If asked, sets the number of columns/rows on the game board. Always returns what the board size is.
 * @param {number} set_board_size A number that sets the number of columns/rows the board will have.
 * @return {number} Returns the number of columns/rows are on the board.
 */
function what_board_size(set_board_size){
    if(typeof set_board_size === "number"){ //** If set_number_to_win is not set to a number, typeof is undefined and does not set the global variable
        board_size = set_board_size;
    }
    return board_size;
}
/**
 * Creates the board based on what the board_size is. Does so by editing the global variable board_2d_array
 * @param {number} array_size Tells how many columns/rows to create
 * @return {Object[]} Returns a global 2d array that has an outer array (column array) that has the column arrays with row arrays with the columns where the rows hold place-holding value.
 */
function create_board(array_size){
    var column_array = [];
    var row_array = [];
    for(var index  = 0; index < array_size; index++){ //** loop for the board_size.
        column_array.push([]); //** add in zeros as place holders.
    }
    for(var outer_index  = 0; outer_index < array_size; outer_index++){ //** outer loop
        for(var inner_index  = 0; inner_index < array_size; inner_index++) { //** inner loop
            column_array[outer_index].push(0); //** put in 0s into the rows; for each inner loop, make a 0.
        }
    }
    return column_array; //** returns a 2d array. column_array is an array that holds row_arrays that hold zeros.
}
/**
 * Checks to see if the address given is empty on the board.
 * @param {Object[]} board A 2d array that is the board whose space is being checked for occupation status
 * @param {number} column A number that tells what column to index into.
 * @param {number} row A number that tells what row to index into.
 * @return {boolean} Tells if a move was valid (true) or invalid (false).
 */
function valid_move(board, column, row){
    return board[column][row] === 0;
}
/**
 * Places a piece into the array.
 * @param {Object[]} board A 2d array that is the board to have a piece placed into
 * @param {number} player A number that says which player's piece to place into the 2d board array.
 * @param {number} column A number that indexes the column array; index for the outer array.
 * @param {number} row A number that indexes the row array; index for the inner array.
 * @return {Object[]} Returns the global 2d array with the updated piece placed into it.
 */
function set_piece(board, player, column, row){
    board[column][row] = player;
    return board;
}
/**
 * Checks in all 8 directions to see if the win_condition has been meet
 * @param {Object[]} board A 2d array that is the board to search for a winning streak
 * @param {number} win_condition A number that tells how many in a column in order to win
 * @return {number} 0 = No winner yet, 1 = player 1 has won, 2 = player 2 has won, -1 = a tie
 * Note: indexing north: column, decreasing row
 * Note: indexing north-east: increasing column, decreasing row
 * Note: indexing east: increasing column, row
 * Note: indexing south-east: increasing column, increasing row
 * Note: indexing south: column, increasing row
 * Note: indexing south-west: decreasing column, increasing row
 * Note: indexing west: decreasing column, row
 * Note: indexing north-west: decreasing column, decreasing row
 */
function check_for_win(board, win_condition){
    /**
     * Checks to see if the value in the selected board space is the placeholder, 0
     * @param outer column index
     * @param inner row index
     * @return {boolean}
     */
    function zero_test(outer, inner){
        return board[outer][inner] === 0;
    }

    /**
     * Checks to see if there is the winning amount of piece in a column below it.
     * @param player The current player's number that we are checking for
     * @param initial_column The starting column index of the spot we are starting this check from
     * @param initial_row The starting row index of the spot we are starting this check from
     * @return {boolean} Tells if there was a winning amount of pieces in a column or not
     */
    function check_south(player, initial_column, initial_row){
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_row < board.length; initial_row++){
            if(board[initial_column][initial_row] !== player){ //** If the spot we are looking at has a piece that is not the same as the player we care about
                return false;
            }
            count_correct++;
            if(count_correct === win_condition){ //** If the number of player pieces in a column is the same as needed to win
                return true;
            }
        }
        return false; //** If the index is now negative and therefore stopped searching
    }
    /**
     * Checks to see if there is the winning amount of piece in a row right it.
     * @param player The current player's number that we are checking for
     * @param initial_column The starting column index of the spot we are starting this check from
     * @param initial_row The starting row index of the spot we are starting this check from
     * @return {boolean} Tells if there was a winning amount of pieces in a column or not
     */
    function check_east(player, initial_column, initial_row){
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_column < board.length; initial_column++){
            if(board[initial_column][initial_row] !== player){ //** If the spot we are looking at has a piece that is not the same as the player we care about
                return false;
            }
            count_correct++;
            if(count_correct === win_condition){ //** If the number of player pieces in a column is the same as needed to win
                return true;
            }
        }
        return false; //** If the index is now negative and therefore stopped searching
    }
    /**
     * Checks to see if there is the winning amount of piece in a column below and row right it.
     * @param player The current player's number that we are checking for
     * @param initial_column The starting column index of the spot we are starting this check from
     * @param initial_row The starting row index of the spot we are starting this check from
     * @return {boolean} Tells if there was a winning amount of pieces in a column or not
     */
    function check_south_east(player, initial_column, initial_row){
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_row < board.length && initial_column < board.length; initial_row++, initial_column++){
            if(board[initial_column][initial_row] !== player){ //** If the spot we are looking at has a piece that is not the same as the player we care about
                return false;
            }
            count_correct++;
            if(count_correct === win_condition){ //** If the number of player pieces in a column is the same as needed to win
                return true;
            }
        }
        return false; //** If the index is now negative and therefore stopped searching
    }
    /**
     * Checks to see if there is the winning amount of piece in a column below and row left it.
     * @param player The current player's number that we are checking for
     * @param initial_column The starting column index of the spot we are starting this check from
     * @param initial_row The starting row index of the spot we are starting this check from
     * @return {boolean} Tells if there was a winning amount of pieces in a column or not
     */
    function check_south_west(player, initial_column, initial_row){
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_row < board.length && initial_column > 0; initial_row++, initial_column--){
            if(board[initial_column][initial_row] !== player){ //** If the spot we are looking at has a piece that is not the same as the player we care about
                return false;
            }
            count_correct++;
            if(count_correct === win_condition){ //** If the number of player pieces in a column is the same as needed to win
                return true;
            }
        }
        return false; //** If the index is now negative and therefore stopped searching
    }
    var player_number = null;
    //**Checking that for every player piece on the board, if it is part of the required amount in a column to win
    for(var outer_index = 0; outer_index < board.length; outer_index++){
        for(var inner_index = 0; inner_index < board[outer_index].length; inner_index++){
            if(!zero_test(outer_index, inner_index)){ //** If the current cell is not an place-holding 0, but actually a piece.
                player_number = board[outer_index][inner_index]; // ** Grabs which player we are currently checking for
                if(
                check_east(player_number, outer_index, inner_index) ||
                check_south(player_number, outer_index, inner_index) ||
                check_south_east(player_number, outer_index, inner_index) ||
                check_south_west(player_number, outer_index, inner_index)
            ){return player_number;} // ** Returns which player is winning, player 1 or 2
            }
        }
    }
    // ** Checking for a tie. Doing so by looking that the board no longer has place-holding 0s in any cell
    for(var outer_index = 0; outer_index < board.length; outer_index++){
        for(var inner_index = 0; inner_index < board[outer_index].length; inner_index++){
            if(zero_test(outer_index, inner_index)){ //** If the current cell is not an place-holding 0, but actually a piece.
               return 0; // ** Returning 0 means the game is not over yet
            }
        }
    }
    return -1; // ** If no one has one, and there is no more empty cells,
}

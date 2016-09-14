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
var to_win_number_condition = null; //** A number variable that will tell many pieces in a row you need win
var coin_toss_winner = null; //** A number variable that tells which player one the coin toss, player 1 or player 2
var board_size = null; //** A number variable that holds how many rows and columns the game will have will have
var board_2d_array = null; //**An array that holds arrays (the rows) where each nested array holds column values

/**
 * Simulates a coin flip if given a true parameter. Whenever calls, returns the winner
 *@param {bool} do_flip A optional parameter that if set to true, will simulate a coin flip
 *@return {number} 1 or 2 that tells which player won the flip
*/
function coin_toss(do_flip){
    if(do_flip === true){ //** Checks if you want to do a coin flip.
        coin_toss_winner = Math.floor(Math.random() * 2) + 1; //** Random coin flip
    }
    return coin_toss_winner; //** Returns what the coin_toss result was
}
/**
 * If asked, sets the number of pieces in a row needed to win. Always returns the number needed to win.
 * @param {number} set_number_to_win A number that if passed resets the global variable.
 * @return {number} Returns the number in a row needed to win.
 */
function win_condition(set_number_to_win){
    if(typeof set_number_to_win === "number"){ //** If set_number_to_win is not set to a number, typeof is undefined and does not set the global variable
        to_win_number_condition = set_number_to_win;
    }
    return to_win_number_condition;
}
/**
 * If asked, sets the number of rows/columns on the game board. Always returns what the board size is.
 * @param {number} set_board_size A number that sets the number of rows/columns the board will have.
 * @return {number} Returns the number of rows/columns are on the board.
 */
function what_board_size(set_board_size){
    if(typeof set_board_size === "number"){ //** If set_number_to_win is not set to a number, typeof is undefined and does not set the global variable
        board_size = set_board_size;
    }
    return board_size;
}
/**
 * Creates the board based on what the board_size is. Does so by editing the global variable board_2d_array
 * @param {number} array_size Tells how many rows/columns to create
 * @return {array} Returns a global 2d array that has an outer array (row array) that has the row arrays with column arrays with the rows where the columns hold place-holding value.
 */
function create_board(array_size){
    var row_array = [];
    var column_array = [];
    for(var index  = 0; index < array_size; index++){ //** loop for the board_size.
        row_array.push([]); //** add in zeros as place holders.
    }
    for(var outer_index  = 0; outer_index < array_size; outer_index++){ //** outer loop
        for(var inner_index  = 0; inner_index < array_size; inner_index++) { //** inner loop
            row_array[outer_index].push(0); //** put in 0s into the columns; for each inner loop, make a 0.
        }
    }
    return row_array; //** returns a 2d array. row_array is an array that holds column_arrays that hold zeros.
}
/**
 * Places a piece into the array.
 * @param {number} player A number that says which player's piece to place into the 2d board array.
 * @param {number} row A number that indexes the row array; index for the outer array.
 * @param {number} column A number that indexes the column array; index for the inner array.
 * @return {array} Returns the global 2d array with the updated piece placed into it.
 */
function set_piece(player, row, column){

}
/**
 * Checks in all 8 directions to see if the win_condition has been meet
 * @return {number} 0 = No winner yet, 1 = player 1 has won, 2 = player 2 has won, -1 = a tie
 */
function check_for_win(win_condition){

}

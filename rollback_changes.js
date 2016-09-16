/**
 Project Name: Tic-Tac-Toe
 File Name: game_logic.js
 Author: Lance Takiguchi, Collette Tamez, Dave Weizenegger
 Date: 09/14/2016 Time: 09:54
 Objective: Create a online game of TicTacToe
 Prompt: https://github.com/Learning-Fuze/c10_tictactoe/blob/master/README.md
 */

    // set the database reference
var firebaseRef = firebase;
$(document).ready(function () {

// Initialize Firebase
    var config = {
        apiKey: "AIzaSyD73W8ic8oB_tuyCY7_E_sSWRBFv1qkBcQ",
        authDomain: "c10tictactoe.firebaseapp.com",
        databaseURL: "https://c10tictactoe.firebaseio.com",
        storageBucket: "c10tictactoe.appspot.com",
        messagingSenderId: "644619913847"
    };
    firebase.initializeApp(config);

    // check for anonymous login issues
    firebaseRef.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

});

var rowStartParam = "<tr>";
var rowEndParam = "</tr>";
var tdStartEndParam = "<td></td>";

function makeBoard (boardSize) {
    $("#board > tbody").html('');
    var cell_size_percent = 100 / boardSize + '%';
    for (var i = 0; i < boardSize; i++) {
        var boardRow = $("<tr>");
        for (var j = 0; j < boardSize; j++) {
            var boardCell = $("<td>", {
                id: 'cell_' + i + '_' + j,
                boardCol: j,
                boardRow: i,
                class: 'board_' + boardSize
            }).css({
                height: cell_size_percent,
                width: cell_size_percent
            });
            boardCell.on("click", function () {
                var cellClicked = $(this).attr('boardCol') + ',' + $(this).attr('boardRow');
                var playingField = firebaseRef.database().ref('playingField');


                var num = cellClicked.indexOf(",");
                var col = cellClicked.substring(0, num);
                var row = cellClicked.substring(num + 1);

                playingField.set({
                    Column: col,
                    Row: row
                });
                playingField.once('value').then(function (pieceLocation) {
                    var game = pieceLocation.val();
                });
            });
            boardRow.append(boardCell);
        }
        $("#board > tbody").append(boardRow);
        getSize(boardSize);
        ///setup_game(boardSize);
    }
    applyTableClickHandlers();
}
/////////////////////////////////////////////////////////////////////
////GLOBAL VARIABLES
var hasPlayer = false;
var playerPiece = null;
var liveBoard = null;
///APPLY CLICK HANDLERS ON LOAD
$(document).ready(function () {
    applyClickHandlers();
});
///FUNCTION TO APPLY CLICK HANDLERS TO DOM ELEMENTS
function applyClickHandlers() {
    $("button").click(selectedButton);
    $("#co1").click(selectGameTiles);
    $("#co2").click(selectGameTiles);
    $("#co3").click(selectGameTiles);
    $("#co4").click(selectGameTiles);
    $("#startGame").click(startTheGame);
    $(".newGame").click(startNewGame);
}
////SHOW USER A BUTTON HAS BEEN PRESSED
function selectedButton() {
    $(this).toggleClass("selected");
}
////FUNCTION TO DISPLAY "CO SELECT" ON GAME BOARD
function selectGameTiles() {
    if(hasPlayer){
        $(this).appendTo("#team2_display");
    } else {
        $(this).appendTo("#team1_display");
    }
    hasPlayer = true;
}
////FUNCTION TO START THE GAME
function startTheGame() {
    $("#setUpMenu").addClass("hide");
    $("#gameplay_area").toggleClass("hide");
    if (player_turn === 1){
        $("#team2_display").addClass("turn");
    } else{
        $("#team1_display").addClass("turn");
    }
}
///APPLY CLICK HANDLERS TO TABLE
function applyTableClickHandlers() {
    $("td").click(placePiece);
}
////FUNCTION TO PLACE PIECE ON BOARD
function placePiece() {
    if (player_turn === 1) {
        playerPiece = $("<img>").attr({
            src: "assets/CO1tile.png"
        });
        $("#team2_display").toggleClass("turn");
        $("#team1_display").toggleClass("turn");
    } else{
        playerPiece = $("<img>").attr({
            src: "assets/CO3tile.png"
        });
        $("#team2_display").toggleClass("turn");
        $("#team1_display").toggleClass("turn");
    }
    $(this).append(playerPiece);
    var row = $(this).attr("boardrow");
    var col = $(this).attr("boardcol");
    update_game(liveBoard, col, row);
}
///FUNCTION TO START A NEW GAME
function startNewGame(){
    resetVariable();
    $(".newGame").toggleClass("hide");
    $("#gameplay_area").toggleClass("hide");
    $("#setUpMenu").toggleClass("hide");
    $("button").removeClass("selected");
    $("#team1_display").removeClass("turn").find("div").appendTo("#coSelect");
    $("#team2_display").removeClass("turn").find("div").appendTo("#coSelect");
    $(".won").addClass("hide");
}
/////
function resetVariable(){
    hasPlayer = false;
    player_turn = null;
    playerPiece = null;
    to_win_number_condition = null;
    coin_toss_winner = null;
    board_size = null;
    board_2d_array = null;
    liveBoard = null;
}
//////
function getSize(size) {
    liveBoard =  setup_game(size);
}
/////////////////////////////////////////
/**
 Project Name: Tic-Tac-Toe
 File Name: game_logic.js
 Author: Lance Takiguchi, Collette Tamez, Dave Weizenegger
 Date: 09/14/2016 Time: 09:54
 Objective: Create a online game of TicTacToe
 Prompt: https://github.com/Learning-Fuze/c10_tictactoe/blob/master/README.md
 */
// ** GLOBAL VARIABLES
var player_turn = null; // ** A number variable that will tell if it is the first players turn, or if it is the second player's turn
var to_win_number_condition = null; //** A number variable that will tell many pieces in a column you need win
var coin_toss_winner = null; //** A number variable that tells which player one the coin toss, player 1 or player 2
var board_size = null; //** A number variable that holds how many columns and rows the game will have will have
var board_2d_array = null; //**An array that holds arrays (the columns) where each nested array holds row values
// ** FUNCTIONS
/**
 * Sets up the game, given starting conditions
 * @param {number} chosen_size What size is the board (3x3, 9x9, 20x20)
 * @return {Object[]} The board empty that the game will start on
 */
function setup_game(chosen_size){
    player_turn = coin_toss(true); //** Find out what who the starting player is with a coin_toss.
    var size = what_board_size(chosen_size); // ** Save locally and globally what the board size is.
    win_condition(random_condition(size)); //** Save as a global variable how many pieces in a row is needed to win.
    board_2d_array = create_board(size); // ** Save globally the board to be played on.
    return board_2d_array; // ** Return the new empty board that was set to choose_size.
}
/**
 * Updates the game. First sees if the inputted move is valid, or else it rejects the move. It then updates the board and checks if there is a winner yet. Returns all the processed information
 * @param {Object[]} board The current game board.
 * @param {number} column The column inputted by a player.
 * @param {number} row The row inputted by a player.
 * @return {{valid: boolean, column: number, row: number, game_state: number}} An object that tells if the move was valid, number of columns, number of rows, state of the game (if there is a winner, tie, or if the game is ongoing)
 */
function update_game(board, column, row){
    var update = {valid: null, column: column, row: row, game_state: 0};
    update.valid = valid_move(board, column, row); // ** check to see if the move is legal
    if(!update.valid){ // ** If the move was invalid, return the update as is as when it sees valid as false, it will ignore the move
        return update; //** NOTE: ignore type error, it will be a boolean
    }
    set_piece(board, player_turn, column, row); // ** Put the piece onto the board
    update.game_state = check_for_win(board, to_win_number_condition);
    if (update.game_state > 0){ //** Checks if a player has won
        if (update.game_state === 1){
            $("#team1_display").removeClass("turn");
            $("#team2_display").addClass("turn");
            $(".newGame").toggleClass("hide");
            $("<p>").text("YOU WON!").appendTo("aside").addClass("won");
        } else{
            $("#team1_display").addClass("turn");
            $("#team2_display").removeClass("turn");
            $(".newGame").toggleClass("hide");
            $("<p>").text("YOU WON!").appendTo("aside").addClass("won");
        }
    } else if(update.game_state === -1){ //** Checks if there is a draw
        $("#team1_display").removeClass("turn");
        $("#team2_display").removeClass("turn");
        $(".newGame").toggleClass("hide");
        $("<p>").text("DRAW!!!").appendTo("aside").addClass("won");
    }
    turn_switch();
    return update; //** NOTE: ignore type error, it will be a boolean
}
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
 * Randomly generates a win condition
 * @param {number} board_size
 * @return {number} a random number between 3 and the board_size
 */
function random_condition(board_size){
    var high_bound = board_size - 3; // ** 3 is the lowest value it could possibly be
    return Math.floor(Math.random() * (high_bound + 1) + 3);
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
 * Changes the global player_turn variable into the opposite value
 * @return {number} Returns indicate's current player's turn
 */
function turn_switch(){
    if(player_turn == 1){
        player_turn = 2;
    }else{
        player_turn = 1;
    }
    return player_turn;
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
 * Note: indexing east: increasing column, row
 * Note: indexing south-east: increasing column, increasing row
 * Note: indexing south: column, increasing row
 * Note: indexing south-west: decreasing column, increasing row
 */
function check_for_win(board, win_condition){
    /**
     * Checks to see if the value in the selected cell is the placeholder, 0.
     * @param {number} outer column index.
     * @param {number} inner row index.
     * @return {boolean} Tells if the value cell was zero (true) or not (false)
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
        if(!(initial_row <= board_size - win_condition)) { //** if the starting column will eventually be checking out of bounds
            return false;
        }
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_row < board_size; initial_row++){
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
        if(!(initial_column <= board_size - win_condition)) { //** if the starting column will eventually be checking out of bounds
            return false;
        }
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_column < board_size; initial_column++){
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
        if(!(initial_column <= board_size - win_condition) && !(initial_row <= board_size - win_condition)) { //** if the starting column will eventually be checking out of bounds
            return false;
        }
        var count_correct = 0; // ** Holds how many in a column are the same as the player number being checked for
        for(;initial_row < board_size && initial_column < board_size; initial_row++, initial_column++){
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
        if(!(initial_column >= win_condition - 1) && !(initial_row <= board_size - win_condition)) { // ** Checking that the cell we are checking is west enough that we aren't checking for the win condition off the board
            return false;
        }// ** The column is too west relative to the win condition to ever westerly be true.
        for(;initial_row < board_size && initial_column >= 0; initial_row++, initial_column--){
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
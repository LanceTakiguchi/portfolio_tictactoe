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
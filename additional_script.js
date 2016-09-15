//TODO: FUNCTION TO RESET VARIABLE
//TODO: FUNCTION TO APPLY/TOGGLE CLASSES?
var hasPlayer = false;
var playerTurn = 1;
var playerPiece;

$(document).ready(function () {
    applyClickHandlers();
});

function applyClickHandlers() {
    $("button").click(selectedButton);
    $("#co1").click(selectGameTiles);
    $("#co2").click(selectGameTiles);
    $("#co3").click(selectGameTiles);
    $("#co4").click(selectGameTiles);
    $("#startGame").click(startTheGame);
    $("#newGame").click(startNewGame);
}

function selectedButton() {

    $(this).addClass("disabledButton");


    $(this).toggleClass("selected");
}

function selectGameTiles() {
    if(hasPlayer){
        $(this).appendTo("#team2_display");
    } else {
        $(this).appendTo("#team1_display");
    }
    hasPlayer = true;
}
function startTheGame() {
    $("#setUpMenu").addClass("hide");
    $("#gameplay_area").toggleClass("hide");
}
function applyTableClickHandlers() {
    $("td").click(placePiece);
}
function placePiece() {
    if (playerTurn === 1) {
        playerPiece = $("<img>").attr({
            src: "assets/CO1tile.png"
        });
        playerTurn = 2;
        $("#team2_display").toggleClass("turn");
        $("#team1_display").toggleClass("turn");
    } else{
        playerPiece = $("<img>").attr({
            src: "assets/CO2tile.png"
        });
        playerTurn = 1;
        $("#team2_display").toggleClass("turn");
        $("#team1_display").toggleClass("turn");
    }
    $(this).append(playerPiece);
}

function startNewGame(){
    hasPlayer = false;
    playerTurn = 1;
    playerPiece;
    $("#gameplay_area").toggleClass("hide");
    $("#setUpMenu").toggleClass("hide");
    $("#gameOver").toggleClass("hide");
    $("button").removeClass("selected");
    $("#team1_display").find("div").appendTo("#coSelect");
    $("#team2_display").find("div").appendTo("#coSelect");
}

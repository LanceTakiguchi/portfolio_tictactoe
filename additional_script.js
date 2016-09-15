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
}

function selectedButton() {
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
    } else{
        playerPiece = $("<img>").attr({
            src: "assets/CO2tile.png"
        });
        playerTurn = 1;
    }
    $(this).append(playerPiece);
}

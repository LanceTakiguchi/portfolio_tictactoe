//TODO: FUNCTION TO RESET VARIABLE
//TODO: FUNCTION TO APPLY/TOGGLE CLASSES?
var hasPlayer = false;
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
    $("td").click(placePiece);
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

function placePiece() {
    $(this).append();
}


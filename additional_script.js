//TODO: FUNCTION TO RESET VARIABLE
//TODO: FUNCTION TO APPLY/TOGGLE CLASSES?

$(document).ready(function () {
    applyClickHandlers();
});

function applyClickHandlers() {
    $("button").click(selectedButton);
}

function selectedButton() {
    $(this).addClass("disabledButton");
}
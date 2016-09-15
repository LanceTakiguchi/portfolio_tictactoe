/**
 * Created by Weizguy on 9/14/2016.
 */
var rowStartParam = "<tr>";
var rowEndParam = "</tr>";
var tdStartEndParam = "<td></td>"

function makeBoard (boardSize) {
/*dave*/
    var boardRow = rowStartParam;
    for (var i = 0; i < boardSize; i++) {
        boardRow += tdStartEndParam;
    }
    boardRow += rowEndParam;
    for (var j = 0; j < boardSize; j++) {
        $("#board > tbody").append(boardRow);
    }
/*end dave*/
/*dan*/

/*end dan*/
    switch(boardSize) {
        case 3:
            $('td').removeClass('nine').removeClass('twenty').addClass('three');
            break;
        case 9:
            $('td').removeClass('three').removeClass('twenty').addClass('nine');
            break;
        case 20:
            $('td').removeClass('three').removeClass('nine').addClass('twenty');
            break;
    }
}



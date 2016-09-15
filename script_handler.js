/**
 * Created by Weizguy on 9/14/2016.
 */
var rowStartParam = "<tr>";
var rowEndParam = "</tr>";
var tdStartEndParam = "<td></td>"

function makeBoard (boardSize) {
    /*dave*/
    // var boardRow = rowStartParam;
    // for (var i = 0; i < boardSize; i++) {
    //     boardRow += tdStartEndParam;
    // }
    // boardRow += rowEndParam;
    // for (var j = 0; j < boardSize; j++) {
    //     $("#board > tbody").append(boardRow);
    // }
    /*end dave*/
    /*dan*/


    $("#board > tbody").html('');
    var cell_size_percent = 100 / boardSize + '%';
    for (var i = 0; i < boardSize; i++) {
        var boardRow = $("<tr>");
        for (var j = 0; j < boardSize; j++) {
            var boardCell = $("<td>", {
                id: 'cell_' + i + '_' + j,
                class: 'board_'+boardSize
            }).css({
                height: cell_size_percent,
                width: cell_size_percent
            });
            boardRow.append(boardCell);
        }
        $("#board > tbody").append(boardRow);
    }

    /*end dan*/


}

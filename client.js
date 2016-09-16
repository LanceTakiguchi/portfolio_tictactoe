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
var game = null;
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

                var num = cellClicked.indexOf(",");
                var col = cellClicked.substring(0, num);
                var row = cellClicked.substring(num + 1);


            });
            boardRow.append(boardCell);
        }
        $("#board > tbody").append(boardRow);
        getSize(boardSize);
        ///setup_game(boardSize);
    }
    applyTableClickHandlers();
}

var db;
$(document).ready(function(){


    db = firebaseRef.database().ref('playingField');
    db.on('value', update_game_board);


    playingField = firebaseRef.database().ref('playingField');
    playingField.on('value', update_game_board);

});
/**
 Project Name: Tic-Tac-Toe
 File Name: game_logic.js
 Author: Lance Takiguchi, Collette Tamez, Dave Weizenegger
 Date: 09/14/2016 Time: 09:54
 Objective: Create a online game of TicTacToe
 Prompt: https://github.com/Learning-Fuze/c10_tictactoe/blob/master/README.md
 */
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


    // set the database reference
    var firebaseRef = firebase;

    // check for anonymous login issues
    firebaseRef.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    var playingField = firebaseRef.database().ref('playingField');

    playingField.set({
        // enter the array here
        //...
        //...
        //...
    });

    playingField.on('value', function (snapshot) {
        // set variable to show here?
    });


    //Just some tests below
    // var testExample = firebaseRef.database().ref('somewhere/');
    // testExample.on("value", function (snapshot) {
    //     console.log(snapshot.val());
    // });
    //
    // $('#one').click(function () {
    //     firebaseRef.database().ref("somewhere").set({
    //         Player1: "X",
    //         Player2: ""
    //     });
    // });
    //
    // $('#two').click(function () {
    //     firebaseRef.database().ref("somewhere").set({
    //         Player1: "X",
    //         Player2: "O"
    //     });
    // });




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
                boardCol: i,
                boardRow: j,
                class: 'board_' + boardSize
            }).css({
                height: cell_size_percent,
                width: cell_size_percent
            });
            boardCell.on("click", function () {
                console.log("click", $(this).attr('boardCol') + ',' + $(this).attr('boardRow'));
                var cellClicked = $(this).attr('boardCol') + ',' + $(this).attr('boardRow');

                var playingField = firebase.database().ref('playingField');

                playingField.set({
                    Player1: cellClicked,
                    Player2: ""
                });


            });
            boardRow.append(boardCell);
        }
        $("#board > tbody").append(boardRow);
        setup_game(boardSize);
    }
    applyTableClickHandlers();
}

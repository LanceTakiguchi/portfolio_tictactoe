/**
 * Created by Weizguy on 9/14/2016.
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




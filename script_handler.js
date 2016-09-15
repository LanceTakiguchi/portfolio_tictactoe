/**
 * Created by Weizguy on 9/14/2016.
 */

function handleBtnClick(btnId){
    switch (btnId) {
        case ('3x3'):
            create_board(3);
            console.log("3x3 board created");
            break;
        case ('9x9'):
            create_board(9);
            console.log("9x9 board created");
            break;
        case ('20x20'):
            create_board(20);
            console.log("20x20 board created");
            break;

    }
}
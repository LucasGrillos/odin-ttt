const player = (m, n) => {
    let mark = m;
    let name = n;
    let getMark = () => mark;
    let getName = () => name;

    return { getMark, getName };
};

const Gameboard = (() => {
    let gameArray = Array(9).fill('');
    const getBoard = () => gameArray;

    return { getBoard };
})();


const Gameplay = (() => {
    let player1 = player('x', 'Player 1');
    let player2 = player('o', 'Player 2');
    let currentPlayer = player1;

})();

const DisplayController = (() => {

    const makeVisible = (mark, index) => {
        document.querySelector(`#tile${index}`).querySelector(`.${mark}-mark`).style.visibility = 'visible';
        // finds the tile based on index, then finds the mark to fill based on mark passed, then sets visibility to 0
    }

    const renderBoard = () => {
        let board = Gameboard.getBoard();
        for (var i=0; i<board.length; i++) {
            if (board[i]) {
                makeVisible(board[i], i);
            }
        }
    };

    const addTileListeners = () => {
        console.log(document.querySelector('.gameboard').children);
    }

    return { renderBoard , addTileListeners };
})();
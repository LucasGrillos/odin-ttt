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

const displayController = (() => {

})();
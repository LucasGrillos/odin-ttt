const player = (m, n) => {
    let mark = m;
    let name = n;
    let getMark = () => mark;
    let getName = () => name;

    return {
        getMark,
        getName
    }
}

const Gameboard = (() => {
    let gameArray = Array(9).fill('');

    const getBoard = () => gameArray;

    return {
        getBoard
    }
})();

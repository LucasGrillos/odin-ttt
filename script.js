const Gameboard = (() => {
    let gameArray = Array(9).fill('');

    const getBoard = () => {
        return gameArray;
    }

    return {
        getBoard
    }
})();
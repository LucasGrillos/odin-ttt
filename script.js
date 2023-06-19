const Gameboard = (() => {
    let gameArray = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]

    const getGameboard = () => {
        return gameArray;
    }

    return {
        getGameboard
    }
})();
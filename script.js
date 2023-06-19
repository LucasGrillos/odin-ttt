const player = (m, n) => {
    let mark = m;
    let name = n;

    const getMark = () => mark;
    const getName = () => name;

    return { getMark, getName };
};

const Gameboard = (() => {
    let gameArray = Array(9).fill('');
    
    const getBoard = () => gameArray;
    const markBoard = (tile, mark) => {
        gameArray[tile] = mark;
    }

    return { getBoard, markBoard };
})();


const Gameplay = (() => {
    let player1 = player('x', 'Player 1');
    let player2 = player('o', 'Player 2');
    let currentPlayer = player1;

    const switchPlayers = () => {
        currentPlayer = (currentPlayer.getName() == player1.getName() ? player2 : player1)
    };

    const playerTurn = (tile) => {
        let board = Gameboard.getBoard()
        if (!board[tile]) {
            Gameboard.markBoard(tile, currentPlayer.getMark());
        }
        switchPlayers();
        DisplayController.renderBoard();
        
    };

    return { playerTurn };
})();

const DisplayController = (() => {

    let tiles = Array.from(document.querySelector('.gameboard').children);

    const makeVisible = (mark, index) => {
        document.querySelector(`#tile${index}`).querySelector(`.${mark}-mark`).style.visibility = 'visible';
        // finds the tile based on index, then finds the mark to fill based on mark passed, then sets visibility to 0
    }

    const tileListener = (event) => {
        Gameplay.playerTurn(event.target.dataset.tile) 
        // dataset.tile points to the data-tile attribute
    };

    const renderBoard = () => {
        let board = Gameboard.getBoard();
        for (var i=0; i<board.length; i++) {
            if (board[i]) {
                makeVisible(board[i], i);
            }
        }
    };

    const removeTileListeners = () => {
        tiles.forEach(tile => {
            tile.removeEventListener("click", tileListener)
        })
    }

    const addTileListeners = () => {
        tiles.forEach(tile => {
            tile.addEventListener("click", tileListener);
        });
    };

    return { renderBoard , addTileListeners , removeTileListeners};
})();
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
    const markBoard = (tileNumber, mark) => {
        gameArray[tileNumber] = mark;
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

    const CheckWin = () => {
        let board = Gameboard.getBoard();
    }

    const playerTurn = (event) => {
        if(!event.target.id) { // checks if the mark itself was clicked on -- the mark itself has no id
            DisplayController.flashTileRed(Number(event.target.parentNode.dataset.tile)) // finds the parent tile number and sends it to flashTileRed  
        }

        else {
            console.log(event.target.id);
            tileNumber = event.target.dataset.tile; // dataset.tile points to the data-tile attribute
            let board = Gameboard.getBoard();
            if (!board[tileNumber]) {
                Gameboard.markBoard(tileNumber, currentPlayer.getMark());
                DisplayController.renderBoard();
                CheckWin();
            }
            else {
                DisplayController.flashTileRed(tileNumber)
            }
        }
    };

    return { playerTurn };
})();

const DisplayController = (() => {
    const tiles = Array.from(document.querySelector('.gameboard').children);

    const makeVisible = (mark, index) => {
        document.querySelector(`#tile${index}`).querySelector(`.${mark}-mark`).style.visibility = 'visible';
        // finds the tile based on index, then finds the mark to fill based on mark passed, then sets visibility to 0
    };

    const flashTileRed = (tileNumber) => {
        let tile = document.querySelector(`#tile${tileNumber}`);
        tile.style.animation = 'tile-flash-red .2s ease-in-out';
        setTimeout(() => {
            tile.style.animation = '';
        }, 200)
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
            tile.removeEventListener("click", Gameplay.playerTurn)
        })
    };

    const addTileListeners = () => {
        tiles.forEach(tile => {
            tile.addEventListener("click", Gameplay.playerTurn);
        });
    };

    return { renderBoard , addTileListeners , removeTileListeners, flashTileRed};
})();
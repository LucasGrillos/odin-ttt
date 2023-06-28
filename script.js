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

    const getMarksIndex = (mark) => {
        let marksIndex = [];
        for (var i=0;i<gameArray.length;i++) {
            if (mark==gameArray[i]) {
                marksIndex.push(i);
            }
        }
        return(marksIndex);

        // finds the indices of the indicated players mark, returning it to checkWin() for comparison
    }

    return { getBoard, markBoard , getMarksIndex };
})();


const Gameplay = (() => {
    let player1 = player('x', 'Player 1');
    let player2 = player('o', 'Player 2');
    let currentPlayer = player1;
    const winConditions = [
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6]
    ];

    const win = () => {
        
    }

    const switchPlayers = () => {
        currentPlayer = (currentPlayer.getName() == player1.getName() ? player2 : player1);
    };

    const CheckWin = () => {
        let marksIndex = Gameboard.getMarksIndex(currentPlayer.getMark());
        let win = winConditions.filter(condition => {
            if (condition.every(index => { return marksIndex.includes(index) }) ) {
                return condition;
            }
            // runs through each win condition and saves if each index is found in the indexes of all of the marks 
        });
        
        if (!win.length) {
            switchPlayers();
        }
    };

    const playerTurn = (event) => {
        if(!event.target.id) { // checks if prevously filled mark itself was clicked on -- the mark itself has no id
            DisplayController.flashTileRed(Number(event.target.parentNode.dataset.tile)) // finds the parent tile number and sends it to flashTileRed  
        }
        else { // 
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
function Gameboard(){
    const board =[];
    const rows =3;
    const columns=3;

    for(let i=0;i<rows;i++){
        board[i] = [];
        for(let j=0;j<columns;j++){
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const placeMarker = (row,column,player) =>{
        board[row][column].addMarker(player);
    }

    const getCurrentBoard = () =>{
        const boardWithCells = board.map( (row)=>
             row.map( cell => cell.getValue() ) );
        return boardWithCells;
    }

    const printBoard= () =>{
        console.log(getCurrentBoard());
    }

    return {getBoard, placeMarker,getCurrentBoard, printBoard};
}

function Cell(){
    let value = "";

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addMarker,getValue};
}

function Player(name,marker){
    let playerName = name;
    const getPlayerName = () =>playerName;
    const setPlayerName = (newName) => {playerName = newName;};

    return {getPlayerName,setPlayerName,marker};    
}

function GameController(){
    const board = Gameboard();
    board.getBoard();
    
    const players = [
        new Player("Player 1","X"),
        new Player("Player 2","O")
    ];

    let activePlayer = players[0];
    let winner = null;
    let isGameOver = null;
    
    const switchPlayerTurn = ()=> {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getAllPlayers= () => players;
    console.log(getAllPlayers());

    const getActivePlayer = () => activePlayer;
    const getWinner = () => winner;
    const isGameEnded = () => isGameOver;

    const printNewRound = ()=>{
        board.printBoard();
        console.log(`${getActivePlayer().getPlayerName}'s turn.`);
    };

    const resetGame = () => {
        board.getBoard().forEach(row => row.forEach(cell => cell.addMarker("")));
        activePlayer = players[0];
        winner = null;
        isGameOver = null;
    }

    const playTurn = (row,column) => {
        console.log(`Placing ${getActivePlayer().getPlayerName}'s symbol into row ${row} column ${column}...`);
        board.placeMarker(row,column,getActivePlayer().marker);

        /* Check board for a winning condition*/
        const winningConditions = [
            //Horizontal
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            //Vertical
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            //Diagonal
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]],
        ];

        const checkForWinner = (board)=>{
            for(let condition of winningConditions){
                const [a,b,c] = condition;
                if( board[a[0]][a[1]] !== "" && 
                    (board[a[0]][a[1]] === board[b[0]][b[1]]) &&
                    (board[a[0]][a[1]] === board[c[0]][c[1]]) ){
                    return true;
                }
            }
            return false;
        }

        if (checkForWinner(board.getCurrentBoard()) ===true){
            winner = getActivePlayer().getPlayerName();
            isGameOver=true;
            console.log(`The Winner is ${getActivePlayer().getPlayerName()}!`);
        } else {
            switchPlayerTurn();
            printNewRound();
        }

    };

    return { getActivePlayer, getAllPlayers, playTurn, resetGame, getWinner, isGameEnded, getBoard:board.getBoard};
}

function displayController(){
    const game = GameController();
    
    const container = document.querySelector("#container");
    const boardDiv = document.querySelector("#board");
    const turnHeader = document.querySelector("#turn");
    const newGameBtn = document.querySelector("#restart-btn");

    const player1Header = document.querySelector("#player1-name");
    const player2Header = document.querySelector("#player2-name");

    const p1_nameBtn = document.querySelector("#player-1-change");
    const p2_nameBtn = document.querySelector("#player-2-change");

    const player1Form = document.querySelector("#name-form-1");
    const player2Form = document.querySelector("#name-form-2");

    const player1NameInput = document.querySelector("#player-name-1");
    const player2NameInput = document.querySelector("#player-name-2");
    const cancel_name_change1_btn = document.querySelectorAll("#cancel-name-change1");
    const cancel_name_change2_btn = document.querySelectorAll("#cancel-name-change2");

    const updateDisplay = () => {
        const board = game.getBoard();
        const winner  = game.getWinner();
        const activePlayer = game.getActivePlayer();
    


        board.forEach((row, rowIndex) => {
            row.forEach((cell , colIndex) => {
              let cellBtn = boardDiv.querySelector(`[data-row="${rowIndex}"][data-column="${colIndex}"]`);
            
              if(!cellBtn){
                cellBtn = document.createElement("button");
                cellBtn.classList.add("cell");
                cellBtn.dataset.column = colIndex;
                cellBtn.dataset.row = rowIndex;
                boardDiv.appendChild(cellBtn);
              }
              cellBtn.textContent = cell.getValue();

            });
          });

        if(!winner){
            turnHeader.textContent = `It's ${activePlayer.getPlayerName()}'s turn...`;
        } else{
            turnHeader.textContent = `${winner} Wins!`;
            return;
        }
    };
    
    function clickHandlerBoard(e){
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if(!selectedColumn && !selectedRow) return;
        if(game.isGameEnded()) return;
        
        game.playTurn(parseInt(selectedRow),parseInt(selectedColumn));
        updateDisplay();
    }

    boardDiv.addEventListener("click",clickHandlerBoard);

    const updatePlayerName = (playerIndex, newName) => {
        if(playerIndex ===0){
            game.getAllPlayers()[playerIndex].setPlayerName(newName);
            player1Header.textContent = newName;
        } else {
            game.getAllPlayers()[playerIndex].setPlayerName(newName);
            player2Header.textContent = newName;
        }
        updateDisplay();
    }

    player1Form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const newName = player1NameInput.value;
        updatePlayerName(0,newName);
        player1Form.style.display="none";
    });

    player2Form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const newName = player2NameInput.value;
        updatePlayerName(1,newName);
        player2Form.style.display="none";
    });


    p1_nameBtn.addEventListener("click",() =>{
        player1Form.style.display="block";
    });

    p2_nameBtn.addEventListener("click",() =>{
        player2Form.style.display="block";
    });
/*
    cancel_name_change1_btn.addEventListener("click", () =>{
        player1Form.style.display="none";
    });

    cancel_name_change2_btn.addEventListener("click", () =>{
        player2Form.style.display="none";
    });
*/
    function newGame(){
        game.resetGame();
        updateDisplay();
    }
    newGameBtn.addEventListener("click",newGame);

    updateDisplay();
}

displayController();

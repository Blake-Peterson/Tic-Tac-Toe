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
    return {name,marker};    
}

function GameController(){
    const board = Gameboard();
    board.getBoard();
    
    const players = [
        new Player("Player 1","X"),
        new Player("Player 2","O")
    ];

    let activePlayer = players[0];
    
    const switchPlayerTurn = ()=> {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = ()=>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playTurn = (row,column) => {
        console.log(`Placing ${getActivePlayer().name}'s symbol into row ${row} column ${column}...`);
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
            console.log(`The Winner is ${getActivePlayer().name}!`);
        } 
        switchPlayerTurn();
        printNewRound();
    };

    return { getActivePlayer, playTurn, getBoard:board.getBoard};
}

function displayController(){
    const game = GameController();
    
    const container = document.querySelector("#container");
    const boardDiv = document.querySelector("#board");
    const turnHeader = document.querySelector("#turn");

    const updatePlayerName = (player) => {
        const nameBtn = document.querySelector("change-player");
        //create a prompt to change name
        const form = document.createElement("form");
    }

    function clickButtonPlayerName(e){

    }
    
    const updateDisplay = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        console.log(game.getBoard());
        const activePlayer = game.getActivePlayer();

        turnHeader.textContent = `It's ${activePlayer.name}'s turn...`;
        console.log("This is board below");
        console.log(board);

        board.forEach((row, rowIndex) => {
            row.forEach((cell , colIndex) => {
              const cellBtn = document.createElement("button");
              cellBtn.classList.add("cell");
              cellBtn.dataset.column = colIndex;
              cellBtn.dataset.row = rowIndex;
              cellBtn.textContent = cell.getValue();
              boardDiv.appendChild(cellBtn);
            })
          })
    }
    
    function clickHandlerBoard(e){
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if(!selectedColumn && !selectedRow) return;

        game.playTurn(parseInt(selectedRow),parseInt(selectedColumn));
        updateDisplay();
    }

    boardDiv.addEventListener("click",clickHandlerBoard);
    updateDisplay();
}

displayController();

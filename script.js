function Gameboard(){
    const board =[];
    const rows =3;
    const columns=3;

    const getBoard = () =>{
        for(let i=0;i<rows;i++){
            board[i] = [];
            for(let j=0;j<columns;j++){
                board[i].push(Cell());
            }
        }
    }
    getBoard();

    const placeMarker = (row,column,player) =>{
        board[row][column].addMarker(player);
    }

    const printBoard = () =>{
        const boardWithCells = board.map( (row)=>
             row.map( (cell) => cell.getValue() ) );
        console.log(boardWithCells);
    }

    return {getBoard, placeMarker, printBoard};
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
    
    const players = [
        player1 = new Player("Mark","X"),
        player2 = new Player("Bob the Builder","O")
    ];

    let activePlayer = player[0];
    
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
                if(board[a[0]][a[1]] !== null && 
                    board[a[0]][a[1]] === board[b[0]][b[1]] &&
                     board[a[0]][a[1]] === board[c[0]][c[1]]){
                    return true;
                }

            }
            return false;
        }

        checkForWinner();
        switchPlayerTurn();
        printNewRound();
    };


    return { getActivePlayer, playTurn};
}

function DisplayGame(){
    let game = Gameboard();
    

}

DisplayGame();
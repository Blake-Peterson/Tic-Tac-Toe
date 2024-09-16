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
    
    const players = [
        new Player("Mark","X"),
        new Player("Bob the Builder","O")
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

    return { getActivePlayer, playTurn};
}

document.addEventListener("DOMContentLoaded", () => {
    const game = GameController();

    /*
    game.playTurn(1,1);
    game.playTurn(0,0);
    game.playTurn(2,0);
    game.playTurn(0,1);
    game.playTurn(0,2);
*/
    const container = document.querySelector("#container");
    const boardDiv = document.querySelector("#board");
    const turnHeader = document.querySelector("#turn");

    for(let i =0; i < 3;i++){
        for(let j=0;j<3;j++){
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.dataset.row=i;
            cell.dataset.column=j;

            cell.addEventListener('click',(event) =>{
                const row = event.target.dataset.i;
                row.textContent=player.marker();
                const column = event.target.dataset.j;
                game.playTurn(row,column,event.target);
            });
            boardDiv.appendChild(cell);
        }
    }
});

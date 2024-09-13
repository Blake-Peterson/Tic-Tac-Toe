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
    return { addToken,getValue};
}

function Player(name,marker){
    return {name,marker};    
}

function GameController(){

}

function DisplayGame(){
    Gameboard();
    

}

DisplayGame();
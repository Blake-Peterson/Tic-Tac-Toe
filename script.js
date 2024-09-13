function Gameboard(){
    const board =[];
    const rows =3;
    const columns=3;

    const getBoard = () =>{
        for(let i=0;i<3;i++){
            board[i] = [];
            for(let j=0;j<3;j++){
                board[i].push(-1);
            }
        }
    }
    getBoard();

    const dropToken = (row, column, player) =>{
        
    }
}

function Cell(){

}

function Player(name){
    return {name};    
}

function PlayerOne(name,wins){
    const increaseWin = () => wins++;
    return Object.assign({}, name, {increaseWin});
}

function PlayerTwo(name,wins){
    const increaseWin = () => wins++;
    return Object.assign({}, name, {increaseWin});
}

function GameController(){

}

function startGame(){
    Gameboard();
    

}

startGame();
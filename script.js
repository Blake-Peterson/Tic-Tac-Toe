function Gameboard(){
    const board =[];
    const rows =3;
    const columns=3;

    const getBoard = () =>{
        for(let i=0;i<3;i++){
            board[i] = [];
            for(let j=0;j<3;j++){
                board[i].push(Cell());
            }
        }
    }
    getBoard();

    return {getBoard};
}

function Cell(){
    let value = 0;

    const placeMarker = (player) => {
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

function startGame(){
    Gameboard();
    

}

startGame();
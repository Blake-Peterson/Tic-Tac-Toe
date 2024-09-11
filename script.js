function Gameboard(){
    const board =[];

    const createboard = () =>{
        for(let i=0;i<3;i++){
            board[i] = [];
            for(let j=0;j<3;j++){
                board[i].push(0);
            }
        }
    }
    createboard();
    console.log(board);
}

function Player(name){
    return {name};    
}

function PlayerOne(name,symbol,wins){
    const name = Player(name);
    const increaseWin = () => wins++;
    return Object.assign({}, name, {increaseWin});
}

function PlayerTwo(name,symbol,wins){
    const name = Player(name);
    const increaseWin = () => wins++;
    return Object.assign({}, name, {increaseWin});
}

function displayGame(){
    Gameboard();

}
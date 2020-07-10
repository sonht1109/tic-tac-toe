const X_CLASS = 'x';
const O_CLASS = 'o';
const WIN_CONDITIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]
];

var cells = document.querySelectorAll('.cell');
var board = document.querySelector('.board');
var mess = document.querySelector('.message');
var p = document.querySelector('.message p');
var button = document.querySelector('button');
var oTurn;

startGame();

function startGame(){
    oTurn = false;
    cells.forEach(element => {
        element.classList.remove(X_CLASS);
        element.classList.remove(O_CLASS);
        element.removeEventListener('click', handleClick);
        element.addEventListener('click', handleClick, {once:true});
    });
    setBoardHover();
    mess.classList.remove('show');
}

function handleClick(e){
    //place mark
    //check win
    //check draw
    //swap turn
    let cell = e.target;
    let currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurn();
        setBoardHover();
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurn(){
    oTurn = !oTurn;
}

function setBoardHover(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn){
        board.classList.add(O_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WIN_CONDITIONS.some(condition => {
        return condition.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    });
};

function endGame(draw){
    if(draw){
        p.innerHTML = 'Draw !!!';
    }
    else{
        p.innerHTML = `${oTurn ? "O's" : "X's"} wins !!!`
    }
    mess.classList.add('show');
}

function isDraw() {
    return Array.from(cells).every(element => {
        return (element.classList.contains(X_CLASS) || element.classList.contains(O_CLASS));
    })
    // cells is nodelist, not a array
}

button.addEventListener('click', function(){
    startGame();
})
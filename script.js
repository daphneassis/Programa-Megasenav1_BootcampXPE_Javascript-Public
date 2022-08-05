var state={board:[],currentGame:[],savedGames:[]}

function start(){
    createBoard();
   // console.log(state.board);
    newGame();
   /* addNumberToGame(1);
    addNumberToGame(2);
    addNumberToGame(3);
    //saveGame(); tinha q dar erro
    addNumberToGame(4);
    addNumberToGame(5);
    addNumberToGame(6);
    //removeNumberFromGame(0);
    saveGame();
    saveGame();
    console.log(state.currentGame)
    console.log(state.savedGames);
    
    resetGame();
    console.log(state.currentGame)*/
}
function createBoard(){
state.board=[];
for(var i =1; i<=60; i++){
    state.board.push(i);
}
}
function newGame(){
    resetGame();
    render();
    console.log(state.currentGame);
}
function render(){
    renderBoard();
    renderButtons();
    renderSavedGames();

}
function renderBoard(){
    var divBoard=document.querySelector('#megasena-board');
    divBoard.innerHTML='';
    var ulNumbers= document.createElement('ul');
    ulNumbers.classList.add('numbers');

    for(var i=0; i<=state.board.length; i++){
        var currentNumber= state.board[i];

        var liNumber=document.createElement('li');
        liNumber.textContent = currentNumber;
        liNumber.classList.add('number');
        liNumber.addEventListener('click',handleNumberClick);
        if(isNumberInGame(currentNumber)){
            liNumber.classList.add('selected-number');
        }
        ulNumbers.appendChild(liNumber);
    }
divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event){
    var value= Number(event.currentTarget.textContent);
    if(isNumberInGame(value)){
        removeNumberFromGame(value);
    } else{
        addNumberToGame(value);
    }
    console.log(state.currentGame);
    render();
}

function renderButtons(){
    var divButtons=document.querySelector('#megasena-buttons');
    //divButtons.textContent = "teste";
    divButtons.innerHTML='';
    var buttonNewGame= createNewGameButton();
    var buttonRandomGame= createRandomGameButton();
    var buttonSaveGame= createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);

}

function createSaveGameButton(){
    var button= document.createElement('button');
    button.textContent="Salvar Jogo";
    button.disabled= !isGameComplete();
    //disabled=true, só fica habilitado qnd tem jogo pra salvar
    button.addEventListener('click', saveGame);
    return button;
    }

function createRandomGameButton(){
var button= document.createElement('button');
button.textContent="Jogo aleatório";
button.addEventListener('click', randomGame);
return button;
}

function createNewGameButton(){
    var button=document.createElement('button');
    button.textContent="Novo Jogo";
    button.addEventListener('click', newGame);
    return button;
}

function renderSavedGames(){
    var divSaveGames=document.querySelector('#megasena-saved-games');
    divSaveGames.innerHTML='';
    if(state.savedGames.length===0){
        divSaveGames.innerHTML='<p>Nenhum jogo salvo<p/>';
    }else{
        var ulSavedGames = document.createElement('ul');
        for(var i =0; i<state.savedGames.length;i++){
            var currentGame= state.savedGames[i];
console.log(currentGame.join(', '));

        var liGame = document.createElement('li');
        liGame.textContent=currentGame.join(', ');
        ulSavedGames.appendChild(liGame);
        }
        divSaveGames.appendChild(ulSavedGames);
    }
}


function addNumberToGame(numberToAdd){
    if (numberToAdd<1 ||numberToAdd>60){
        console.error("Número inválido", numberToAdd)
        return ;
    }
    if (state.currentGame.length>=6){
        console.error("O jogo já está completo");
        return;
    }
    if (isNumberInGame(numberToAdd)){
        console.error("Este número já está no jogo", numberToAdd);
        return;
    }

   state.currentGame.push(numberToAdd);
}
   
function removeNumberFromGame(numberToRemove){
    if (numberToRemove<1 ||numberToRemove>60){
        console.error("Número inválido", numberToRemove)
        return ;
    }
    var newGame= [];
for (var i=0; i<state.currentGame.length; i++){
    var currentNumber = state.currentGame[i];
    if (currentNumber===numberToRemove){
        continue;
    }
newGame.push(currentNumber);
}
state.currentGame = newGame;
}

 function isNumberInGame(numberToCheck){
 /*if(state.currentGame.includes(numberToCheck)){
 return true;
 }
 return false;
}*/ //forma mais elegante embaixo
return state.currentGame.includes(numberToCheck);
 }

 function saveGame(){
     if(!isGameComplete()){
         console.error("O jogo não está completo!");
         return;
     }
     state.savedGames.push(state.currentGame);
     newGame();
     console.log(state.savedGames);
 }

 function isGameComplete(){
    return state.currentGame.length==6;
 }

 function resetGame(){
state.currentGame=[];
 }
function randomGame(){
    resetGame();
    //console.log(Math.random());lança um jogo entre 0 e 1
    // Math ceil(vem de teto) arredonda pra cima
        //console.log(randomNumber);
    while(!isGameComplete()){
        var randomNumber = Math.ceil(Math.random()*60);
        addNumberToGame(randomNumber);
    }
console.log(state.currentGame);
render();
}

start();

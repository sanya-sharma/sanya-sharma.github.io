///////////////Hide the overflow of page ///////////////////////////////////////
//$('body,html').css("overflow","hidden");



////////////////////////////////////////////////////////////////////////////////
///////////////////////Declare Global Vriables ////////////////////////////////
let playBoard;
let huPlayer ='O';
let aiPlayer = 'X';
let leftPlayer ='O';
let rightPlayer = 'X';
let bot2 ='O';
let bot1 = 'X';
let acitvePlayer=leftPlayer;
let choice=0;
const winCombos =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];
let difficulty=1;
let players="HvB";
let difficulty_bot1=1;
let difficulty_bot2=1;
let num=0;

const cells = document.querySelectorAll('.cell');
startGame();







////////////////////////////////////////////////////////////////////////////////
////////////////////// Function to start the game //////////////////////////////
function startGame() {

  num=0;

  //      Remove all the displays and texts from previous round of game
  document.querySelector('#hint').disabled = true;
  document.querySelector('#leftText').innerHTML = '';
  document.querySelector('#rightText').innerHTML = '';
  document.querySelector('#left').innerHTML = "";
  document.querySelector('#right').innerHTML = "";
  document.querySelector('.endgame').style.display = "none";
  document.querySelector('.selectSym').style.display = "none";
  document.querySelector('.selectDif').style.display = "none";
  document.querySelector('.selectDifBot').style.display = "none";
  document.querySelector('.selectMethod').style.display = "none";
  document.querySelector('.timeStamp').style.display = "none";
  document.querySelector('.instruct').style.display = "none";
  document.querySelector('.endgame .text').innerText ="";
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
  }

  //       Display the options to select game players
  document.querySelector('.selectPlayer').style.display = "block";

}






////////////////////////////////////////////////////////////////////////////////
/////////////// Function to slect PLayer among which the ///////////////////////
////////////////////     game will be played      //////////////////////////////
function selectPlayer(playersSelected){

  document.querySelector('.selectPlayer').style.display = "none";

  //      Players selected are Human vs Bot
  if(playersSelected=='HvB'){

    players="HvB";
    document.querySelector('#left').innerHTML = "<img src='robotImage.jpg' class='image' alt='Robot Image'>";
    document.querySelector('#right').innerHTML = "<img src='../astronautImage2.jpg'class='image' alt='Human Image'>";
    document.querySelector('.selectSym p').innerHTML = "Select Symbol <br> X: First Move<br> O:Second Move";
    document.querySelector('.selectMethod').style.display = "block";

  }

  //     Players Selected are Human vs Human
  else if (playersSelected=="HvH"){

    players="HvH";
    document.querySelector('#left').innerHTML = "<img src='../astronautImage2.jpg' class='image' alt='Human Image'>";
    flipImage();
    document.querySelector('#right').innerHTML = "<img src='../astronautImage2.jpg' class='image' alt='Human Image'>";
    document.querySelector('.selectSym p').innerHTML = "Select Symbol for First Player";
    document.querySelector('.selectSym').style.display = "block";

  }

  //      Players Selected are Bot vs Bot
  else{

    players="BvB";
    choice=1;
    document.querySelector('#left').innerHTML = "<img src='../robotImage.jpg' class='image' alt='Robot Image'>";
    document.querySelector('#right').innerHTML = "<img src='../robotImage.jpg' class='image' alt='Robot Image'>";
    document.querySelector('#leftText').innerHTML = 'Bot 1 : X';
    document.querySelector('#rightText').innerHTML = 'Bot 2: O';
    document.querySelector('.selectDifBot p').innerHTML = "Select Thinking Level For 1st Bot";
    document.querySelector('.selectDifBot').style.display = "block";

  }

  //console.log(players);

}






////////////////////////////////////////////////////////////////////////////////
//////////////// Function to select Algorith for Game //////////////////////////
function selectMethod(method){

  choice = method;
  document.querySelector('.selectMethod').style.display = "none";
  document.querySelector('.selectDif').style.display = "block";

}





////////////////////////////////////////////////////////////////////////////////
///////////// Function to assign difficuty for Human vs Bot Game ///////////////
function selectDif(dif){
  difficulty=dif;
  document.querySelector('.selectDif').style.display = "none";
  document.querySelector('.selectSym').style.display = "block";
}




////////////////////////////////////////////////////////////////////////////////
//////////// Function to select thinking depth of each bot /////////////////////
//////////////////      for Bot vs Bot game     ////////////////////////////////
function selectDifBot(dif){

  //      Checking if first bot have been assign difficulty
  if(num==0){

    difficulty_bot1=dif;
    document.querySelector('.selectDifBot').style.display = "none";
    document.querySelector('.selectDifBot p').innerHTML = "Select Thinking Level For 2nd Bot";
    document.querySelector('.selectDifBot').style.display = "block";
    num=1;

  }

  //      If 1st bot is already assign difficulty , assign the selected
  //      difficulty to 2nd Bot
  else{

    num=0;
    difficulty_bot2=dif;
    playBoard = Array.from(Array(9).keys());
    document.querySelector('.selectDifBot').style.display = "none";
    document.querySelector('#hint').disabled = false;
    document.querySelector('.instruct').style.display = "block";
    //     After 2nd bot is assigned Thinking level , enable playing game on click
    for (let i = 0; i < cells.length; i++) {

      cells[i].removeEventListener('click', turnClick, false);
      cells[i].removeEventListener('click', turnClickHuman, false);
      cells[i].addEventListener('click', turnBot, false);

    }

  }

}



///////////////////////////////////////////////////////////////////////////////
////////////////////// Function to Assign symbol ///////////////////////////////
function selectSym(sym){

  document.querySelector('#hint').disabled = false;


  //      console.log("1 " , players);
  //      If the game is between Human and Bot
  if(players==="HvB"){



      //console.log("1 " , players);
      document.querySelector('.selectSym').style.display = "none";

      //      Assign symbol to human based on choice made by player and
      //      assign the other sybmol to bot
      huPlayer = sym;
      aiPlayer = sym==='O' ? 'X' :'O';
      playBoard = Array.from(Array(9).keys());

      //      Remove all previous event listeners and add event listener for
      //      human click for human vs bot game
      for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnBot, false);
        cells[i].removeEventListener('click', turnClickHuman, false);
        cells[i].addEventListener('click', turnClick, false);
      }

      //      If the first player if Bot , play it's move and display the
      //      the time taken
      //      Also display the respective symbols for left and right players
      //      in their respective blocks
      if (aiPlayer === 'X') {
        document.querySelector('#leftText').innerHTML = 'X';
        document.querySelector('#rightText').innerHTML = 'O';
        let y= new Date().getTime();
        turn(bestSpot(), aiPlayer);
        let z= new Date().getTime();
        let x= z-y;
        //console.log(x);
        document.querySelector('.timeStamp').style.display = "none";
        document.querySelector('.timeStamp #text').innerHTML = "Time taken by Bot : ";
        document.querySelector('.timeStamp #time').innerHTML= x + "ms";
        document.querySelector('.timeStamp').style.display = "block";
      }

      else{
        document.querySelector('#rightText').innerHTML = 'X';
        document.querySelector('#leftText').innerHTML = 'O';
      }
  }


  //      If the game is between Human and Human
  else{

     //console.log("1 " , players);
     //       Assign the symbol chosen by player to the left person
     //       Left Player - First Player
     document.querySelector('.selectSym').style.display = "none";
     leftPlayer = sym;
     rightPlayer = sym==='O' ? 'X' :'O';
     activePlayer=leftPlayer;

     //       Displaying symbols in their respective fields
     if (leftPlayer === 'X') {
       document.querySelector('#leftText').innerHTML = 'Player 1: X';
       document.querySelector('#rightText').innerHTML = 'Player 2: O';
     }
     else{
       document.querySelector('#rightText').innerHTML = 'Player 2: X';
       document.querySelector('#leftText').innerHTML = 'Player 1: O';
     }

     playBoard = Array.from(Array(9).keys());

     //      Remove all previous event listeners and add event listener for
     //      human click for human vs human game
     for (let i = 0; i < cells.length; i++) {
       cells[i].removeEventListener('click', turnBot, false);
       cells[i].removeEventListener('click', turnClick, false);
       cells[i].addEventListener('click', turnClickHuman, false);
     }
  }
}






///////////////////////////////////////////////////////////////////////////////
////////////// To flip the image of astronout on left//////////////////////////
function flipImage(){
  document.querySelector('#left img').style.transform= "scaleX(-1)";
}





////////////////////////////////////////////////////////////////////////////////
//////////////// Function to return empty cells to play move ///////////////////
function emptySquares() {
  return playBoard.filter((elm, i) => i===elm);
}




////////////////////////////////////////////////////////////////////////////////
/////////////////// Function to give hint to Human Player //////////////////////
function hint(){

  let y= new Date().getTime();            //   Recording time taken to give hint

  //      If the current game is Human vs Human
  if (players== "HvH"){

    //      Look for active player and respond with the cell that give
    //      maximum chance of win for that player
    if(activePlayer==leftPlayer)
       var squareid=minimax(playBoard, leftPlayer , 0 , 9, leftPlayer , rightPlayer, choice).index;
    else {
      var squareid=minimax(playBoard, rightPlayer , 0 , 9, rightPlayer , leftPlayer, choice).index;
    }

  }

  //     If the current game is Human vs Bot
  else {
      var squareid=minimax(playBoard, huPlayer , 0 , 9, huPlayer , aiPlayer, choice).index;
  }


  let z= new Date().getTime();
  let x= z-y;
  //console.log(x);
  document.querySelector('.timeStamp').style.display = "none";
  document.querySelector('.timeStamp #text').innerHTML = "Time taken for Hint : ";
  document.querySelector('.timeStamp #time').innerHTML= x + "ms";
  document.querySelector('.timeStamp').style.display = "block";

  //      Make background color yellow to display hint
  document.getElementById(squareid).style.backgroundColor = "yellow";
  //      Remove hint colour after 0.5 sec
  setTimeout(function(){ document.getElementById(squareid).style.removeProperty('background-color'); }, 500);

}





////////////////////////////////////////////////////////////////////////////////
/////////////////// Function to check if agme has been won /////////////////////
function checkWin(board, player) {

  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;

}




////////////////////////////////////////////////////////////////////////////////
////////////////// Function to set background and gifs /////////////////////////
/////////////////////    if game is has been won    ////////////////////////////
function gameOver(gameWon){

  //     Set the background colour of the winning combos
  for (let index of winCombos[gameWon.index]) {

    //        If the Game was between Human and bot and game is won by human
    //        set background colour to blue , else red
    if (players=="HvB") {
      //console.log("background HvB");
      document.getElementById(index).style.backgroundColor =
        gameWon.player === huPlayer ? "#a1ffad" : "#ff4d4d";
    }

    //        If the Game was between Human and Human and game is won by left
    //        player set background colour to #b6ff63 , else #df66fa
    else if (players=="HvH"){
      //console.log("background HvH");
      document.getElementById(index).style.backgroundColor =
        gameWon.player === leftPlayer ? "#b6ff63" : "#df66fa";
    }

    //        If the Game was between bot and bot and game is won by left bot
    //        set background colour to #b6ff63 , else #df66fa
    else{
      document.getElementById(index).style.backgroundColor =
        gameWon.player === bot1 ? "#b6ff63" : "#df66fa";
    }

  }

  //      Remove the event listener  property of the cells so that player
  //      does not proceed further
  for (let i=0; i < cells.length; i++) {

    if (players=="HvB") {
      cells[i].removeEventListener('click', turnClick, false);
    }
    else if (players=="HvH"){
      cells[i].removeEventListener('click', turnClickHuman, false);
    }
    else{
      cells[i].removeEventListener('click', turnBot, false);
    }

  }


  //     Display text and gif according to the Winner

  //    If game was between Human and Bot, and human won game , play it's gif
  //    and display "You Win!" , else play Robot gif and display "You Lose!"
  if (players=='HvB') {

    if(gameWon.player===huPlayer){
      document.querySelector('#right').innerHTML = "<img src='../astronautGIF2.gif' class='image' alt='Human GIF'>";
    }
    else {
      document.querySelector('#left').innerHTML = "<img src='../robotGIF.gif' class='image' alt='Robot GIF'>";
    }

    declareWinner(gameWon.player === huPlayer ? "You win!" : "You lose");

  }

  //    If game was between Human and Human, and left human won game , play left
  //    gif and display "Left Player Wins!" , else play right gif and display
  //    "Right Player Wins!"
  else if (players=="HvH"){

    if(gameWon.player===rightPlayer){
      document.querySelector('#right').innerHTML = "<img src='../astronautGIF2.gif' class='image' alt='Human GIF'>";
    }
    else {
      document.querySelector('#left').innerHTML = "<img src='../astronautGIF2.gif' class='image' alt='Human GIF'>";
    }

    declareWinner(gameWon.player === leftPlayer ? "Player 1 wins!" : "Player 2 Wins!");

  }

  //    If game was between Bot and Bot and left Bot won game , play left gif
  //    and display "Left Bot Wins!" , else play right gif and display
  //    "Right Bot Wins!"
  else{

    if(gameWon.player===bot2){
      document.querySelector('#right').innerHTML = "<img src='../robotGIF.gif' class='image' alt='Robot GIF'>";
    }
    else {
      document.querySelector('#left').innerHTML = "<img src='../robotGIF.gif' class='image' alt='Robot GIF'>";
    }

    declareWinner(gameWon.player === bot1 ? " Bot 1 wins!" : "Bot 2 Wins!");

  }

}







////////////////////////////////////////////////////////////////////////////////
///////////////////// Function to declare Winner ///////////////////////////////
function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}





////////////////////////////////////////////////////////////////////////////////
////////////// Function to check if there's  a tie /////////////////////////////
function checkTie() {
  if (emptySquares().length === 0){
    for (cell of cells) {
      cell.style.backgroundColor = "green";
      players=="HvH" ? cell.removeEventListener('click',turnClickHuman, false) : cell.removeEventListener('click',turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}

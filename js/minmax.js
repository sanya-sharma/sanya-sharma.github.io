////////////////////////////////////////////////////////////////////////////////
/////////////// Function to find bestspot for AI Player ////////////////////////
function bestSpot(){
  return minimax(playBoard, aiPlayer , 0 , difficulty , aiPlayer, huPlayer , choice).index;
}




////////////////////////////////////////////////////////////////////////////////
///////////////////  Function to take actions when a human /////////////////////
//////////////////   clicks a cell in Human vs Bot game   //////////////////////
function turnClick(square) {

  //     Check if the clicked cell's id is a number , i.e., the cell is empty
  if (typeof playBoard[square.target.id] ==='number') {

    //      Assign the symbol to the cell
    turn(square.target.id, huPlayer);

    //      Check if the gae has been won by the human . If not , continue with
    //      robot's move
    if (!checkWin(playBoard, huPlayer) && !checkTie()){

      //    Record and display time taken by bot to play it's move
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

  }

}






////////////////////////////////////////////////////////////////////////////////
///////////////////  Function to take actions when a human /////////////////////
//////////////////   clicks a cell in Human vs Human game //////////////////////
function turnClickHuman(square) {

  //     Check if the clicked cell's id is a number , i.e., the cell is empty
  if (typeof playBoard[square.target.id] ==='number') {

    //    Assign the cell the symbol of active Player
    playBoard[square.target.id] = activePlayer;
    document.getElementById(square.target.id).innerHTML = activePlayer;

    //    Check if game has been won by the active player
    let gameWon=checkWin(playBoard,activePlayer);
    if (gameWon){

      gameOver(gameWon);
    }
    else{
      checkTie();
    }

    //console.log(activePlayer);
    //     Switch the active player for next player's move
    activePlayer= activePlayer==leftPlayer ? rightPlayer : leftPlayer;
  }

}





////////////////////////////////////////////////////////////////////////////////
///////////////////  Function to take actions when a human /////////////////////
//////////////////   clicks a cell in Bot vs Bot game     //////////////////////
function turnBot(square){

   //      If the current player is Left Bot
   if(num==0){

     //      Find the square id best suited for win with given thinking level
     //      of left bot and assign symbol of left bot to it
     let squareId=minimax(playBoard, bot1 , 0 , difficulty_bot1 , bot1 , bot2 ,choice).index;
     playBoard[squareId] = bot1;
     document.getElementById(squareId).innerHTML = bot1;
     //      Check if left bot has won the game or if game has been tie
     let gameWon = checkWin(playBoard, bot1);
     if (gameWon){
        gameOver(gameWon);
        document.querySelector('.instruct').style.display = "none";
     }
     else if(checkTie()){
         document.querySelector('.instruct').style.display = "none";
     }
     //      switch the player to right bot
     num=1;
     return;

   }

   //      If the current player is Right Bot
   else{

     //      Find the square id best suited for win with given thinking level
     //      of right bot and assign symbol of right bot to it
     let squareId=minimax(playBoard, bot2 , 0 , difficulty_bot2 , bot2 , bot1 ,choice).index;
     playBoard[squareId] = bot2;
     document.getElementById(squareId).innerHTML = bot2;
     //      Check if Right bot has won the game or if game has been tie
     let gameWon = checkWin(playBoard, bot2);
     if (gameWon){
        gameOver(gameWon);
        document.querySelector('.instruct').style.display = "none";
     }
     else if(checkTie()){
         document.querySelector('.instruct').style.display = "none";
     }
     //      switch the player to left bot
     num=0;
     return;

   }

}





////////////////////////////////////////////////////////////////////////////////
//////////////////  Function to fill the cell with  ////////////////////////////
/////////////////   respective player's symbol      ////////////////////////////
function turn(squareId, player) {

  playBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  //      Check if game has been won by the current player or if it's a tie
  let gameWon = checkWin(playBoard, player);
  if (gameWon) gameOver(gameWon);
  else checkTie();

}






////////////////////////////////////////////////////////////////////////////////
///////////////// Function to implement MinMax Algorithm ///////////////////////
/*
    The function has following default parameters
    winner = aiPlayer   :   In general case , the function runs and find best
                            move for aiPlayer
                            But in case of looking for hint for human player ,
                            default value is overwritten by the value provided
                            by the calling parameter

    loser = huPlayer   :    In general case , the function runs and find best
                            move for aiPlayer and hence for human player to lose
                            But in case of looking for hint for human player ,
                            default value is overwritten by the value provided
                            by the calling paramter

    choice = 0        :     By default , the function runs with MinMax Algorithm
                            without alphabeta pruning.
                            But in case user choses with Alpha Beta Pruning
                            this value is overwritten by the calling parameters

    alpha = -Infinity :     Default value for alpha for first call
                            During the recursive call , it is changed to the
                            current value at the time of calling

    beta = Infinity   :     Default value for beta for first call
                            During the recursive call , it is changed to the
                            current value at the time of calling

    The extra parameter level signifies the number of recursive calls made-1 .
    As soon as this parameter reaches the difficulty level and in case the
    program has not reached a stage to tell win or lose , it returns tie. This
    limits the thinking depth of algorithm and hence, Bot's Intelligence.
*/


function minimax(newBoard, player, level , difficulty, winner = aiPlayer, loser=huPlayer,  choice=0 , alpha= - Infinity , beta= Infinity) {

    //     Find the available empty spots in the board passed in this repetition
    var availSpots = emptySquares(newBoard);
    //console.log(level);
    //console.log(player, difficulty);

    //     If the current board if already won by the desired loser , return
    //     negative score
    if (checkWin(newBoard, loser)) {
          return {score: -10 + level};
    }
    //     If the current board if already won by the desired winner , return
    //     positive score
    else if (checkWin(newBoard, winner)) {
          return {score: 10 - level};
    }
    //     If the current board is completely filled or the level of allowed depth
    //     for the given player has been reached , return zero score
    else if (availSpots.length === 0 || level>=difficulty) {
          return {score: 0};
    }

    //     Calculate the possible chance of winning by placing the symbol in each
    //     of the available move
    var moves = [];
    for (let i = 0; i < availSpots.length; i ++) {

          var move = {};
          //      Consider a situation of playing a move in availSpots[i]'th  cell
          move.index = newBoard[availSpots[i]];
          newBoard[availSpots[i]] = player;

          //      If the currect player is winner , estimate the score of loser's
          //      next move
          if (player === winner)
                move.score = minimax(newBoard, loser, level+1, difficulty, winner , loser, choice, alpha , beta).score;
          //      If the currect player is loser , estimate the score of winner's
          //      next move
          else
                move.score =  minimax(newBoard, winner,level+1 , difficulty, winner, loser, choice, alpha, beta).score;

          newBoard[availSpots[i]] = move.index;

          //      If the player is winner and the move gives positive score return this move
          //     or if the player is loser and the move gives negative score , return this move
          //     else push the current move in all moves
          if ((player === winner && move.score === 10) || (player === loser && move.score === -10))
                return move;
          else
                moves.push(move);
    }

    let bestMove, bestScore;
    //      If player is desired winner , try to maximize the score as much as possible
    if (player === winner) {

          bestScore = -1000;

          for(let i = 0; i < moves.length; i++) {

                //console.log(moves[i]);
                //     If a certain move's score is more than the best score
                //     make that move best move and it's score best score
                if (moves[i].score > bestScore) {
                      bestScore = moves[i].score;
                      bestMove = i;
                }
                alpha= Math.max(alpha,bestScore);
                if(choice && alpha>=beta){
                      break;
                }
          }
    }

    //      If player is desired loser , try to minimize the score as much as possible
    else {

          bestScore = 1000;

          for(let i = 0; i < moves.length; i++) {
                //console.log(moves[i]);
                //     If a certain move's score is less than the best score
                //     make that move best move and it's score best score
                if (moves[i].score < bestScore) {
                      bestScore = moves[i].score;
                      bestMove = i;
                }
                beta= Math.min(alpha,bestScore);
                if(choice && alpha>=beta){
                      break;
                }
          }
    }

    //       Return the best move calculated
    return moves[bestMove];
}

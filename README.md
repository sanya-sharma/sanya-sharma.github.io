# Tic Tac Toe
This page is for AI powered Tic Tac Toe developed for Mars Colonization Program (Microsoft Engage 2020). The game consists of three players mode: <br>
<ul type="bullet">
	<li>Human vs Human</li><br>
	<li>Human vs Bot</li><br>
	<li>Bot vs Bot</li>
</ul>
<br>
The game uses two algorithms :<br>
<ul type="square">
<li>	MinMax Algorithm</li><br>
<li>	MinMax Algorithm with alpha beta pruning </li>
</ul>
<br>
There are 9 difficulty levels (1-9)  for the Bot. Player can choose the difficulty level for the Bot they want to play with for Human vs Bot game. In case of Bot vs Bot game , these levels define thinking depth of respective Bot. Minmax algorithm used in this program uses scores to determine the best move. For Bot’s move, if a move results in win of Bot , the score returned is +10 . In case a move results in win of human player , the score returned is -10. In case of a tie , the score returned is 0. The difficulty levels signifies the number of recursive call a bot can make in determining the best move for it. For example, if the bot has difficulty level of 5 and it has already done 5 recursive calls , then if bot neither wins nor lose with a given move , instead of another recursion , score 0 (Match tie) is returned. Thus, by limiting the number of recursive calls made , we limit the intelligence of bot.

<br>
Assume that there are 2 possible ways for X to win the game from a give board state.<br>
•	Move A : X can win in 2 move<br>
•	Move B : X can win in 4 moves<br>
Our evaluation function will return a value of +10 for both moves A and B. Even though the move A is better because it ensures a faster victory, our AI may choose B sometimes. To overcome this problem we subtract the depth value from the evaluated score. This makes our AI even more smarter!
<br><br>
The game also provides Hint option. On clicking Hint button , program runs Minmax algorithm from the perspective of human, that it , program tries to maximize Human score and minimize Bot’s score and return the best possible move for human to win. Hence, MinMax algorithm uses the maximum intelligence , that is, uses the difficulty level 9 for determining next move.

<br><br>

To differentiate between two algorithms , Time Taken by AI for it’s move and for hint are displayed below the playing board.

<br>
<h3>
MinMax Algorithm
</h3>
<br>
Minimax is a kind of backtracking algorithm that is used in decision making and game theory to find the optimal move for a player, assuming that your opponent also plays optimally. It is widely used in two player turn-based games.
<br>
Algorithm can be explained with the help of following flow chart:

![MIN_MAX_FLOW_CHART](https://github.com/sanya-sharma/Tic-Tac-Toe/blob/master/MIN_MAX.jpg)

The initial call starts from the maximiser A , which have two choice, either go to B(left) or C(right):
<br>
<ul type="square">
	<li>Maximizer goes LEFT: It is now the minimizers turn.
		<ul >
			<li>Minimizer B have two choice, either go to D(left) or E(right):
				<ul type="circle">
					<li>Minimizer goes LEFT: It is now the maximizers turn. The maximizer now has a choice between 3 and 5. Being the maximizer it will definitely choose the bigger among both, that is 5. </li>
					<li>Minimizer goes RIGHT: It is now the maximizers turn. The maximizer now has a choice between 6 and 9. Being the maximizer it will definitely choose the bigger among both, that is 9. </li>
				</ul>
			</li>
			<li>Since B is Minimizer , it chooses least among both , that is 5.</li>
		</ul>
	</li>
	<li>Maximizer goes RIGHT: It is now the minimizers turn.
		<ul>
			<li>Minimizer C have two choice, either go to F(left) or G(right):
				<ul type="circle">
					<li>Minimizer goes LEFT: It is now the maximizers turn. The maximizer now has a choice between 1 and 2. Being the maximizer it will definitely choose the bigger among both, that is 2. </li>
					<li>Minimizer goes RIGHT: It is now the maximizers turn. The maximizer now has a choice between 0 and -1. Being the maximizer it will definitely choose the bigger among both, that is 0. </li>
				</ul>
			</li>
			<li>Since B is Minimizer , it chooses least among both , that is 0.</li>
		</ul>
	</li>
</ul>
<br>
A , being a maximizer , chooses bigger number among both , that is , 5. Thus, A goes to the Left path.

<br><br>
<h3>
MinMax Algorithm With Alpha-Beta Pruning
	</h3>
<br><br>
Alpha-Beta pruning is not actually a new algorithm, rather an optimization technique for minimax algorithm. It reduces the computation time by a huge factor. This allows us to search much faster and even go into deeper levels in the game tree. It cuts off branches in the game tree which need not be searched because there already exists a better move available.
<br><br>
Alpha is the best value that the maximizer currently can guarantee at that level or above.
<br>
Beta is the best value that the minimizer currently can guarantee at that level or above.
<br><br>
 Initially alpha is negative infinity and beta is positive infinity, i.e. both players start with their lowest possible score. It can happen that when choosing a certain branch of a certain node the minimum score that the minimizing player is assured of becomes less than the maximum score that the maximizing player is assured of (beta <= alpha). If this is the case, the parent node should not choose this node, because it will make the score for the parent node worse. Therefore, the other branches of the node do not have to be explored.
 
 <br><br>
 The website is displayed [here](https://sanya-sharma.github.io/)


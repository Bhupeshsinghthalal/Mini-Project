import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./GameOver.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner=null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdquareSymbol=gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol=== secondSquareSymbol && firstSquareSymbol=== thirdquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}


function deriveGameBoard(gameTurn){
  let gameBoard=[...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurn){
    const {square,player}=turn;
    const {row,col}=square;

    gameBoard[row][col]=player;
  }
  return gameBoard;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [players,setPlayers]=useState(
    {
      X:'Player 1',
      O:'Player 2',
    }
  );
  // const [activePlayer,setActivePlayer]=useState('X');

  const activePlayer = deriveActivePlayer(gameTurn);

  const gameBoard=deriveGameBoard(gameTurn);

  const winner=deriveWinner(gameBoard,players);

  const hasDraw=gameTurn.length===9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer)=>  curActivePlayer==='X'? 'O':'X');
    setGameTurn((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName,
      };
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onChanageName={handlePlayerNameChange} />
          <Player name="Player 2" symbol="0" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;

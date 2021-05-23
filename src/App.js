import "./App.scss"
import React, { useState } from "react";
import Board from "./components/Board"

const App = () => {

    const [bombs, setBombs] = useState(localStorage.getItem("minsweeperCount") || 6)
    const [counter, setCounter] = useState(0)
    const [message, setMessage] = useState();
    const [boardLength, setBoardLength] = useState(localStorage.getItem("minsweeperLength") || 9)
    // variables used for a new game setup
    const [newboardSize, setNewBoardSize] = useState(boardLength);
    const [newBombsNumber, setNewBombsNumber] = useState(bombs);

    const newGame = () => {
        localStorage.setItem("minsweeperCount", newBombsNumber)
        localStorage.setItem("minsweeperLength", newboardSize)
        window.location.reload()

    }

    return (<>
        <div className="title">MINESWEEPER GAME</div>
        <div className="title">Find the {bombs} bombs, You marked: {counter} Bombs</div>
        <Board num={bombs} setMessage={setMessage} counter={counter} setCounter={setCounter} boardLength={boardLength} />
        <div className="message">{message}</div>
        <div className="newGame">
            <label htmlFor="boardSize">New game board size : </label>
            <input id="boardSize" type="number" min="8" max="15" value={newboardSize} onChange={(e) => setNewBoardSize(e.target.value)} />
            <label htmlFor="boardBombs">Number of bombs to hide : </label>
            <input id="boardBombs" type="number" min="6" max="20" value={newBombsNumber} onChange={(e) => setNewBombsNumber(e.target.value)} />
            <button onClick={() => newGame()}>New Game</button>
        </div>

    </>)
}
export default App;
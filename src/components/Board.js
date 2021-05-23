import React, { useState, useEffect } from "react"
import Cell from "./Cell"

const Board = ({ num, setMessage, counter, setCounter, boardLength }) => {

    const [state, setState] = useState(null); // Board state, each array inside is one line of the board
    const [first, setClick] = useState(true); // Check ifd first click
    const [bombs, setBombs] = useState([]); // Positions of the randomly positioned bombs
    const [found, setFound] = useState(0); // Check how many bombs are found (marked correctly)

    /* INIT the board with bombs */
    useEffect(() => {

        // restart initial state
        setBombs([])
        setFound(0)
        setMessage("Right click to mark bombs position (Ctrl + click on mac)")
        setState(null)
        setClick(true)

        // init board with the bombs
        let row = [];
        let myResult = [];
        let result = {};
        for (let i = 0; i < boardLength; i++) {
            for (let j = 0; j < boardLength; j++) {
                if (bombs.find(el => el.x === i && el.y === j)) {
                    result = {
                        x: i,
                        y: j,
                        bombs: true,
                        count: 0,
                        show: false,
                        mark: false
                    };
                    row.push(result);
                } else {
                    result = {
                        x: i,
                        y: j,
                        bombs: false,
                        count: 0,
                        show: false,
                        mark: false
                    };
                    row.push(result);
                }
            }
            myResult.push(row);
            row = [];
        }

        setState(myResult)

        // init random bombs positions
        let bombsArray = []
        for (let h = 0; h < num; h++) {
            let bombX = Math.floor(Math.random() * boardLength);
            let bombY = Math.floor(Math.random() * boardLength);
            if (bombsArray.find(el => el.x === bombX && el.y === bombY)) {
                num += 1;
            } else {
                bombsArray.push({ x: bombX, y: bombY });
            }
        }
        setBombs(bombsArray)

    }, [num, boardLength])

    // function to handle click on cases
    const handleClick = el => {
        let arr = [...state];

        if (first) {
            firstClick();
            setClick(false);
        }

        // handle end of game
        if (arr[el.x][el.y].bombs) {
            winner();
            setMessage(`You lost!!!`);
            arr.map(el => el.map(e => (e.show = true)));
            setState(arr);
        }
        // handle empty cell with callback
        else if (arr[el.x][el.y].show === false && arr[el.x][el.y].count === 0) {
            arr[el.x][el.y].show = true;
            toggleShow(el.x, el.y);
            // handle cell with count > 0 without callback
        } else if (arr[el.x][el.y].show === false && arr[el.x][el.y].count > 0) {
            arr[el.x][el.y].show = true;
            setState(arr);
        }
    };

    // Check all adjoining cases 
    const toggleShow = (a, b) => {
        if (a > 0) {
            check(a - 1, b);
        }
        if (b > 0) {
            check(a, b - 1);
        }
        if (b < (boardLength - 1)) {
            check(a, b + 1);
        }
        if (a < (boardLength - 1)) {
            check(a + 1, b);
        }
    };

    // Reveal new case
    const check = (a, b) => {
        let arr = [...state];
        if (arr[a][b].count === 0 && arr[a][b].show === false) {
            arr[a][b].show = true;
            return toggleShow(a, b);
        } else {
            arr[a][b].show = true;
            setState(arr);
        }
    };

    // return case bombs count 
    const counting = (a, b) => {
        let arr = [...state];

        if (a > 0) {
            arr[a - 1][b].count += 1;
        }
        if (a > 0 && b > 0) {
            arr[a - 1][b - 1].count += 1;
        }
        if (b > 0) {
            arr[a][b - 1].count += 1;
        }
        if (a > 0 && b < (boardLength - 1)) {
            arr[a - 1][b + 1].count += 1;
        }
        if (b < (boardLength - 1)) {
            arr[a][b + 1].count += 1;
        }
        if (a < (boardLength - 1)) {
            arr[a + 1][b].count += 1;
        }
        if (a < (boardLength - 1) && b > 0) {
            arr[a + 1][b - 1].count += 1;
        }
        if (a < (boardLength - 1) && b < (boardLength - 1)) {
            arr[a + 1][b + 1].count += 1;
        }
    };

    const firstClick = () => {
        let arr = [...state];
        bombs.map(el => (arr[el.x][el.y].bombs = true));
        bombs.map(el => counting(el.x, el.y));
    };

    // Handle case bomb marking
    const rightClick = (e, el) => {
        e.preventDefault();
        let arr = [...state];
        const checked = el.mark;
        el.mark = !checked;
        if (el.mark) {
            setCounter(counter + 1);
        } else {
            setCounter(counter - 1);
        }
        checkIfUserWon();
        setState(arr);
    };

    // Check if the user won for every new mark
    const checkIfUserWon = () => {
        let foundBombs = 0;
        state.map(elem =>
            elem.map(el => (el.bombs && el.mark ? (num += 1) : null))
        );
        setFound(foundBombs);
        if (found === num) {
            setMessage(`You WON!!! Congrats`);
            let arr = [...state];
            arr.map(el => el.map(e => (e.show = true)));
            setState(arr);
        }
    };


    return (
        <div className="board">
            <ul>
                {state && state.map((el, index) => {
                    return (
                        <li className="row" key={index}>
                            {el.map((elem, i) => {
                                return (
                                    <Cell
                                        key={i}
                                        ind={i}
                                        show={elem.show}
                                        checked={elem.mark}
                                        count={elem.show ? elem.count : null}
                                        bomb={elem.bombs}
                                        right={e => {
                                            rightClick(e, elem);
                                        }}
                                        action={() => {
                                            handleClick(elem);
                                        }}
                                    />
                                );
                            })}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Board;
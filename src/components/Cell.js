import React from "react";

const Cell = props => {
    let value;
    if (props.checked) {
        value = "checked";
    } else if (props.bomb && props.show) {
        value = "bomb";
    } else if (props.count === 0) {
        value = "zero";
    } else if (props.count === 1) {
        value = "one";
    } else if (props.count === 2) {
        value = "two";
    } else if (props.count === 3) {
        value = "three";
    } else if (props.count === 4) {
        value = "four";
    } else if (props.count === 5) {
        value = "five";
    } else if (props.count === 6) {
        value = "six";
    } else if (props.count === 7) {
        value = "seven";
    } else if (props.count === 8) {
        value = "eight";
    } else {
        value = "hidden";
    }
    return (
        <div
            onClick={props.action}
            onContextMenu={props.right}
            className={value}
            key={props.ind}
        ></div>
    );
};
export default Cell;

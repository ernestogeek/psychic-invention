import React from "react";

export const Cell = ({row, col}) => {
   return <div className="square" id={`${row}-${col}`}></div>;
};

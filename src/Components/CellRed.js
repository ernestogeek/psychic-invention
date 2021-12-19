import React from "react";

export const CellRed = ({row, col}) => {
   return <div className="ob" id={`${row}-${col}`}></div>;
};

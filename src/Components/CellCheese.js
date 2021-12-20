import React from "react";
import cheese from "./cheese.png";

export const CellCheese = ({row, col}) => {
   return (
      <div className="square" id={`${row}-${col}`}>
         <img src={cheese} className="rat" alt="" />
      </div>
   );
};

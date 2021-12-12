import React,{useState} from 'react'
import { Cell } from './Cell'
import {CellCheese} from './CellCheese'
import {CellRat} from './CellRat'
import {CellRed} from './CellRed'


 export const MazeGeneration = () => {

const arr=[
    [0,0,0,1,0,0],
    [1,0,0,0,0,1],
    [0,1,0,1,0,0],
    [1,0,1,0,0,1],
    [1,1,0,0,0,1],
    [0,1,1,0,0,0]
  ];

 function isSafe(arr, x, y) {
  const m = arr.length;
  const n=arr[0].length;
  if (x >= 0 && x < m && y >= 0 && y < n && arr[x][y] === 0) {
    return true;
  }
  return false;
}
function solveMazeUtil(maze, x, y, sol) {
  const m = maze.length;
  const n=maze[0].length;
  if (x === m- 1 && y === n - 1) {
    sol[x][y] = 1;
    return true;
  }
  if (isSafe(maze, x, y)) {
    sol[x][y] = 1;
    if (solveMazeUtil(maze, x + 1, y, sol)) return true;
    if (solveMazeUtil(maze, x, y + 1, sol)) return true;
    sol[x][y] = 0;
    return false;
  }
  return false;
}


  const back=()=>{
    const m=arr.length;
    const n=arr[0].length;
  
      var sol = new Array(m);
      let idx = 0;
      for (idx = 0; idx < m; idx++) {
        sol[idx] = new Array(n).fill(0);
      }
    if(solveMazeUtil(arr,0,0,sol)){
      for( let i=0;i<m;i++){
        for(let j=0;j<n;j++){
          if(sol[i][j]===1){
            document.getElementById(`${i}-${j}`).style.backgroundColor="green";
          }
        }
      }
    }
  
   }
    return (
        <div className="total">
              {arr.map((row,i)=>{
                    return(
                        <div className="row" key={i}>
                            {row.map((col,j)=>{
                                return(
                                    <div className="" key={j}>
                                        { i===(arr.length-1) && j === (arr.length-1)? <CellCheese row={i} col={j}/>: i===0 && j === 0? <CellRat row={i} col={j}/> :col === 0 ? <Cell row={i} col={j}/> : col === 1 ? <CellRed row={i} col={j}/> : <h1>Hola</h1> } 
                                    </div>
                                )
                            })}
                            <br/>
                        </div>
                    )
              })}
        <button onClick={back} className="btn">Find path</button>
        </div>
    )
}
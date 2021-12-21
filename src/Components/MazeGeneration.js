import React, {useState} from "react";
import {Cell} from "./Cell";
import {CellCheese} from "./CellCheese";
import {CellRat} from "./CellRat";
import {CellRed} from "./CellRed";
import "bootstrap/dist/css/bootstrap.min.css";
export const MazeGeneration = () => {
   const [number1, setNumber1] = useState(5);
   const [number2, setNumber2] = useState(5);
   const [dificult, setDificult] = useState(2);
   const [green, setGreen] = useState([]);
   const [TimeIterative, setTimeIterative] = useState(0);
   const [TimeRecursive, setTimeRecursive] = useState(0);
   const [TimeSolve, setTimeSolve] = useState(0);
   const [TimeSolvePrim, setTimeSolvePrim] = useState(0);
   const [maze, setMaze] = useState(generateMaze(number1, number2));

   const arr = maze;
   arr[0][0] = 0;
   arr[arr.length - 1][arr.length - 1] = 0;
   //Convert double array to graph with nodes and edges and weight random
   const mazeToGraph = (maze) => {
      let graph = {};
      for (let i = 0; i < maze.length; i++) {
         for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === 0) {
               graph[i + "," + j] = {};
               if (maze[i - 1] && maze[i - 1][j] === 0) {
                  graph[i + "," + j][i - 1 + "," + j] = Math.floor(Math.random() * (3 - 1 + 1) + 1);
               }
               if (maze[i + 1] && maze[i + 1][j] === 0) {
                  graph[i + "," + j][i + 1 + "," + j] = Math.floor(Math.random() * (3 - 1 + 1) + 1);
               }
               if (maze[i][j - 1] === 0) {
                  graph[i + "," + j][i + "," + (j - 1)] = Math.floor(Math.random() * (3 - 1 + 1) + 1);
               }
               if (maze[i][j + 1] === 0) {
                  graph[i + "," + j][i + "," + (j + 1)] = Math.floor(Math.random() * (3 - 1 + 1) + 1);
               }
            }
         }
      }
      return graph;
   };

   const dfsRecursive = (graph, start, end, visited = {}) => {
      let path = [];
      if (start === end) {
         path.push(end);
         return path;
      }
      visited[start] = true;
      for (let neighbor in graph[start]) {
         if (!visited[neighbor]) {
            let newPath = dfsRecursive(graph, neighbor, end, visited);
            if (newPath.length > 0) {
               path.push(start);
               path.push(...newPath);
               return path;
            }
         }
      }
      return path;
   };
   const drawPath = (result_arr) => {
      for (let i = 0; i < result_arr.length; i++) {
         let x = result_arr[i].split(",")[0];
         let y = result_arr[i].split(",")[1];
         const newList = green.push({row: x, col: y});
         setGreen([...green, newList]);
         document.getElementById(`${x}-${y}`).style.backgroundColor = "green";
      }
   };

   const solvePrim = () => {
      var startTime = performance.now();
      let result = mazeToGraph(maze);
      let result_arr = dfsRecursive(result, "0,0", arr.length - 1 + "," + (arr.length - 1));
      drawPath(result_arr);
      var endTime = performance.now();
      setTimeSolvePrim(endTime - startTime);
   };

   function generateMaze(rows, cols) {
      let maze = [];
      for (let row = 0; row < rows; row++) {
         let rowArr = [];
         for (let col = 0; col < cols; col++) {
            rowArr.push(0);
         }
         maze.push(rowArr);
      }
      //Aumentar dificultad al laberinto
      for (let row = 0; row < dificult; row++) {
         let start = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
         };
         maze[start.row][start.col] = 1;
         let end = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
         };
         maze[end.row][end.col] = 1;
         let rat = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
         };
         maze[rat.row][rat.col] = 1;
         let cheese = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
         };
         maze[cheese.row][cheese.col] = 1;
         let red = {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols),
         };
         maze[red.row][red.col] = 1;
      }

      return maze;
   }

   function isSafe(arr, x, y) {
      const m = arr.length;
      const n = arr[0].length;
      if (x >= 0 && x < m && y >= 0 && y < n && arr[x][y] === 0) {
         return true;
      }
      return false;
   }
   function solveMazeUtil(maze, x, y, sol) {
      const m = maze.length;
      const n = maze[0].length;
      if (x === m - 1 && y === n - 1) {
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
   function generateMazeRecursively(rows, cols) {
      let maze = [];
      for (let row = 0; row < rows; row++) {
         let rowArr = [];
         for (let col = 0; col < cols; col++) {
            rowArr.push(0);
         }
         maze.push(rowArr);
      }
      let user = {value: dificult};
      let oldMessages = user;

      return IncrementDificult(oldMessages.value, rows, maze);
   }

   function IncrementDificult(dificult, size, maze) {
      if (dificult === 0) {
         console.log(maze);
         return maze;
      } else {
         let start = {
            row: Math.floor(Math.random() * size),
            col: Math.floor(Math.random() * size),
         };
         maze[start.row][start.col] = 1;
         let end = {
            row: Math.floor(Math.random() * size),
            col: Math.floor(Math.random() * size),
         };
         maze[end.row][end.col] = 1;
         let rat = {
            row: Math.floor(Math.random() * size),
            col: Math.floor(Math.random() * size),
         };
         maze[rat.row][rat.col] = 1;
         let cheese = {
            row: Math.floor(Math.random() * size),
            col: Math.floor(Math.random() * size),
         };
         maze[cheese.row][cheese.col] = 1;
         let red = {
            row: Math.floor(Math.random() * size),
            col: Math.floor(Math.random() * size),
         };
         maze[red.row][red.col] = 1;
         return IncrementDificult(dificult - 1, size, maze);
      }
   }

   const back = () => {
      var startTime = performance.now();

      const m = arr.length;
      const n = arr[0].length;
      var sol = new Array(m);
      let idx = 0;
      for (idx = 0; idx < m; idx++) {
         sol[idx] = new Array(n).fill(0);
      }
      if (solveMazeUtil(arr, 0, 0, sol)) {
         for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
               if (sol[i][j] === 1) {
                  const newList = green.push({row: i, col: j});
                  setGreen([...green, newList]);
                  document.getElementById(`${i}-${j}`).style.backgroundColor = "green";
               }
            }
         }
      }
      var endTime = performance.now();
      setTimeSolve(endTime - startTime);
   };
   const cleanColors = () => {
      console.log(green.length);
      for (let i = 0; i < green.length; i++) {
         if (green[i].row === undefined && green[i].col === undefined) {
         } else {
            document.getElementById(`${green[i].row}-${green[i].col}`).style.backgroundColor = "transparent";
         }
      }
   };

   const onChange = (e) => {
      setNumber1(parseInt(e.target.value));
      setNumber2(parseInt(e.target.value));
   };
   const onChange2 = (e) => {
      setNumber2(parseInt(e.target.value));
      setNumber1(parseInt(e.target.value));
   };
   const setRange = (e) => {
      setDificult(Math.floor(parseInt(e.target.value)));
   };
   const getNewMazeIteratively = () => {
      var startTime = performance.now();
      cleanColors();
      setMaze(generateMaze(number1, number2));
      setGreen([]);
      var endTime = performance.now();
      setTimeIterative(endTime - startTime);
   };
   const getNewMazeRecursively = () => {
      var startTime = performance.now();
      cleanColors();
      setMaze(generateMazeRecursively(number1, number2));
      setGreen([]);
      var endTime = performance.now();
      setTimeRecursive(endTime - startTime);
   };
   return (
      <div className="total mb-5">
         <div className="d-flex  justify-content-center">
            <div className="container">
               <h1>Maze Rat Solver</h1>

               <div className="row">
                  <div className="col-md-5">
                     <label>Width</label>
                     <input type="number" className="form-control" value={number1} onChange={onChange} />
                  </div>
                  <div className="col-md-5">
                     <label>Height</label>
                     <input type="number" className="form-control" value={number2} onChange={onChange2} />
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-10">
                     <label>Dificult {dificult}</label>
                     <input type="range" className="form-range" max="100" min="1" value={dificult} onChange={setRange} />
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-5 d-grid gap-2">
                     <button onClick={back} className="btn btn-primary mt-1 mb-1 ">
                        Solve
                     </button>
                  </div>
                  <div className="col-md-5 d-grid gap-2">
                     <button onClick={solvePrim} className="btn btn-primary mt-1 mb-1 ">
                        Solve Prim's
                     </button>
                  </div>
                  <div className="col-md-5 d-grid gap-2">
                     <button onClick={getNewMazeIteratively} className="btn btn-primary mt-1 mb-1 ">
                        Generate Iteratively
                     </button>
                  </div>
                  <div className="col-md-5 d-grid gap-2">
                     <button onClick={getNewMazeRecursively} className="btn btn-primary mt-1 mb-1 ">
                        Generate Recursively
                     </button>
                  </div>
                  <div className="col-md-5 d-grid gap-2">
                     <button onClick={cleanColors} className="btn btn-primary mt-1 mb-1 ">
                        Clear
                     </button>
                  </div>
                  <div className="col-md-5 d-grid gap-2">
                     <label>Tiempo Iterativo: {TimeIterative}</label>
                     <label>Tiempo Recursivo: {TimeRecursive}</label>
                     <label>Tiempo Para Resolver: {TimeSolve}</label>
                     <label>Tiempo Para Resolver Prim: {TimeSolvePrim}</label>
                  </div>
               </div>
            </div>
         </div>

         {arr.map((row, i) => {
            return (
               <div className="cell" key={i}>
                  {row.map((col, j) => {
                     return (
                        <div className="" key={j}>
                           {i === arr.length - 1 && j === arr.length - 1 ? (
                              <CellCheese row={i} col={j} />
                           ) : i === 0 && j === 0 ? (
                              <CellRat row={i} col={j} />
                           ) : col === 0 ? (
                              <Cell row={i} col={j} />
                           ) : col === 1 ? (
                              <CellRed row={i} col={j} />
                           ) : (
                              <h1>Hola</h1>
                           )}
                        </div>
                     );
                  })}
                  <br />
               </div>
            );
         })}
      </div>
   );
};

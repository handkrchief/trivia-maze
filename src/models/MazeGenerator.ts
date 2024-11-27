/**
 * Maze Generator class
 * 
 * This class is responsible for handling logic related to generating a maze for the game.
 * The maze is generated using a recursive backtracking algorithm (Prim's algorithm).
 * 
 * @author Ethan Moore (handkrchief)
 * @version November 11, 2024
*/
export default class MazeGenerator{


/**
 * Generates a maze of a given size sets the starting point to the beginning
 * of the array, and sets the end point as the last explored space.
 * 
 * @param {number} theSize - The size of the maze
 * @returns {number[][]} - A 2D array representing the maze
*/
public mazeGeneration(theSize:number):number[][]{
    
    let theMaze: number[][] = Array.from({ length: theSize }, () => Array(theSize).fill(0));
    theMaze[0][0] = 1;
   
    let neighbors:number[][] = [];
    this.addNeighboringWalls({theRow:0, theCol:0, theNeighbors:neighbors, theSize});

    let myLastVisited = [0, 0];

    while(neighbors.length > 0){
        let randomNumber: number = Math.floor(Math.random() * neighbors.length);
        let myWall: number[] = neighbors[randomNumber];
        neighbors.splice(randomNumber, 1);

        let theRow:number = myWall[0];
        let theCol:number = myWall[1];

        if(this.canCarve({theMaze, theRow, theCol})){
            theMaze[theRow][theCol] = 1;
            this.addNeighboringWalls({theRow, theCol, theNeighbors:neighbors, theSize});
            myLastVisited = [theRow, theCol];
        }
    }
    theMaze[0][0] = 5;
    theMaze[myLastVisited[0]][myLastVisited[1]] = 9;
    this.generateBonus({theMaze, theSize});
    return theMaze;
}


/**
 * Adds neighboring walls to a list of neighbors
 * 
 * @param {number} theRow - The row of the current wall
 * @param {number} theCol - The column of the current wall
 * @param {number[][]} theNeighbors - The list of neighbors to add to
 * @param {number} theSize - The size of the maze
 * @returns {void}
*/
private addNeighboringWalls({theRow, theCol, theNeighbors, theSize}:{theRow:number, theCol:number, theNeighbors:number[][], theSize:number}): void{
    if(this.isWithinBounds(theRow + 1, theCol, theSize)){
        theNeighbors.push([theRow + 1, theCol]);
    }
    if(this.isWithinBounds(theRow - 1, theCol, theSize)){
        theNeighbors.push([theRow - 1, theCol]);
    }
    if(this.isWithinBounds(theRow, theCol + 1, theSize)){
        theNeighbors.push([theRow, theCol + 1]);
    }
    if(this.isWithinBounds(theRow, theCol - 1, theSize)){
        theNeighbors.push([theRow, theCol - 1]);
    }
}


/**
 * Determines if a wall can be carved
 * 
 * @param {number[][]} theMaze - The maze
 * @param {number} theRow - The row of the wall
 * @param {number} theCol - The column of the wall
 * @returns {boolean} - True if the wall can be carved, false otherwise
 */
private canCarve({theMaze, theRow, theCol}:{theMaze:number[][], theRow:number, theCol:number}):boolean{
let numVisited:number = 0;
if(this.isWithinBounds(theRow + 1, theCol, theMaze.length) && theMaze[theRow + 1][theCol] === 1){
    numVisited++;
}
if(this.isWithinBounds(theRow - 1, theCol, theMaze.length) && theMaze[theRow - 1][theCol] === 1){
    numVisited++;
}
if(this.isWithinBounds(theRow, theCol + 1, theMaze.length) && theMaze[theRow][theCol + 1] === 1){
    numVisited++;
}
if(this.isWithinBounds(theRow, theCol - 1, theMaze.length) && theMaze[theRow][theCol - 1] === 1){
    numVisited++;
}
return numVisited === 1;
} 

/**
 * Generates a bonus room in the maze
 * 
 * @param {number[][]} theMaze - The maze
 * @param {number} theSize - The size of the maze
 * @returns {void}
*/
private generateBonus({theMaze, theSize}:{theMaze:number[][], theSize:number}){

    for(let i=0; i< theSize; i++){
        for(let j=0; j< theSize; j++){
            if(theMaze[i][j] === 1 && Math.random() * 100< 5){
                theMaze[i][j] = 4;
            }
        }
    }
}


/**
 * Determines if a given row and column are within the bounds of the maze
 * 
 * @param {number} theRow - The row
 * @param {number} theCol - The column
 * @param {number} theSize - The size of the maze
 * @returns {boolean} - True if the row and column are within the bounds of the maze, false otherwise
*/
private isWithinBounds(theRow:number, theCol:number, theSize:number){
    return theRow >= 0 && theRow < theSize && theCol >= 0 && theCol < theSize;
}






}
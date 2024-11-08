export default class MazeGenerator{

public mazeGeneration(theSize:number){
    let theMaze: number[][] = Array.from({ length: theSize }, () => Array(theSize).fill(0));
    theMaze[0][0] = 1;

    let neighbors:number[][] = [];
    this.addNeighboringWalls({theRow:0, theCol:0, theNeighbors:neighbors, theSize});

    
    while(neighbors.length > 0){
        let randomNumber: number = Math.floor(Math.random() * neighbors.length);
        let myWall: number[] = neighbors[randomNumber];
        neighbors.splice(randomNumber, 1);

        let theRow:number = myWall[0];
        let theCol:number = myWall[1];

        if(this.canCarve({theMaze, theRow, theCol})){
            theMaze[theRow][theCol] = 1;
            this.addNeighboringWalls({theRow, theCol, theNeighbors:neighbors, theSize});
        }
    }
    theMaze[0][0] = 5;
    theMaze[theSize - 1][theSize - 1] = 9;
    this.generateBonus({theMaze, theSize});
    return theMaze;
}

private addNeighboringWalls({theRow, theCol, theNeighbors, theSize}:{theRow:number, theCol:number, theNeighbors:number[][], theSize:number}){
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

private canCarve({theMaze, theRow, theCol}:{theMaze:number[][], theRow:number, theCol:number}){
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
private generateBonus({theMaze, theSize}:{theMaze:number[][], theSize:number}){

    for(let i=0; i< theSize; i++){
        for(let j=0; j< theSize; j++){
            if(theMaze[i][j] === 1 && Math.random() * 100< 5){
                theMaze[i][j] = 4;
            }
        }
    }
}

private isWithinBounds(theRow:number, theCol:number, theSize:number){
    return theRow >= 0 && theRow < theSize && theCol >= 0 && theCol < theSize;
}






}
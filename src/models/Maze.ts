import Room from "./Room";

/**
 * Maze class
 * 
 * This class represents a maze. It is a 2D array of Room objects, along with some other properties.
 * 
 * @author Ethan Moore
 * @author Zach Sanchez
 * @author Caleb Carroll
 * @version 1.0
*/
export default class Maze{

    /**
     * 2D array of Room objects
     */
    private myRooms:Room[][];

    /**
     * The starting room
     */
    private myStartingRoom!: Room;

    /**
     * The exit room
     */
    private myExitRoom!: Room;

    /**
     * The Size of the Maze.
     */
    private mySize: number;

    /**
     * The current room.
     */
    private myCurrentRoom: Room;
    

    constructor(theMaze:number[][]){
        let theDimensions:number = theMaze.length;
        this.myRooms = [];
        this.mySize = theDimensions;
        for(let row = 0; row < theDimensions; row++){
            this.myRooms[row] = [];
            for(let col = 0; col < theDimensions; col++){
                this.myRooms[row][col] = new Room({theRow:row, theCol:col});
            
            switch(theMaze[row][col]){
                case 5:
                    this.myRooms[row][col].setTypeAsNumber(7);
                    this.myStartingRoom = this.myRooms[row][col];
                    this.myStartingRoom.setIsOpen(true);
                    this.myCurrentRoom = this.myStartingRoom;
                    break;
                case 9:
                    this.myRooms[row][col].setTypeAsNumber(9);
                    this.myExitRoom = this.myRooms[row][col];
                    this.myExitRoom.setIsOpen(true);
                    break;
                case 1:
                    this.myRooms[row][col].setTypeAsNumber(1);
                    this.myRooms[row][col].setIsOpen(true);
                    break;
                case 4:
                    this.myRooms[row][col].setTypeAsNumber(4);
                    this.myRooms[row][col].setIsItemRoom(true);
                    this.myRooms[row][col].setIsOpen(true);
                    break;
                default:
                    break;
            }
            }
        }
        this.myCurrentRoom = this.myStartingRoom;
    }

    /**
     * Checks if the maze can be solved.
     * 
     * @param theSize - The size of the maze.
     * @returns {boolean} - True if the maze can be solved, false otherwise.
    */
    public canSolve(theSize:number):boolean {
        let theQueue:Room[] = [];
        let theVisited:boolean[][] = Array.from({length:theSize}, () => Array(theSize).fill(false));
    
        if(!this.myStartingRoom || !this.myExitRoom){
            return false;
        }
    
        theQueue.push(this.myStartingRoom);
        theVisited[this.myStartingRoom.getRow()][this.myStartingRoom.getCol()] = true;
    
        while(theQueue.length > 0){
            let theCurrentRoom = theQueue.shift();
            if(!theCurrentRoom){
                return false;
            }
    
            // Check if current room is the exit room
            if(theCurrentRoom.getRow() === this.myExitRoom.getRow() && 
               theCurrentRoom.getCol() === this.myExitRoom.getCol()){
                return true;
            }
    
            // Check all four directions
            const directions = ["north", "south", "east", "west"];
            for (let direction of directions) {
                let adjRoom = this.getAdjacentRoom({currentRoom: theCurrentRoom, direction});
                
                if(adjRoom 
                    && !theVisited[adjRoom.getRow()][adjRoom.getCol()] 
                    && adjRoom.getIsOpen())
                {
                    theQueue.push(adjRoom);
                    theVisited[adjRoom.getRow()][adjRoom.getCol()] = true;
                }
            }
        }
    
        return false;
    }
    
    /**
     * Get the starting room
     * 
     * @returns {Room} - The starting room
    */
    public getStartingRoom(): Room{
        return this.myStartingRoom;
    }

    /**
     * Get the exit room
     * 
     * @returns {Room} - The exit room
    */
    public getExitRoom() : Room{
        return this.myExitRoom;
    }

    /**
     * Get the room at a given row and column
     * 
     * @param theRow the row of the room
     * @param theCol the column of the room
     * @returns Room; the room at the given row and column, or null if not found/valid
    */
    public getAdjacentRoom({currentRoom, direction}:{currentRoom:Room, direction:string}): Room | null{
        
        if(currentRoom){
            if(!(currentRoom instanceof Room)){
                let tempRoom = new Room({theRow:currentRoom.myRow, theCol:currentRoom.myCol})
                tempRoom.fromJson(currentRoom)
                return this.getAdjacentRoom({currentRoom:tempRoom, direction});
            }

        let theRow:number = currentRoom.getRow();
        let theCol:number = currentRoom.getCol();

        switch(direction){
            case "north":
                return (theRow > 0) ? this.myRooms[theRow - 1][theCol] : null;
            case "south":
                return (theRow < this.myRooms.length - 1) ? this.myRooms[theRow + 1][theCol] : null;
            case "east":
                return (theCol < this.myRooms[0].length - 1) ? this.myRooms[theRow][theCol + 1] : null;
            case "west":
                return (theCol > 0) ? this.myRooms[theRow][theCol - 1] : null;
            default:
                return null;
        }
        }
        return null;
    }

    /**
     * Get the adjacent rooms to the current room.
     * 
     * @param theCurrentRoom - The current room.
     * @returns {Room[]} - The adjacent rooms.
    */
    private getAdjacentRooms(theCurrentRoom:Room):any[]{
        let theNorthRoom = this.getAdjacentRoom({currentRoom:theCurrentRoom, direction:"north"});
        let theSouthRoom = this.getAdjacentRoom({currentRoom:theCurrentRoom, direction:"south"});
        let theEastRoom = this.getAdjacentRoom({currentRoom:theCurrentRoom, direction:"east"});
        let theWestRoom = this.getAdjacentRoom({currentRoom:theCurrentRoom, direction:"west"});
        return [theNorthRoom, theSouthRoom, theEastRoom, theWestRoom];
    }

    /**
     * Get the maze 
     * 
     * @returns {Room[][]} - The maze
    */
    public getMaze():Room[][]{
        return this.myRooms;
    }
    /**
     * Print the maze to the console
    */

    public getCurrentRoom():Room{
        if(this.myCurrentRoom && this.myCurrentRoom instanceof Room){
            return this.myCurrentRoom;
        }
        return this.findCurrentRoom();
    }

    /**
     * Sets the maze. useful for updating, and probably useful for our save system
     * 
     * @param {Maze} - The Maze
    */
    public setMaze(theMaze: Maze):void{
        if(theMaze){
            this.myRooms = theMaze.getMaze();
        }
    }

    /**
     * Sets the room at a given row and column.
     * 
     * @param theRow - The row of the room.
     * @param theCol - The column of the room.
     * @param theRoom - The room to set.
    */
    public setRoom({theRow, theCol, theRoom}:{theRow:number, theCol:number, theRoom:Room}){
        if(theRow && theCol && this.myRooms[theRow][theCol]){
            this.myRooms[theRow][theCol] = theRoom
        }
    }



    /**
     * Sets the current room.
     * 
     * @param {theRoom} - The room to set as the current room.
    */
    public setCurrentRoom(theRoom:Room){
        this.myCurrentRoom = theRoom;
    }


    /**
     * Prints the maze to the console.
    */
    public printMaze(){
        console.log("+" + "-".repeat(this.myRooms[0].length ) + "+");
        for(let row = 0; row < this.myRooms.length; row++){
            let theRow:string = "|";
            for(let col = 0; col < this.myRooms[row].length; col++){
                let theRoom:Room = this.myRooms[row][col];
                if(theRoom.getIsItemRoom()){
                    theRow += "I";
                }else if(theRoom.getIsLocked()){
                    theRow += "L";
                }else if(theRoom === this.myStartingRoom){
                    theRow += "S";
                }else if(theRoom === this.myExitRoom){
                    theRow += "E";
                
                }else if(theRoom.getIsOpen()){
                    theRow += ".";
                } else {
                    theRow += "#";
                }
            }
            console.log(theRow + "|");

        }
        console.log("+" + "-".repeat(this.myRooms[0].length ) + "+");
    }

    /**
     * Saves the fields of the maze to JSon for saving state of the maze.
     */
    public toJson(){
        let JSon:Record<string, any> = {
            Room:[],
            start:null,
            end:null,
            size:null
        }
        JSon.rooms = this.myRooms;
        JSon.start = this.myStartingRoom;
        JSon.exit = this.myExitRoom;
        JSon.size = this.mySize;

        return JSon;
    }

    /**
     * Loads the state from JSON in local storage.
     * @param theJSon 
     */
    public fromJSon(theJSon: any){
        const loadData = JSON.parse(theJSon);
        if(loadData){
            let newRooms = [];
            if(loadData.myRooms){
                this.myRooms = loadData.myRooms;
                for(let row = 0; row < loadData.mySize; row++){
                    let newRow=[];
                    for(let col = 0; col < loadData.mySize; col++){
                        let currentRoom = loadData.myRooms[row][col];
                        
                        const tempRoom = new Room({theRow:row,theCol:col});
                        
                        if(loadData.myRooms[row][col].myQuestion){
                            tempRoom.setQuestion(currentRoom.myQuestion);
                        }
                        tempRoom.fromJson(loadData.myRooms[row][col]);
                        if(currentRoom.myTypeAsNumber == 7 || currentRoom.myTypeAsNumber == "7"){
                            this.myCurrentRoom = tempRoom;
                        }
                        newRow.push(tempRoom);
                    }
                    newRooms.push(newRow);
                }
                this.myRooms = newRooms;
            } 
            if(loadData.myStartingRoom){
                let tempStartingRoom = new Room({theRow:loadData.myStartingRoom.myRow, theCol:loadData.myStartingRoom.myCol});
                tempStartingRoom.fromJson(loadData.myStartingRoom);
                this.myStartingRoom = tempStartingRoom;
            };
            if(loadData.myExitRoom){
                let tempExitRoom = new Room({theRow:loadData.myExitRoom.myRow, theCol:loadData.myExitRoom.myCol});
                tempExitRoom.fromJson(loadData.myExitRoom);
                this.myExitRoom = tempExitRoom;
            };
            if(loadData.mySize){
                this.mySize = loadData.mySize;
            };
            
        }
    }

    /**
     * Sets an item in localStorage called "maze" using the JSON.stringify method.
     */
    public saveMaze() {
        localStorage.setItem("maze", JSON.stringify(this.toJson()));
    }

    /**
     * Calls thefromJSon method.
     */
    public loadMaze() {
        this.fromJSon(localStorage.getItem("maze"));
    
    }

    public findCurrentRoom():Room {
        let res = this.myRooms[0][0];
        if(this.myCurrentRoom && this.myCurrentRoom instanceof Room){
            res = this.myCurrentRoom;
        }else{
            for(let row = 0; row < this.myRooms.length; row++){
                for(let col = 0; col < this.myRooms[row].length; col++){
                    let theRoom = this.myRooms[row][col];
                    if(theRoom.getTypeAsNumber() == 7){
                        res = theRoom;
                    }
                }
            }
        }
        return res;
    }

}

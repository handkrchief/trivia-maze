import Room from "./Room";

export default class Maze{

    private myRooms:Room[][];
    private myStartingRoom!: Room;
    private myExitRoom!: Room;

    constructor(theMaze:number[][]){
        let theDimensions:number = theMaze.length;
        this.myRooms = [];
        for(let i = 0; i < theDimensions; i++){
            this.myRooms[i] = [];
            for(let j = 0; j < theDimensions; j++){
                this.myRooms[i][j] = new Room({theRow:i, theCol:j});
            
            switch(theMaze[i][j]){
                case 5:
                    this.myStartingRoom = this.myRooms[i][j];
                    this.myStartingRoom.setIsOpen(true);
                    break;
                case 9:
                    this.myExitRoom = this.myRooms[i][j];
                    this.myExitRoom.setIsOpen(true);
                    break;
                case 1:
                    this.myRooms[i][j].setIsOpen(true);
                    break;
                case 4:
                    this.myRooms[i][j].setIsItemRoom(true);
                    this.myRooms[i][j].setIsOpen(true);
                    break;
                default:
                    break;
            }
            }
        }
    }

    public getStartingRoom(){
        return this.myStartingRoom;
    }

    public getExitRoom(){
        return this.myExitRoom;
    }

    public getAdjacentRoom({currentRoom, direction}:{currentRoom:Room, direction:string}){
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

    public printMaze(){
        console.log("+" + "-".repeat(this.myRooms[0].length ) + "+");
        for(let i = 0; i < this.myRooms.length; i++){
            let theRow:string = "|";
            for(let j = 0; j < this.myRooms[i].length; j++){
                let theRoom:Room = this.myRooms[i][j];
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
}
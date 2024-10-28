package model;

/**
 * Represents a maze composed of rooms. The maze has a starting room and an exit room,
 * and each room can have specific attributes such as being open, having trivia questions,
 * or containing items.
 * 
 * @author Ethan Moore (handkrchief)
 * @version October 27th, 2024
 */
public class Maze {

    /** 2D array of rooms that make up the maze. */
    private Room[][] myRooms;

    /** The starting room in the maze. */
    private Room myStartingRoom;

    /** The exit room in the maze. */
    private Room myExitRoom;

    /**
     * Constructs a Maze object based on a 2D integer array where each value corresponds to
     * a different type of room. The maze grid is populated with Room objects.
     * 
     * Maze values:
     * <ul>
     * <li>5: Starting room, sets the room to be open.</li>
     * <li>9: Exit room, sets the room to be open.</li>
     * <li>1: Open path room.</li>
     * <li>4: Item room, contains a bonus item.</li>
     * </ul>
     * 
     * @param theMaze a 2D integer array representing the generated maze layout.
     */
    public Maze(int[][] theMaze) {
        int theDimensions = theMaze.length;
        myRooms = new Room[theDimensions][theDimensions];

        // Initialize the maze rooms based on the generated grid
        for (int i = 0; i < theDimensions; i++) {
            for (int j = 0; j < theDimensions; j++) {
                myRooms[i][j] = new Room(i, j); // Create a new room with coordinates

                // Set the room status based on the generated maze data
                switch (theMaze[i][j]) {
                    case 5:
                        myStartingRoom = myRooms[i][j];
                        myStartingRoom.openRoom();
                        break;
                    case 9:
                        myExitRoom = myRooms[i][j];
                        myExitRoom.openRoom();
                    case 1:
                        myRooms[i][j].openRoom();
                        break;
                    case 4:
                        myRooms[i][j].setItemRoom(true);
                        myRooms[i][j].openRoom();
                        // myRooms[i][j].setItem() to be used when items are assigned
                    default:
                        break;
                }
            }
        }
    }

    /**
     * Returns the starting room of the maze.
     * 
     * @return the starting room.
     */
    public Room getStartingRoom() {
        return myStartingRoom;
    }

    /**
     * Returns the exit room of the maze.
     * 
     * @return the exit room.
     */
    public Room getExitRoom() {
        return myExitRoom;
    }

    /**
     * Retrieves the adjacent room based on the given direction.
     * Directions are represented as strings: "north", "south", "west", or "east".
     * 
     * @param currentRoom the current room from which to find the adjacent room.
     * @param direction the direction to look for the adjacent room (north, south, west, or east).
     * @return the adjacent room in the specified direction, or null if there is no room in that direction.
     */
    public Room getAdjacentRoom(Room currentRoom, String direction) {
        int myRow = currentRoom.getRow();
        int myCol = currentRoom.getCol();

        switch (direction.toLowerCase()) {
            case "north":
                return (myRow > 0) ? myRooms[myRow - 1][myCol] : null;
            case "south":
                return (myRow < myRooms.length - 1) ? myRooms[myRow + 1][myCol] : null;
            case "west":
                return (myCol > 0) ? myRooms[myRow][myCol - 1] : null;
            case "east":
                return (myCol < myRooms[0].length - 1) ? myRooms[myRow][myCol + 1] : null;
            default:
                return null; // Invalid direction
        }
    }
}

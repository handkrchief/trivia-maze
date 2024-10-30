package model;

/**
 * Represents a room in the maze that can either be open or closed (similar to a wall).
 * A room can have a question and/or an item.
 * 
 * @author Zach Sanchez (zachs00)
 * @author Ethan Moore (handkrchief)
 * @version October 27th, 2024
 */
public class Room {

    /** Coordinates of the room in the maze */
    private final int myRow, myCol;
    
    /** Indicates whether the room is open or closed (wall vs path). */
    private boolean isOpen;
    
    /** Indicates whether the room is locked (due to incorrect answer). */
    private boolean isLocked;
    
    /** Indicates whether the room is a bonus item room or not. */
    private boolean isItemRoom;
    
    /** Indicates whether the question of the room has been answered or not. */
    private boolean isAnswered;
    
    /** The question that must be answered in the room. */
    private final Question myQuestion;
    
    /** The item (if any) found in the room. */
    private Item myItem;

    /**
     * Constructor to initialize the Room with specified coordinates.
     * By default, the room is not open, not locked, and has no question or item.
     * 
     * @param theRow the row coordinate of the room.
     * @param theCol the column coordinate of the room.
     */
    public Room(int theRow, int theCol) {
        this.myRow = theRow;
        this.myCol = theCol;
        this.isOpen = false; // Default to not open (walls)
        this.isLocked = false;
        this.isItemRoom = false;
        this.isAnswered = false;
        this.myQuestion = null;
        this.myItem = null;
    }

    /**
     * Sets the room status to closed (turns it into a wall).
     */
    public void closeRoom() {
        this.isOpen = false;
    }

    /**
     * Sets the room status to open (turns it into a path).
     */
    public void openRoom() {
        this.isOpen = true;
    }

    /**
     * Returns whether the room is locked or not.
     * 
     * @return true if the room is locked, false otherwise.
     */
    public boolean isLocked() {
        return isLocked;
    }

    /**
     * Sets the room's lock status.
     * 
     * @param isLocked true to lock the room, false to unlock it.
     */
    public void setLocked(boolean isLocked) {
        this.isLocked = isLocked;
    }

    /**
     * Returns whether the room was generated with an item inside.
     * 
     * @return true if the room was generated with an item, false otherwise.
     */
    public boolean isItemRoom() {
        return isItemRoom;
    }

    /**
     * Sets whether the room should contain an item.
     * 
     * @param isItemRoom true to make the room an item room, false otherwise.
     */
    public void setItemRoom(boolean isItemRoom) {
        this.isItemRoom = isItemRoom;
    }

    /**
     * Retrieves the column index of the room.
     * 
     * @return the column index of the room.
     */
    public int getCol() {
        return myCol;
    }

    /**
     * Retrieves the row index of the room.
     * 
     * @return the row index of the room.
     */
    public int getRow() {
        return myRow;
    }

    /**
     * Checks if the room contains an item currently.
     * 
     * @return true if the room contains an item currently, false otherwise.
     */
    public boolean hasItem() {
        return this.myItem != null;
    }

    /**
     * Retrieves the item in the room.
     * 
     * If the room does not contain an item, this method will print a message
     * and return null.
     * 
     * @return the item in the room, or null if no item is present.
     */
    public Item getItem() {
        return myItem;
    }

    /**
     * Sets the item in the room. The item can be set to null to remove it.
     * 
     * @param theItem the item to be set, or null if the room has no item.
     */
    public void setItem(Item theItem) {
        this.myItem = theItem;
    }
    
    /**
     * Checks if the rooms question has been answered.
     * 
     * @return true if the question has been answered, false otherwise.
     */
    public boolean isAnswered() {
    	return this.isAnswered;
    }
    
    /**
     * Sets the answer status of the room's question to true.
     */
    public void setAnswered() {
    	this.isAnswered = true;
    }

    /**
     * Retrieves the question associated with the room.
     * 
     * @return the question in the room.
     */
    public Question getQuestion() {
        return this.myQuestion;
    }

    /**
     * Validates and sets the question for the room.
     * Ensures that the question is not null. Throws an IllegalArgumentException if the question is null.
     * 
     * @param theQuestion the question to be set in the room.
     * @return the validated question.
     * @throws IllegalArgumentException if theQuestion is null.
     */
    private Question setQuestion(Question theQuestion) {
        if (theQuestion != null) {
            return theQuestion;
        }
        throw new IllegalArgumentException("setQuestion: the Question provided was null.");
    }
}

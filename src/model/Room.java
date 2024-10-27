package model;

/**
 * Represents a room in the maze that can either be open or closed, so i guess its sort of a wall too.
 * A room can have a question and (maybe) item.
 * 
 * @author Zach Sanchez (zachs00)
 * @version October 27th, 2024
 */
public class Room {

    /** Indicates whether the room is open or closed (wall vs path). */
    private boolean isOpen;
    
    /** The question that must be answered in the room. */
    private final Question myQuestion;
    
    /** The item (if any) found in the room. */
    private final Item myItem;

    /**
     * Constructs a Room with the specified open status, question, and item.
     * 
     * @param theOpenStatus whether the room is open (true) or closed (false).
     * @param theQuestion the question associated with the room.
     * @param theItem the item found in the room, can be null if no item is present.
     * @throws IllegalArgumentException if theQuestion is null.
     */
    public Room(boolean theOpenStatus, Question theQuestion, Item theItem) {
        myQuestion = this.setQuestion(theQuestion);
        myItem = this.setItem(theItem);
        isOpen = theOpenStatus;
    }

    /**
     * Sets room status to closed.
     */
    public void closeRoom() {
        this.isOpen = false;
    }

    /**
     * Sets Room status to open.
     */
    public void openRoom() {
        this.isOpen = true;
    }

    /**
     * Checks if the room contains an item.
     * 
     * @return true if the room contains an item, false otherwise.
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
        if (!this.hasItem()) {
            System.out.println("The room has no item, so return null.");
        } else {
            System.out.println("The room has Power: " + myItem.getItemType() + "!");
        }
        return myItem;
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
     * Ensures that the question is not null. Throws an IllegalArgumentException if the question is null.
     * 
     * @param theQuestion.
     * @return the validated question.
     * @throws IllegalArgumentException if theQuestion is null.
     */
    private Question setQuestion(Question theQuestion) {
        if (theQuestion != null) {
            return theQuestion;
        }
        throw new IllegalArgumentException("setQuestion: the Question provided was null.");
    }

    /**
     * Ensures that the item is not null. If the item is null, the room will not have an item.
     * 
     * @param theItem the item to be set, or null if the room has no item.
     * @return the item if valid, or null if no item is present.
     */
    private Item setItem(Item theItem) {
        if (theItem != null) {
            return theItem;
        }
        return null;
    }
}

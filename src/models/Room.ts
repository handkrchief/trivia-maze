import Item from "./Item";
import Question from "./Question";

/**
 * Room class
 * 
 * Represents a room in the game
 * 
 * @author Zach Sanchez
 * @author Ethan Moore
 * @version 1.0
 */
export default class Room {

    /**
     * The row of the room 
     */
    private myRow: number;
    /**
     * The column of the room
     */
    private myCol: number;
    /**
     * Whether the room is open
     */
    private isOpen: boolean;
    /**
     * Whether the room is locked
     */
    private isLocked: boolean;
    /**
     * Whether the room is an item room
     */
    private isItemRoom: boolean;
    /**
     * Whether the room is answered
     */
    private isAnswered: boolean;
    /**
     * The question in the room
     */
    private myQuestion?: Question;
    /**
     * The item in the room
     */
    private myItem?: Item;

    /**
     * The type of the room as a number
     */
    private myTypeAsNumber: number;
    
    /**
     * Constructor for the Room class
     * 
     * @param {number} theRow - The row of the room
     * @param {number} theCol - The column of the room
     */
    constructor({theRow, theCol}:{theRow:number, theCol:number}){
        this.myRow = theRow;
        this.myCol = theCol;
        this.isOpen = false;
        this.isLocked = false;
        this.isItemRoom = false;
        this.isAnswered = false;
        this.myQuestion = undefined;
        this.myItem = undefined;
        this.myTypeAsNumber = 0;
    }

    /**
     * Gets the item in the room
     * 
     * @returns {Item} - The item in the room
     */
    public getItem(){
        return this.myItem;
    }
    
    /**
     * Gets the question in the room
     * 
     * @returns {Question} - The question in the room
     */
    public getQuestion(){
        return this.myQuestion;
    }

    /**
     * Gets the row of the room
     * 
     * @returns {number} - The row of the room
     */
    public getRow(){
        return this.myRow;
    }

    /**
     * Gets the column of the room
     * 
     * @returns {number} - The column of the room
     */
    public getCol(){
        return this.myCol;
    }

    /**
     * Gets whether the room is locked
     * 
     * @returns {boolean} - Whether the room is locked
     */
    public getIsLocked(){
        return this.isLocked;
    }

    /**
     * Gets whether the room is open
     * 
     * @returns {boolean} - Whether the room is open
     */
    public getIsOpen(){
        return this.isOpen;
    }

    /**
     * Gets whether the room is an item room
     * 
     * @returns {boolean} - Whether the room is an item room
     */
    public getIsItemRoom(){
        return this.isItemRoom;
    }

    /**
     * Gets whether the room is answered
     * 
     * @returns {boolean} - Whether the room is answered
     */
    public getIsAnswered(){
        return this.isAnswered;
    }

    /** 
     * Gets the type of the room as a number
     * 
     * @returns {number} - The type of the room as a number
     */
    public getTypeAsNumber(){
        return this.myTypeAsNumber;
    }

    /**
     * Sets the item in the room
     * 
     * @param {Item} item - The item to set
     */
    public setItem(item:Item){
        if(item !== null){
            this.myItem = item;
            return;
        }
        throw new Error("Item cannot be null");
    }
    
    /**
     * Sets the question in the room
     * 
     * @param {Question} question - The question to set
     */
    public setQuestion(question:Question){
        if(question !== null){
            this.myQuestion = question;
            return;
        }
        throw new Error("Question cannot be null");
    }

    public setRow(row:number){
        if(row !== null){
            this.myRow = row;
            return;
        }
        throw new Error("Row cannot be null");
    }

    public setCol(col:number){
        if(col !== null){
            this.myCol = col;
            return;
        }
        throw new Error("Column cannot be null");
    }   

    /**
     * Sets whether the room is answered
     * 
     * @param {boolean} answeredStatus - Whether the room is answered
     */
    public setIsAnswered(answeredStatus:boolean){
        if(answeredStatus !== null){
            this.isAnswered = answeredStatus;
            
        }
    }

    /**
     * Sets whether the room is an item room
     * 
     * @param {boolean} itemRoomStatus - Whether the room is an item room
     */
    public setIsItemRoom(itemRoomStatus:boolean){
        if(itemRoomStatus !== null){
            this.isItemRoom = itemRoomStatus;
        }
    }

    /**
     * Sets whether the room is locked
     * 
     * @param {boolean} lockedStatus - Whether the room is locked
     */
    public setIsLocked(lockedStatus:boolean){
        if(lockedStatus !== null){
            this.isLocked = lockedStatus;
        }
    }

    /**
     * Sets whether the room is open
     * 
     * @param {boolean} openStatus - Whether the room is open
     */
    public setIsOpen(openStatus:boolean){
        if(openStatus !== null){
            this.isOpen = openStatus;
        }
    }

    /**
     * Sets the type of the room as a number
     * 
     * @param {number} typeAsNumber - The type of the room as a number
     */
    public setTypeAsNumber(typeAsNumber:number){
        this.myTypeAsNumber = typeAsNumber;
    }

    /**
     * Checks if the room has an item
     * 
     * @returns {boolean} - Whether the room has an item
     */
    public hasItem(){
        return this.myItem !== undefined;
    }

    /**
     * Removes the item from the room
     */
    public removeItem(){
        this.myItem = undefined;
    }

    public fromJson(theJson:any){
        if(theJson){
            this.myRow = theJson.myRow;
            this.myCol = theJson.myCol;
            this.isOpen = theJson.isOpen;
            this.isLocked = theJson.isLocked;
            this.isItemRoom = theJson.isItemRoom;
            this.isAnswered = theJson.isAnswered;
            this.myQuestion = theJson.myQuestion;
            if(theJson.myItem) this.myItem = theJson.myItem;
            this.myTypeAsNumber = theJson.myTypeAsNumber;
        }
    }

}
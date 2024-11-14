import Item from "./Item";
import Room from "./Room";

export default class Player {
    
    /**
     * @type {Room} The room the player is currently in
    */
    private myCurrentRoom!: Room;

    /**
     * @type {number} The player's score
    */
    private myScore!: number;

    /**
     * @type {Item[]} The player's items
    */
    private myItems!: Item[];

    constructor(startingRoom: Room) {
        this.myCurrentRoom = startingRoom;
        this.myScore = 0;
        this.myItems = [];
    }

    /**
     * @returns {Room} The player's current room
    */
    public getRoom(): Room {
        return this.myCurrentRoom;
    }

    /** 
     * @returns {number} The player's score
    */
    public getScore(): number {
        return this.myScore;
    }

    /**
     * @param {number} theScore The score to set the player's score to
     * @returns {void}
    */
    public setScore(theScore: number):void {
        this.myScore = theScore;
    }

    /**
     * @param {Room} theRoom The room to set the player's current room to
     * @returns {void}
    */
    public setRoom(theRoom: Room):void {
        this.myCurrentRoom = theRoom;
    }

    /**
     * @param {Item} theItem The item to add to the player's items
     * @returns {void}
    */
    public addItem(theItem: Item):void {
        this.myItems.push(theItem);
    }

    /**
     * @param {Item} theItem The item to remove from the player's items
     * @returns {Item | null} The item that was removed, or null if the item was not found
    */
    public useItem(theItem: Item):Item | null {
        for(var item of this.myItems) {
            if(item.getItemType() === theItem.getItemType()) {
                this.myItems.splice(this.myItems.indexOf(item), 1);
                return item;    
            }
        }
        return null;
    }
}
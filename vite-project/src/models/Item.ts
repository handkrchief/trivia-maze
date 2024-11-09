/**
 * Item class
 * 
 * Represents an item in the game
 * 
 * @author Zach Sanchez
 * @version 1.0
*/

export default class Item {

    /*
     * The type of item as a string ("50-50", "Phone-a-Friend"")
    */
    private myItemType!: string;

    /**
     * Constructor
     * 
     * @param theItemType the type of item as a string
    */
    constructor(theItemType: string) {
        this.myItemType = this.setItemType(theItemType);
    }

    /**
     * Get the item type
     * 
     * @returns {string} - The item type
    */
    public getItemType(): string {
        return this.myItemType;
    }
    /**
     * 
     * @param {string} theItemType - The item type to set
     * @returns {string} - The item type as a string
    */
    public setItemType(theItemType: string): string {
        if(theItemType.length === 0) {
            throw new Error("Item type cannot be empty");
        }
        return theItemType;
    }
    
    /**
     * Returns the item type as a string - prob not needed, but added as was in java version
     * 
     * @returns {string} - The item type as a string
    */
    public toString(): string {
        console.log("Item type: " + this.myItemType);
        return this.myItemType;
    }
}

package model;

/**
 * Represents an effect or item to be used in the questions.
 * Each item has a type, such as "50-50" or "Phone-a-Friend".
 * 
 * @author Zach Sanchez (zachs00)
 * @version October 26th, 2024
 */
public class Item {
    
    /** The type of the item (e.g., "50-50", "Phone-a-Friend"). */
    private final String myItemType;
    
    /**
     * Constructs an Item object with the specified type.
     * 
     * @param theItemType the type of the item, ("50-50" or "Phone-a-Friend").
     * @throws IllegalArgumentException if the item type is null or empty.
     */
    public Item(String theItemType) {
        myItemType = this.setItemType(theItemType);
    }
    
    /**
     * Gets the type of this item.
     * 
     * @return the item type as a string.
     */
    public String getItemType() {
        return this.myItemType;
    }
    
    /**
     * Validates and sets the item type.
     * 
     * This method checks that the item type is not null or empty. If the validation fails,
     * an IllegalArgumentException is thrown.
     * 
     * @param theItemType the type of the item to be validated.
     * @return the validated item type string.
     * @throws IllegalArgumentException if the item type is null or empty.
     */
    private String setItemType(final String theItemType) {
        if (theItemType != null && theItemType.length() > 0) {
            return theItemType;
        }
        throw new IllegalArgumentException("Invalid Argument: theItemType string was blank/null.");
    }

    public String toString(){
    	return this.getItemType();
    }

}

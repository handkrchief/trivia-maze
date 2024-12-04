/**
 * Jest tests written for the Item.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import Item from "../src/models/Item"

describe('Item Class', () => {
    // Constructor tests
    describe('constructor', () => {
        it('should create item with initial type', () => {
            const myItem = new Item('50-50');
            expect(myItem.getItemType()).toBe('50-50');
        });

        it('should throw an error when created with an empty type', () => {
            expect(() => new Item('')).toThrow('Item type cannot be empty');
        });
    });

    // Method tests
    describe('getItemType', () => {
        it('should return the item type as a string', () => {
            const item = new Item('50-50');
            expect(item.getItemType()).toBe('50-50');
        });
    });

    describe('setItemType', () => {
        it('should set the item type', () => {
            const item = new Item('Phone-a-Friend');
            expect(item.setItemType('50-50')).toBe('50-50');
        });
    });
});

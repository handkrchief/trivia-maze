/**
 * Jest tests written for the Room.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import Room from '../src/models/Room';
import Item from '../src/models/Item';
import Question from '../src/models/Question';

describe('Room Class', () => {
    // Constructor tests
    describe('constructor', () => {
        it('should initialize with the correct default values', () => {
            const myRoom = new Room({ theRow: 1, theCol: 2});

            // Check initial position
            expect(myRoom.getRow()).toBe(1);
            expect(myRoom.getCol()).toBe(2);

            // Check default states
            expect(myRoom.getIsOpen()).toBe(false);
            expect(myRoom.getIsLocked()).toBe(false);
            expect(myRoom.getIsAnswered()).toBe(false);
            expect(myRoom.getIsItemRoom()).toBe(false);

            // Check undefined properties
            expect(myRoom.getItem()).toBeUndefined();
            expect(myRoom.getQuestion()).toBeUndefined();

            // Check default type
            expect(myRoom.getTypeAsNumber()).toBe(0);
        });
    });
    
    // Method tests
    describe('item management methods', () => {
        it('should and get the item correctly', () => {
            const myRoom = new Room({ theRow: 0, theCol: 0});
            const myItem = new Item('50-50');

            myRoom.setItem(myItem);
            expect(myRoom.getItem()).toBe(myItem);
        })

        it('should check for an item and remove an item correctly', () => {
            const myRoom = new Room({ theRow: 0, theCol: 0});
            const myItem = new Item('50-50');

            myRoom.setItem(myItem);
            expect(myRoom.hasItem()).toBeTruthy;
            myRoom.removeItem;
            expect(myRoom.hasItem()).toBeFalsy;
        })
    })
})
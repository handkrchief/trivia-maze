/**
 * Jest tests written for the Player.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import Player from '../src/models/Player';
import Room from '../src/models/Room';
import Item from '../src/models/Item';

describe('Player Class', () => {
  // Constructor tests
  describe('constructor', () => {
    it('should create player with initial room', () => {
      const myStartRoom = new Room({ theRow: 0, theCol: 0 });
      const myPlayer = new Player(myStartRoom);
      
      expect(myPlayer.getRoom()).toBe(myStartRoom);
      expect(myPlayer.getScore()).toBe(0);
      expect(myPlayer.getItems()).toEqual([]);
    });
  });

  // Method tests
  describe('methods', () => {
    let myPlayer: Player;
    let myRoom: Room;

    beforeEach(() => {
      myRoom = new Room({ theRow: 0, theCol: 0 });
      myPlayer = new Player(myRoom);
    });

    it('should update score', () => {
      myPlayer.setScore(10);
      expect(myPlayer.getScore()).toBe(10);
    });

    it('should move to new room', () => {
      const newRoom = new Room({ theRow: 1, theCol: 1 });
      myPlayer.setRoom(newRoom);
      expect(myPlayer.getRoom()).toBe(newRoom);
    });

    it('should add items to inventory', () => {
        const item = new Item('50-50');
        myPlayer.addItem(item);
        expect(myPlayer.getItems()).toContainEqual(item);
    })
  });
});
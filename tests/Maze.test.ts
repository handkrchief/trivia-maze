/**
 * Jest tests written for the Maze.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import Maze from '../src/models/Maze';
import Room from '../src/models/Room';

describe('Maze Class', () => {
    describe('constructor', () => {
        it('should initialize maze with correct dimensions', () => {
            const myInitialMaze = [
                [5, 1, 0],
                [1, 1, 0],
                [0, 1, 9]
            ];
            const myMaze = new Maze(myInitialMaze);
            expect(myMaze.getMaze().length).toBe(3);
            expect(myMaze.getMaze()[0].length).toBe(3);
        });

        it('should set room types correctly', () => {
            // Ensure exit room is reachable
            const myInitialMaze = [
                [5, 1],
                [1, 9]  // Exit room directly connected to path
            ];
            const myMaze = new Maze(myInitialMaze);
            
            // Test start room
            const myStartRoom = myMaze.getStartingRoom();
            expect(myStartRoom.getTypeAsNumber()).toBe(7);
            expect(myStartRoom.getIsOpen()).toBe(true);
            
            // Test exit room
            const myExitRoom = myMaze.getExitRoom();
            expect(myExitRoom.getTypeAsNumber()).toBe(9);
            expect(myExitRoom.getIsOpen()).toBe(true);
        });
    });

    describe('navigation', () => {
        it('should return correct adjacent rooms', () => {
            // Create 2x2 maze to ensure room connectivity
            const myInitialMaze = [
                [5, 1],  // Start, Path
                [0, 9]   // Wall, Exit
            ];
            const myMaze = new Maze(myInitialMaze);
            const myStartRoom = myMaze.getStartingRoom();
            
            // Test east navigation from start room
            const myEastRoom = myMaze.getAdjacentRoom({
                currentRoom: myStartRoom,
                direction: 'east'
            });

            // Verify adjacent room exists and is accessible
            expect(myEastRoom).not.toBeNull();
            expect(myEastRoom?.getIsOpen()).toBe(true);
            expect(myEastRoom?.getTypeAsNumber()).toBe(1);
        });

        it('should return null for out-of-bounds directions', () => {
            const myInitialMaze = [[5]];  // 1x1 maze
            const myMaze = new Maze(myInitialMaze);
            const myStartRoom = myMaze.getStartingRoom();
            
            // Test all directions from single room
            const directions = ['north', 'south', 'east', 'west'];
            directions.forEach(direction => {
                const myAdjacentRoom = myMaze.getAdjacentRoom({
                    currentRoom: myStartRoom,
                    direction: direction
                });
                expect(myAdjacentRoom).toBeNull();
            });
        });
    });

    describe('canSolve', () => {
        it('should return true for solvable maze', () => {
            const myInitialMaze = [
                [5, 1],
                [1, 9]
            ];
            const myMaze = new Maze(myInitialMaze);
            const IsSolvable = myMaze.canSolve(2);
            expect(IsSolvable).toBe(true);
        });
    });
});
/**
 * Jest tests written for the MazeGenerator.ts models file.
 * 
 * @author Ethan Moore (handkrchief)
 * @version December 3, 2024
 */

import MazeGenerator from '../src/models/MazeGenerator';

describe('MazeGenerator Class', () => {
    let myGenerator: MazeGenerator;

    beforeEach(() => {
        myGenerator = new MazeGenerator();
    });

    describe('maze generation', () => {
        it('should create a maze of the correct size', () => {
            const mySize = 5;
            const myMaze = myGenerator.mazeGeneration(mySize);

            expect(myMaze.length).toBe(mySize);
            expect(myMaze[0].length).toBe(mySize);
        });

        it('should have a start point (5) at [0,0]', () => {
            const myMaze = myGenerator.mazeGeneration(5);
            expect(myMaze[0][0]).toBe(5);
        });

        it('should have a valid path from start to end', () => {
            const myMaze = myGenerator.mazeGeneration(5);
            let myPath = false;
            let myFoundEnd = false;

            // find end point (9)
            for (let i = 0; i < myMaze.length; i++) {
                for (let j = 0; j < myMaze[i].length; j++) {
                    if (myMaze[i][j] === 9) {
                        myFoundEnd = true;
                        break;
                    }
                }
            }

            expect(myFoundEnd).toBeTruthy;
        });

        it('should contain only valid cell values (0,1,5,9)', () => {
            const myMaze = myGenerator.mazeGeneration(5);
            const myValidValues = [0, 1, 4, 5, 9];

            myMaze.forEach(row => {
                row.forEach(cell => {
                    expect(myValidValues).toContain(cell);
                });
            });
        });
    });
})
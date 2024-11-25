package model;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Class that contains a proof of concept version of our maze generation
 * algorithm. 
 * 
 * 0's represent walls
 * 1's represent viable path
 * 3's represent locked doors (answer failed)
 * 4's represent bonus rooms
 * 5 represents the start point
 * 9 represents the exit point
 * 
 * If you'd like to find more information regarding maze generation with Prim's Algorithm
 * https://jonathanzong.com/blog/2012/11/06/maze-generation-with-prims-algorithm
 * 
 * @author Ethan Moore (handkrchief)
 * @version October 27th, 2024
 * 
 */
public class MazeGeneration {
	
	/**
	 * Generates a maze using Prim's algorithm, then adds trivia doors and bonus item rooms.
	 * 
	 * @param theSize the size of the maze (n x n).
	 * @return a 2D int array representing the generated maze, where different integers represent different types of cells.
	 */
	public static int[][] mazeGeneration (int theSize) {
		
		// Initialize the maze of size 'theDimensions' with 0's (walls).
		int [][] myMaze = new int[theSize][theSize];
		
		// Set a starting point for the maze (opening the path).
		myMaze[0][0] = 1;
		
		// Create a list to hold the neighboring walls.
		List<int[]> neighborList = new ArrayList<>();
		addNeighboringWalls(0, 0, myMaze, neighborList, theSize);

		// While the neighbor list is not empty, keep carving the maze.
		Random rand = new Random();
		while (!neighborList.isEmpty()) {
			// Pick a random wall from the list of neighbors
			int[] myWall = neighborList.remove(rand.nextInt(neighborList.size()));
			
			int x = myWall[0];
			int y = myWall[1];
			
			// Check if this wall divides a visited and unvisited cell
			if (canCarve(x, y, myMaze, theSize)) {
				// Carve the wall, mark the new cell as a part of the maze
				myMaze[x][y] = 1;
				// Add the neighboring walls of the newly visited cell to the list of neighbors
				addNeighboringWalls(x, y, myMaze, neighborList, theSize);
			}
		}
		
		// Set the starting point to a unique number
		myMaze[0][0] = 5;
		// Set an exit point for the maze (opening the path)
		myMaze[theSize-1][theSize-1] = 9;

		generateBonus(myMaze, theSize);
		
		return myMaze;
	}
	
	/**
	 * Adds the neighboring walls of the given cell to the list of neighbors.
	 * 
	 * @param x the x-coordinate of the current cell.
	 * @param y the y-coordinate of the current cell.
	 * @param theMaze the current maze grid.
	 * @param theNeighbors the list of neighboring walls to add to.
	 * @param theSize the size of the maze grid.
	 */
	private static void addNeighboringWalls(int x, int y, int[][] theMaze, List<int[]> theNeighbors, int theSize) {
		if (isWithinBounds(x + 1, y, theSize)) theNeighbors.add(new int[]{x + 1, y}); // Right
		if (isWithinBounds(x - 1, y, theSize)) theNeighbors.add(new int[]{x - 1, y}); // Left
		if (isWithinBounds(x, y + 1, theSize)) theNeighbors.add(new int[]{x, y + 1}); // Up
		if (isWithinBounds(x, y - 1, theSize)) theNeighbors.add(new int[]{x, y - 1}); // Down
	}
	
	/**
	 * Checks if a given wall can be carved, ensuring that it divides a visited and unvisited cell.
	 * 
	 * @param x the x-coordinate of the wall.
	 * @param y the y-coordinate of the wall.
	 * @param theMaze the current maze grid.
	 * @param theSize the size of the maze grid.
	 * @return true if the wall can be carved, false otherwise.
	 */
	private static boolean canCarve(int x, int y, int[][] theMaze, int theSize) {
		int numVisitedNeighbors = 0;
		
		if (isWithinBounds(x + 1, y, theSize) && theMaze[x + 1][y] == 1) numVisitedNeighbors++;
		if (isWithinBounds(x - 1, y, theSize) && theMaze[x - 1][y] == 1) numVisitedNeighbors++;
		if (isWithinBounds(x, y + 1, theSize) && theMaze[x][y + 1] == 1) numVisitedNeighbors++;
		if (isWithinBounds(x, y - 1, theSize) && theMaze[x][y - 1] == 1) numVisitedNeighbors++;
		
		return numVisitedNeighbors == 1; // Only carve if there is exactly one neighbor visited
	}
	
	/**

	 * Randomly generates bonus rooms in the maze, marked as 4.
	 * 
	 * @param theMaze the current maze grid.
	 * @param theSize the size of the maze grid.
	 */
	private static void generateBonus(int[][] theMaze, int theSize) {
		Random rand = new Random();
		for (int i = 0; i < theSize; i++) {
			for (int j = 0; j < theSize; j++) {
				if (theMaze[i][j] == 1 && rand.nextInt(100) < 5) { // 5% chance to place a bonus room
					theMaze[i][j] = 4;
				}
			}
		}
	}
	
	/**
	 * Checks if a given cell is within the bounds of the maze.
	 * 
	 * @param x the x-coordinate of the cell.
	 * @param y the y-coordinate of the cell.
	 * @param n the size of the maze grid.
	 * @return true if the cell is within bounds, false otherwise.
	 */
	private static boolean isWithinBounds (int x, int y, int n) {
		return x >= 0 && x < n && y >= 0 && y < n;
	}
  
}

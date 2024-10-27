/**
 * 
 */
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Class that contains a proof of concept version of our maze generation
 * algorithm. 
 * 
 * 0's represent walls
 * 1's represent viable path
 * 
 */
public class MazeGeneration {

	
	public static int[][] mazeGeneration (int theDimensions){
		
		// Initalize the maze of size 'theDimensions' with 0's (walls).
		int [][] myMaze = new int[theDimensions][theDimensions];
		
		// Set a starting point for the maze (opening the path).
		myMaze[0][0] = 1;
		
		// Create a list to hold the neighboring walls.
		List<int[]> neighborList = new ArrayList<>();
		// Add neighboring walls of the starting cell (0,0)
		if (isWithinBounds(0,1, theDimensions)) neighborList.add(new int[] {0,1});
		if (isWithinBounds(1,0, theDimensions)) neighborList.add(new int[] {1,0});
		
		
		// Set an exit point for the maze (opening the path).
		myMaze[theDimensions-1][theDimensions-1] = 1;
		
		return myMaze;
		
	}
	
	private static boolean isWithinBounds (int x, int y, int n) {
		return x >= 0 && x < n && y >= 0 && y < n;
	}

	public static void main(String[] args) {
		
		int n = 5;
		
		int[][] myMaze = mazeGeneration(n);
		
		for (int[] x : myMaze)
		{
		   for (int y : x)
		   {
		        System.out.print(y + " ");
		   }
		   System.out.println();
		}
	}

}

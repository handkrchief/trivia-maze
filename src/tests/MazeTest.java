package tests;

import static org.junit.jupiter.api.Assertions.*;
import model.Maze;
import model.Room;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Tests for the Maze class.
 * @author Ethan Moore (handkrchief)
 * 
 */
public class MazeTest {
    private Maze myMaze;
    private int[][] testMazeArray = {
        {5, 1, 1, 1},
        {0, 1, 0, 0},
        {0, 1, 4, 1},
        {0, 0, 0, 9}
    };

    @BeforeEach
    public void setUp() {
        myMaze = new Maze(testMazeArray);
    }

    @Test
    public void testStartingRoom() {
        Room startingRoom = myMaze.getStartingRoom();
        assertNotNull(startingRoom, "Starting room should not be null.");
        assertEquals(0, startingRoom.getRow(), "Starting room row should be 0.");
        assertEquals(0, startingRoom.getCol(), "Starting room column should be 0.");
    }

    @Test
    public void testExitRoom() {
        Room exitRoom = myMaze.getExitRoom();
        assertNotNull(exitRoom, "Exit room should not be null.");
        assertEquals(3, exitRoom.getRow(), "Exit room row should be 3.");
        assertEquals(3, exitRoom.getCol(), "Exit room column should be 3.");
    }

    @Test
    public void testItemRoom() {
        assertEquals(4, testMazeArray[2][2], "The value at (2,2) in testMazeArray should be 4.");
    }
}

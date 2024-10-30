package model;

import java.util.Scanner;

/**
 * Represents an instance of the TriviaMaze game. 
 * Contains the general objects like the Maze for the game, the Player of the game
 * as well as methods necessary for handling the start, end, and save states of the game.
 *
 * @author calebca (cabedev69)
 * 
 * @version October 28th, 2024
 */
public class Game {
    
    /**
     * My idea for saving and loading the game is just to use serialization.
     * I did some research on it and I know that Ethan and I
     * have done it last quarter for another project.
     * It seems to be the simplest way to save the state of the game.
     * The Maze object should countain a 2D array of all the rooms,
     * and each of the rooms also has its own data that will be saved.
     * I believe the Maze object and potentially the data from the Player object
     * would be all we need to save and load the state of the game.
     * -Caleb
     */
    
  private Maze myMaze;
  
  //private Player myPlayer; //commented out until player class is created to avoid error.
  
  /**
   * Responsible for handling the start of the game.
   * Starting the game could include choosing the size of the maze to be completed.
   */
  private void startGame() {
      System.out.println("Enter the size of the maze: ");
      Scanner sc1 = new Scanner(System.in);
      sc1.close();
      int mazeSize = Integer.parseInt(sc1.toString());
      myMaze = new Maze(MazeGeneration.mazeGeneration(mazeSize));
  }

  /**
   * Responsible for handling the end of the game.
   * Saves the state of the game at its current stopping point.
   */
  private void endGame() {
      //TO-DO
  }
  
  /**
   * Responsible for saving the state of the game to a file.
   * Uses a JFileChooser or some other method of file choosing
   * to direct the save files' location and name.
   * Used to save the game at a point that the player desires.
   */
  private void saveGame() {
      //TO-DO
  }
  
  /**
   * Loads a file that contains save state information.
   * All data relevant to the state of the game, will be loaded
   * for a continuation of the loaded saves session.
   */
  private void loadGame() {
      //TO-DO
  }
  
  
  //  private void setMaze(final Maze theMaze) {
  //      this.myMaze = theMaze;
  //  }
}

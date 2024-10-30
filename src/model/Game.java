package model;

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
     * After doing some research I think we should use serialization to
     * save and load the state of the game. It seems like the most simple option.
     * we would just have this Game class implement serializable, and then saveGame 
     * and loadGame would call writeObject() and readObject() respectively.
     * 
     * -Caleb
     */
    
  private Maze myMaze;
  
  //private Player myPlayer; //commented out until player class is created to avoid error.
  
  /**
   * Responsible for handling the start of the game.
   * Starting the game could include choosing the size of the maze to be completed.
   */
  private void startGame() {
      //TO-DO
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
    
}

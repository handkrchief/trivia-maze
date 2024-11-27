import { useEffect } from 'react';
import { useMazeContext } from '../../context/MazeContext';
import { useThemeContext } from '../../context/ThemeContext';
import { lightThemeColors, darkThemeColors } from '../../ThemeColors';
import s from './HeaderBar.module.css';

/**
 * The HeaderBar component, displays the header bar.
 * 
 * @author Zach Sanchez (Zachs00)
 * @version November 21st, 2024
*/
export default function HeaderBar() {

  /**
   * The theme for the header bar.
   */
  const {theme, toggleTheme} = useThemeContext();

  /**
   * The started state for the maze.
   */
  const {started, startOver} = useMazeContext();
  const themeColors = theme === "light" ? lightThemeColors : darkThemeColors;


  return (
    <div className={`header ${s.container} ${themeColors.formBackground}`}>
        <span className={s.title}>
            Trivia Maze
        </span>

        <div className={s.buttonContainer}>
          <button className={themeColors.primaryButton} 
          onClick={toggleTheme}>
            {theme === "light" ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button disabled={!started} className={started ? themeColors.secondaryButton : themeColors.disabledButton} onClick={startOver}>
            Start Over
          </button>
        </div>
    </div>
  )
}

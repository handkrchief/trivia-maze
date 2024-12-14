import { useEffect, useState } from 'react';
import { useMazeContext } from '../../context/MazeContext';
import { useThemeContext } from '../../context/ThemeContext';
import { lightThemeColors, darkThemeColors } from '../../ThemeColors';
import s from './HeaderBar.module.css';
import TextModal from '../TextModal/TextModal';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  const openModal = (title: string, text: string) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setModalText(text);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`header ${s.container} ${themeColors.formBackground}`}>
      {isModalOpen && (
          <TextModal title={modalTitle} text={modalText} isOpen={isModalOpen} onClose={closeModal} />
        )}
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
          <button className={themeColors.helpButton} onClick={() => openModal("How to Play", "To play: \n  1.  Set your maze size. \n 2. Start the game by clicking Generate Maze. \n 3. Answer the questions to navigate the maze. \n 4. Use power ups to help you navigate the maze. \n 5. Use cheats to help you navigate the maze. \n 6. Reach the exit to win the game. \n \n Answering questions wrong will cause the path to become a wall.")}>
            How to Play
          </button>
          <button className={themeColors.aboutButton} onClick={() => openModal("About", "Welcome! \n This is a maze game where you answer questions to navigate the maze. \n You can use power ups to help you navigate the maze. \n You can use cheats to help you navigate the maze. \n Reach the exit to win the game. \n \n Answering questions wrong will cause the path to become a wall.")}>
            About
          </button>
        </div>
        
    </div>
  )
}

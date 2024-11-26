import s from './TvComponent.module.css';
import MazeComponent from '../MazeComponent/MazeComponent';
import { useMazeContext } from '../../context/MazeContext';
import { useThemeContext } from '../../context/ThemeContext';
import { useState } from 'react';

/**
 * The TV component, displays the maze and the tv controls.
 * 
 * @author Zach Sanchez (zachs00)
 * @version November 15th, 2024
 */

export default function TvComponent() {
  /**
   * The theme colors for the TV component.
   */
    const {themeColors} = useThemeContext();
    /**
     * The maze for the TV component.
     */
    const {myMaze} = useMazeContext();

    /**
     * The state for TV on/off status.
     */
    const [isTvOn, setIsTvOn] = useState(true);
    /**
     * The state for TV being upside down.
     */
    const [isUpsideDown, setIsUpsideDown] = useState(false);

    /**
     * The style for the inner container.
     */
   const innerContainerStyle = !isTvOn ? 'bg-black transition-all duration-300' : ` ${themeColors.background} transition-all duration-300`;
    
  return (
    <div className={s.tvContainer}>

        <div className={s.antenna}>
          <div className={s.antennaLeft}></div>
          <div className={s.antennaCenter}></div>
          <div className={s.antennaRight}></div>
          
        </div>
        <div className={s.outerContainer}>
          <div className={`${s.innerContainer} ${innerContainerStyle}`}>
            <div className={`${s.innerInnerContainer} ${isTvOn ? 'opacity-100 transition-all duration-300' : 'opacity-0 transition-all duration-300'}`}>

              <div className={`${s.mazeContainer} ${isUpsideDown ? 'rotate-180 transition-all duration-300' : 'transition-all duration-300'}`}>
              {myMaze && 
              <div>
                <div className={`${isTvOn ? 'opacity-100 transition-all duration-300' : 'opacity-0 transition-all duration-300'}`}>
                  <MazeComponent maze={myMaze.getMaze()} />
                </div>
              </div>              
              }
            </div>
          
            </div>
          </div>
          <div className={s.rightContainer}>
        <div className={s.verticalKnobs}>
        <div className={s.largeCircleKnobOuter}>
            <div className={s.largeCircleKnob}>
            <div className={s.tick}>

            </div>
            </div>
        </div>
        <div className={s.largeCircleKnobOuter}>
            <div className={s.largeCircleKnob}>
            <div className={s.tick}>

            </div>
            </div>
        </div>
        </div>
        <div className={s.horizontalKnobs}>
        <div className={s.smallCircleButtonOuter}>
          <button className={s.sourceButton} onClick={() => setIsUpsideDown(!isUpsideDown)}></button>   
        </div>

        <div className={s.smallCircleButtonOuter}>
          <button className={s.powerButton} onClick={() => setIsTvOn(!isTvOn)}></button>   
        </div>
        
        </div>
        </div>
        </div>
        

    </div>
  )
}

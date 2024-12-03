import { useEffect, useState } from 'react';
import s from './NavigationComponent.module.css';
import { useMazeContext } from '../../context/MazeContext';
import Room from '../../models/Room';
import { usePlayerContext } from '../../context/PlayerContext';
import Item from '../../models/Item';

/**
 * The NavigationComponent component, displays the navigation controller.
 * 
 * @author Zach Sanchez (Zachs00)
 * @version November 21st, 2024
*/
export default function NavigationComponent() {

    /**
     * Unsure if player will be used. I am indifferent about splitting it from maze context.
     * 
    */
    const {player} = usePlayerContext();
    const {myCurrentRoom, setMyCurrentRoom, myMaze, startOver, setIsAnsweringQuestions,setMyCurrentQuestion,setMyRoomToNavigateTo} = useMazeContext();
    
    /**
     * The state for the directions.
     */
    const [directions, setDirections] = useState({
        north: false,
        south: false,
        east: false,
        west: false
      });

    /**
     * NOTE: THIS METHOD WILL LIKELY CHANGE AND BE BROKEN UP INTO MULTIPLE FUNCTIONS
     *
     * 
     * The function to change the room.
     * checks if the room is open, and if so, changes the room.
     * if the room is a question room, it sets the isAnsweringQuestions state to true,
     * and sets the current question and room to navigate to.
     * 
     * if the room has an item, it adds the item to the player,
     * removes the item from the room, and alerts the user.
     * 
     * if the room is the exit, it starts over.
     * 
     * @param direction - The direction to change the room to.
     */
    const changeRoom = (direction:string):void => {
        if(myCurrentRoom && myMaze){
            const theRoom:Room | null = myMaze.getAdjacentRoom({currentRoom: myCurrentRoom, direction: direction});
            if(theRoom){
                const q = theRoom.getQuestion()
                if(!theRoom.getIsAnswered() && q ){
                    setIsAnsweringQuestions(true);
                    setMyCurrentQuestion(q); 
                    setMyRoomToNavigateTo(theRoom);
                    return
                }




                setMyCurrentRoom(theRoom);
                if(theRoom.getTypeAsNumber() === 9){
                   
                    theRoom.setTypeAsNumber(7);
                    myCurrentRoom.setTypeAsNumber(1);
                    alert("You found the exit!");
                    startOver();
                    return;
                }
                const item:Item | undefined = theRoom.getItem();
                if(item){
                    player.addItem(item);
                    theRoom.removeItem();
                    alert("You found an item!");
                }
                player.setRoom(theRoom);

                theRoom.setTypeAsNumber(7);
                myCurrentRoom.setTypeAsNumber(1);                   
            }
        }
    }
    
    
    /**
     * The function to set the direction state.
     * 
     * @param direction - The direction to set the state of.
     * @param state - The state to set the direction to.
     */
    const setDirectionState = (direction:string, state:boolean):void => {
        setDirections(prev => ({
            ...prev,
            [direction]: state
        }));
    }

    /**
     * The function to update the navigation.
     * sets the direction boolean state based on if the room is open or locked.
     */
    const updateNavigation = ():void => {
       const directionsArray:string[] = ["north", "west","south", "east"];
       for(const direction of directionsArray){
        if (myCurrentRoom && myMaze) {
            const theRoom:Room | null = myMaze.getAdjacentRoom({currentRoom: myCurrentRoom, direction: direction});
            if(!(theRoom?.getIsOpen()) || (theRoom.getIsLocked())){
                setDirectionState(direction, false);
            } else {
                setDirectionState(direction, true);
            }
        }
    }
    }
    const handleSave = () => {
        localStorage.setItem("maze", JSON.stringify(myMaze));
    }

    /**
     * The useEffect to update the navigation.
     * runs when myCurrentRoom or myMaze changes.
     */
    useEffect(() => {
        updateNavigation();
    }, [myCurrentRoom, myMaze]);

  return (
    <div className={s.container}>
      <div className={s.outerCircleContainer}>
      <div className={s.leftOuterCircleContainer}>
      <div className={s.circleContainer}>
      <div className={s.leftButtonsContainer}>

        <div className={s.buttonContainer}>
        <button className={directions.north ? s.button : s.disabledButton} disabled={!directions.north} onClick={() => changeRoom("north")}>
        △
             </button>
        </div>

        <div className={s.eastWestContainer}>
           

        <div className={s.buttonContainer}>
        <button className={directions.west ? s.button : s.disabledButton} disabled={!directions.west} onClick={() => changeRoom("west")}>
        ◁
         </button>
        </div>

     
            <div className={s.emptySpaceContainer}>
            <div className={s.emptySpace}>
                <div className={s.emptySpaceCircle}>

                </div>
            </div>
            </div>
        
            <div className={s.buttonContainer}>
            <button className={directions.east ? s.button : s.disabledButton} disabled={!directions.east} onClick={() => changeRoom("east")}>
            ▷
            </button>
            </div>
  
        </div>
       
       <div className={s.buttonContainer}>
       <button className={directions.south ? s.button : s.disabledButton} disabled={!directions.south} onClick={() => changeRoom("south")}>
       ▽
        </button>
       </div>
 
      </div>
      </div>
      </div>

        <div className={s.middleContainer}>
        <div className={s.middleTextContainer}>
            <span className={s.middleText}>
                SUPER NINTOMDO
            </span>
            <span className={s.smallMiddleText}>
                A CSS 360 Project
            </span>
        </div>

        <div className={s.slantedButtonsContainer}>
        <div className={s.slantedButtonContainer}>
        <button onClick={handleSave} className={s.slantedButton}>
            
            </button>
            <span className={s.slantedButtonText}>
            SELECT
            </span>
        </div>
        <div className={s.slantedButtonContainer}>
        <div className={s.slantedButton}></div>
        <span className={s.slantedButtonText}>
        START
        </span>
        </div>
        
        </div>
        </div>


      <div className={s.rightOuterCircleContainer}>
      <div className={s.rightCircleContainer}>
      <div className={s.buttonsContainer}>
            <div className={s.lightCircleButton}>
                
            </div>

            <div className={s.rightEastWestContainer}>
                <div className={s.lightCircleButton}>

                </div>
                <div className={s.circleButton}>
                    
                </div>
            </div>
            <div className={s.circleButton}>
                
            </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}
const SvgIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Layer_1"
      width="800"
      height="800"
      fill="#000"
      version="1.1"
      viewBox="0 0 511.509 511.509"
    >
      <path d="M498.675 493.845 265.16 5.568c-3.541-7.424-15.701-7.424-19.243 0L11.251 496.235c-1.579 3.307-1.344 7.189.597 10.283s5.355 4.992 9.024 4.992h469.76c5.888 0 10.667-4.779 10.667-10.667a10.6 10.6 0 0 0-2.624-6.998"></path>
    </svg>
  );
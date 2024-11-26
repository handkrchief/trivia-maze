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
      <div className={s.buttonsContainer}>
        <button className={directions.north ? s.button : s.disabledButton} disabled={!directions.north} onClick={() => changeRoom("north")}>
            
        </button>
        <div className={s.eastWestContainer}>
            <button className={directions.west ? s.button : s.disabledButton} disabled={!directions.west} onClick={() => changeRoom("west")}>
         
            </button>
            <button className={directions.east ? s.button : s.disabledButton} disabled={!directions.east} onClick={() => changeRoom("east")}>
             
            </button>
        </div>
        <button className={directions.south ? s.button : s.disabledButton} disabled={!directions.south} onClick={() => changeRoom("south")}>
        
        </button>
      </div>
      </div>
      </div>

        <div className={s.middleContainer}>
        <div className={s.middleTextContainer}>
            <span className={s.middleText}>
                Super NinTOMdo
            </span>
            <span className={s.smallMiddleText}>
                A CSS 360 Project
            </span>
        </div>

        <div className={s.slantedButtonsContainer}>
        <div className={s.slantedButton}></div>
        <div className={s.slantedButton}></div>
        </div>
        </div>


      <div className={s.rightOuterCircleContainer}>
      <div className={s.rightCircleContainer}>
      <div className={s.buttonsContainer}>
            <div className={s.lightCircleButton}>
                
            </div>

            <div className={s.eastWestContainer}>
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

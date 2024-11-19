import { useEffect, useState } from "react";
import s from "./NavigationComponent.module.css";
import { useMazeContext } from "../../context/MazeContext";
import Room from "../../models/Room";
import { usePlayerContext } from "../../context/PlayerContext";
import Item from "../../models/Item";
export default function NavigationComponent() {
  const { player } = usePlayerContext();
  const { currentRoom, setCurrentRoom, myMaze, startOver } = useMazeContext();
  const [directions, setDirections] = useState({
    north: false,
    south: false,
    east: false,
    west: false,
  });

  const changeRoom = (direction: string) => {
    if (currentRoom && myMaze) {
      const theRoom: Room | null = myMaze.getAdjacentRoom({
        currentRoom: currentRoom,
        direction: direction,
      });
      if (theRoom) {
        setCurrentRoom(theRoom);
        if (theRoom.getTypeAsNumber() === 9) {
          theRoom.setTypeAsNumber(7);
          currentRoom.setTypeAsNumber(1);
          alert("You found the exit!");
          startOver();
          return;
        }
        const item: Item | undefined = theRoom.getItem();
        if (item) {
          player.addItem(item);
          theRoom.removeItem();
          alert("You found an item!" + "Item Found: " + item.getItemType());
        }
        player.setRoom(theRoom);

        theRoom.setTypeAsNumber(7);
        currentRoom.setTypeAsNumber(1);
      }
    }
  };

  const setDirectionState = (direction: string, state: boolean) => {
    setDirections((prev) => ({
      ...prev,
      [direction]: state,
    }));
  };

  const updateNavigation = () => {
    const directionsArray: string[] = ["north", "west", "south", "east"];
    for (const direction of directionsArray) {
      if (currentRoom && myMaze) {
        const theRoom: Room | null = myMaze.getAdjacentRoom({
          currentRoom: currentRoom,
          direction: direction,
        });
        if (!theRoom?.getIsOpen() || theRoom.getIsLocked()) {
          setDirectionState(direction, false);
        } else {
          setDirectionState(direction, true);
        }
      }
    }
  };

  useEffect(() => {
    updateNavigation();
  }, [currentRoom, myMaze]);

  return (
    <div className={s.container}>
      <div className={s.outerCircleContainer}>
        <div className={s.leftOuterCircleContainer}>
          <div className={s.circleContainer}>
            <div className={s.buttonsContainer}>
              <button
                className={directions.north ? s.button : s.disabledButton}
                disabled={!directions.north}
                onClick={() => changeRoom("north")}
              ></button>
              <div className={s.eastWestContainer}>
                <button
                  className={directions.west ? s.button : s.disabledButton}
                  disabled={!directions.west}
                  onClick={() => changeRoom("west")}
                ></button>
                <button
                  className={directions.east ? s.button : s.disabledButton}
                  disabled={!directions.east}
                  onClick={() => changeRoom("east")}
                ></button>
              </div>
              <button
                className={directions.south ? s.button : s.disabledButton}
                disabled={!directions.south}
                onClick={() => changeRoom("south")}
              ></button>
            </div>
          </div>
        </div>

        <div className={s.middleContainer}>
          <div className={s.middleTextContainer}>
            <span className={s.middleText}>Super NinTOMdo</span>
            <span className={s.smallMiddleText}>A CSS 360 Project</span>
          </div>

          <div className={s.slantedButtonsContainer}>
            <div className={s.slantedButton}></div>
            <div className={s.slantedButton}></div>
          </div>
        </div>

        <div className={s.rightOuterCircleContainer}>
          <div className={s.rightCircleContainer}>
            <div className={s.buttonsContainer}>
              <div className={s.lightCircleButton}></div>

              <div className={s.eastWestContainer}>
                <div className={s.lightCircleButton}></div>
                <div className={s.circleButton}></div>
              </div>
              <div className={s.circleButton}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

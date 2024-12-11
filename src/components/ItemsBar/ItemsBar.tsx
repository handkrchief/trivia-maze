import { useMazeContext } from "../../context/MazeContext";
import { usePlayerContext } from "../../context/PlayerContext";
import { useThemeContext } from "../../context/ThemeContext";

import s from "./ItemsBar.module.css";


/**
 * The ItemsBar component, displays the items the player has found.
 * 
 * @author Zach Sanchez (zachs00)
 * @version December 8th, 2024
 */
export default function ItemsBar() {
    const {items, useItem} = usePlayerContext();
    const {themeColors} = useThemeContext();
    const {myCurrentQuestion, setMyCurrentQuestion} = useMazeContext();


    const handleItemUsage = (theItemType:string) => {
        if(theItemType === "50-50"){
            useItem("50-50");
            let myTempQuestion = myCurrentQuestion;
            if(myTempQuestion){
                myTempQuestion.applyFiftyFifty();
                setMyCurrentQuestion(myTempQuestion);
            }
        }
        else if(theItemType === "Phone-a-Friend"){
            useItem("Phone-a-Friend");
            let myTempQuestion = myCurrentQuestion;
            if(myTempQuestion){
                let myTempAnswer = myTempQuestion.applyPhoneAFriend();
                alert("Your friend says the answer is: " + myTempAnswer);

            }
        }
    }
  return (
    <div className={s.container + " " + themeColors.formBackground + " " + themeColors.primaryOutline} >
        {items.length > 0 ? items.map((item, idx)=>(
            <button className={s.itemContainer + " " + themeColors.secondaryButton }  key={idx} onClick={()=>handleItemUsage(item.getItemType())}>
            <span className={s.itemType + "" + themeColors.primaryText}>
            {item.getItemType()}
            </span>
        </button>
        ))
      : 
      <span className={s.noItems + " " + themeColors.primaryText}>
      No Items Found.
      </span>}
    </div>
  )
}


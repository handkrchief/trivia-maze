
import { useEffect, useState } from 'react';
import { useMazeContext } from '../../context/MazeContext';
import s from './QuestionAnswerComponent.module.css';
import { useThemeContext } from '../../context/ThemeContext';

/**
 * The QuestionAnswerComponent component, displays the question and answer options.
 * 
 * @author Zach Sanchez (zachs00)
 * @version November 21st, 2024
 */
export default function QuestionAnswerComponent() {

    const {myCurrentQuestion, isCorrect, setIsCorrect, setIsAnsweringQuestions,
            myRoomToNavigateTo, setMyCurrentRoom, myMazeAsNumbers, myMaze,
            myCurrentRoom, mySize, startOver
    }  = useMazeContext()
    /**
     * The theme and theme colors for the QuestionAnswerComponent.
     */
    const {theme, themeColors} = useThemeContext();

    /**
     * The state for the current text.
     */
    const [currentText, setCurrentText] = useState<string>("");
    /**
     * The state for the choices.
     */
    const [myChoices, setMyChoices] = useState<string[]>([]);
    /**
     * The state for the selected choice.
     */
    const [mySelectedChoice, setMySelectedChoice] = useState<number | null>(null);
    /**
     * The state for the message.
     */
    const [message, setMessage] = useState<string>("");

    /**
     * The function to handle the submit button click.
     * checks if the answer is correct, and then navigates to the room if so.
     * else, it sets the message to the incorrect message and changes the room to a locked room.
     * 
     * @param e - The event.
     */
    const handleClickSubmit = async(e:React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation()
        try {
            if(mySelectedChoice !== null && myCurrentQuestion){
                const correctAnswer = myCurrentQuestion.getMyCorrectAnswer();
                const selectedAnswer = myChoices[mySelectedChoice];
                const isAnswerCorrect = correctAnswer === selectedAnswer;
                setIsCorrect(isAnswerCorrect);
                let row = myRoomToNavigateTo?.getRow();
                let col = myRoomToNavigateTo?.getCol();
                if(row !== undefined && col !== undefined && myRoomToNavigateTo){
                if(isAnswerCorrect){
                    myRoomToNavigateTo.setTypeAsNumber(7);
                    myRoomToNavigateTo.setIsAnswered(true);
                    setMyCurrentRoom(myRoomToNavigateTo);
                    myCurrentRoom?.setTypeAsNumber(1);
                    
                    setMessage("Correct answer!");
                }else{
                    myRoomToNavigateTo.setIsOpen(false);
                    myRoomToNavigateTo.setIsLocked(true);
                    myRoomToNavigateTo.setTypeAsNumber(3);
                    setMessage("Incorrect answer!");
                    }
                    myCurrentRoom?.setIsAnswered(true);
                }
                
                setTimeout(()=>{
                    setIsAnsweringQuestions(false);
                    let gameOver = myMaze?.canSolve(mySize);
                    if(!gameOver){
                       alert("There is no path to the exit! Game Over!")
                       startOver();
                    }
                }, 1000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * The useEffect to set the current text, choices, and reset the isCorrect state.
     * This will run when myCurrentQuestion changes.
     */
    useEffect(()=>{
        if(myCurrentQuestion){
            setCurrentText(myCurrentQuestion.getMyQuestionText())
            setMyChoices(myCurrentQuestion.getMyChoices())
            setIsCorrect(null);
            setMySelectedChoice(null);
        }
    },[myCurrentQuestion])


  return (
    <div className={s.container + " " + themeColors.primaryOutline}>
        <div className={s.questionContainer }>
            <span className={s.questionText + " " + themeColors.primaryText}>
                {currentText}
            </span>
        </div>
        <div className={s.answersContainer }>
       
            <div className={s.choicesContainer}>
                {myChoices && myChoices.map((choice, idx)=>(
                    <div  
                    key={idx} 
                    className={s.answerContainer+ " " 
                    + themeColors.primaryText
                    + " " 
                    + (mySelectedChoice === idx 
                    ? "border-2 border-green-400" 
                    : themeColors.primaryOutline)} 
                    onClick={()=>setMySelectedChoice(idx)}>
                        {choice}
                    </div>
                ))}
            </div>
            <div className={s.buttonContainer}>
                <button 
                    disabled={message !== ""} 
                    className={
                    message !== "" 
                    || mySelectedChoice === null 
                    ? themeColors.disabledButton 
                    + " " 
                    + "w-full"
                    : 
                    s.submitButton 
                    + " " 
                    + themeColors.primaryButton} 
                    onClick={(e)=>handleClickSubmit(e)}>
                    Submit
                </button>
            </div>
           {message && <div className={s.messageContainer + " " + themeColors.primaryText}>
                        {message}
                    </div>  }
        </div>
    </div>
  )
}


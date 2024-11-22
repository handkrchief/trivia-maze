
import { useEffect, useState } from 'react';
import { useMazeContext } from '../../context/MazeContext';
import s from './QuestionAnswerComponent.module.css';
import { useThemeContext } from '../../context/ThemeContext';
export default function QuestionAnswerComponent() {
    const {myCurrentQuestion, isCorrect, setIsCorrect, setIsAnsweringQuestions}  = useMazeContext()
    const {theme, themeColors} = useThemeContext();

    const [currentText, setCurrentText] = useState<string>("");
    const [myChoices, setMyChoices] = useState<string[]>([]);
    const [mySelectedChoice, setMySelectedChoice] = useState<number | null>(null);
    const [message, setMessage] = useState<string>("");
    const handleClickSubmit = async(e:React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation()
        try {
            if(mySelectedChoice !== null && myCurrentQuestion){
                const correctAnswer = myCurrentQuestion.getMyCorrectAnswer();
                const selectedAnswer = myChoices[mySelectedChoice];
                const isAnswerCorrect = correctAnswer === selectedAnswer;
                setIsCorrect(isAnswerCorrect);

                if(isAnswerCorrect){
                    setMessage("Correct!")
                    
                }else{
                    setMessage("Incorrect. Room is locked!")
                }
                
                setTimeout(()=>{
                    setIsAnsweringQuestions(false);
                }, 1000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(myCurrentQuestion){
            setCurrentText(myCurrentQuestion.getMyQuestionText())
            setMyChoices(myCurrentQuestion.getMyChoices())
            setIsCorrect(null);
            setMySelectedChoice(null);
        }
    },[myCurrentQuestion])


  return (
    <div className={s.container}>
        <div className={s.questionContainer}>
            <span className={s.questionText}>
                {currentText}
            </span>
        </div>
        <div className={s.answersContainer }>
       
            <div className={s.choicesContainer}>
                {myChoices && myChoices.map((choice, idx)=>(
                    <div  key={idx} className={s.answerContainer+ " " 
                    + themeColors.background
                    + " " 
                    + themeColors.primaryText
                    + " " 
                    + (mySelectedChoice === idx ? "border-2 border-green-400" : "")} onClick={()=>setMySelectedChoice(idx)}>
                        {choice}
                    </div>
                ))}
            </div>
            <div className={s.buttonContainer}>
                <button disabled={message !== ""} className={message !== "" ? "opacity-50 cursor-not-allowed" : s.submitButton + " " + themeColors.primaryButton} onClick={(e)=>handleClickSubmit(e)}>
                    Submit
                </button>
            </div>
           {message && <div >
                        {message}
                    </div>  }
        </div>
    </div>
  )
}


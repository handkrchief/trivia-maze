import React, { createContext, useContext, useState } from "react";
import Room from "../models/Room";
import Maze from "../models/Maze";
import Question from "../models/Question";
import { QuestionsThemes } from "../types/QuestionTypes";
import sampleData from "../data/sampleQuestions.json"

/**
 * The Context file for the maze, and all its needed values/states.
 *
 *  @author Zach Sanchez (zachs00)
 *  @version November 17th, 2024
 */


/**
* The Interface for MazeContext.tsx 
* @field myMazeAsNumbers: number[]
* @field myMaze: Maze | null
* @field mySize: number
*/



export interface MazeContextType {
  myMazeAsNumbers: number[] [];
  myMaze: Maze | null;
  mySize: number;
  myPowerUp: string;
  myCurrentRoom: Room | null;
  myCurrentQuestion: Question | null;
  started: boolean;
  loading: boolean;
  isAnsweringQuestions: boolean;
  isCorrect: boolean | null;
  myQuestions: Question[] | null;
  startOver: () => void; 
  setQuestionsInRooms: (theMaze:Maze) => Maze;
  setQuestionInRoom: (theRoom: Room, count: number) => Room | null;
  initializeQuestionsFromDB: (theme:QuestionsThemes,size:number) => void;
  setIsAnsweringQuestions: React.Dispatch<React.SetStateAction<boolean>>;
  setMyMazeAsNumbers: React.Dispatch<React.SetStateAction<number[][]>>;
  setMyMaze: React.Dispatch<React.SetStateAction<Maze | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
  setMySize: React.Dispatch<React.SetStateAction<number>>;
  setMyPowerUp: React.Dispatch<React.SetStateAction<string>>; 
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setMyCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>;
  setMyCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
  setMyQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
}


/**
 * Utilizes React's Context API to create a context with the type/data shape of MazeContextType
 * Simply put, this allows us to instantiate a object named MazeContext with a certain shape.
 * 
 * We use this within our wrapper to give access to all child components (if called) 
*/
export const MazeContext = createContext<MazeContextType | undefined>(undefined);



/**
* This exported function allows for the usage of this context within components,
* simply by calling this method with the fields and/or functions you want.
* 
* Example: const {myMaze, setMyMaze, started} = useMyMazeContext();
* @returns Context containing object. 
* @type {MazeContextType}
*/
export const useMazeContext = () => {
  const context = useContext(MazeContext);
  if (context === undefined) {
    throw new Error("useMazeContext must be used within a MazeContextProvider");
  }
  return context;
};


/**
 * Honestly unnecessary, was experimenting with cleaning up the declaration,
 * See PlayerContext.tsx for an example of declaration without typing.
 * 
 * Makes no real difference (that i know of lol)
*/
interface MazeContextProviderProps {
  children: React.ReactNode;
}


/**
 * This is our Wrapper Component. 
 * 
 * We wrap the application with this context provider,
 * which allows us access to the context api in any child component without prop drilling.
 * 
 * Since its Reacts Context api, the state is synced across all components that use the data.
*/
export const MazeContextProvider: React.FC<MazeContextProviderProps> = ({ children }) => {
  /**
   * The Maze as numbers (Maze Generation Output).
   * @type {number[]}
  */
  const [myMazeAsNumbers, setMyMazeAsNumbers] = useState<number[][]>([]);
  const [myMaze, setMyMaze] = useState<Maze | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mySize, setMySize] = useState<number>(4);
  const [myPowerUp, setMyPowerUp] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [myCurrentRoom, setMyCurrentRoom] = useState<Room | null>(null);
  const [myCurrentQuestion, setMyCurrentQuestion] = useState<Question | null>(null);
  const [myQuestions, setMyQuestions] = useState<Question[] | null> ([])
  const [isAnsweringQuestions, setIsAnsweringQuestions] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const startOver = () => {
    setMyMazeAsNumbers([]);
    setMyMaze(null);
    setLoading(true);
    setStarted(false);
    setMyCurrentQuestion(null);
  }

  const addQuestion = (question:Question) : void =>{
    if(question){
      myQuestions?.push(question)
    }
  }

  const consumeQuestion = (): Question | null => {
    //for sample sake im just popping top item
    let res = null; 
    if(myQuestions && myQuestions.length >0){
      res = myQuestions[myQuestions.length-1]
    }
    return res
  }
  const setQuestionsInRooms=  (theMaze:Maze):Maze =>{
    //place holder method (no db conn yet)

    let count:number = 0
    let maze = theMaze?.getMaze()
    if(myQuestions && maze){

      let rowCount= 0
      for(var row of maze){
        let colCount= 0
        for(var room of row){
          const theCurrRoom = setQuestionInRoom(room, count)
          if(theCurrRoom){
           maze[rowCount][colCount] = theCurrRoom;
          
          }
        colCount++
        }
        rowCount++
      }
      
    }
    return theMaze;    
  }

  const setQuestionInRoom =  (theRoom: Room, count:number): Room | null =>{
      
    if(myQuestions){
        let currQuestion = myQuestions[count];
        console.log(currQuestion)
        theRoom.setQuestion(currQuestion);
        return theRoom;
      } 
      return null;
  }
  const initializeQuestionsFromDB = async (theme:QuestionsThemes, size:number) =>{
    if(theme == "Test"){
      let i;
      let count = size*size; 
      let data = sampleData.Test
      let sampleQ = data.questions[1]
      for(i=0; i<count; i++){
        let newQ = new Question(
          sampleQ.questionText,
          sampleQ.correctAnswer,
          sampleQ.choices
        );
        addQuestion(newQ);
      }
    }
    
  }

  const value: MazeContextType = {
    myMazeAsNumbers,
    myMaze,
    mySize,
    myPowerUp,
    myCurrentQuestion,
    myCurrentRoom,
    isAnsweringQuestions,
    started,
    loading,
    myQuestions,
    startOver,
    initializeQuestionsFromDB,
    setIsAnsweringQuestions,
    setQuestionsInRooms,
    setQuestionInRoom,
    setMyQuestions,
    setMyMazeAsNumbers,
    setMyMaze,
    setLoading,
    setMySize,
    setMyPowerUp,
    setStarted,
    setMyCurrentRoom,
    setMyCurrentQuestion,
    setIsCorrect
  };




  return (
    <MazeContext.Provider value={value}>
      {children}
    </MazeContext.Provider>
  );
};
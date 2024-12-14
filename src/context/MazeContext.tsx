import React, { createContext, useContext, useEffect, useState } from "react";
import Room from "../models/Room";
import Maze from "../models/Maze";
import Question from "../models/Question";
import { QuestionsThemes } from "../types/QuestionTypes";
import QuestionFactory from "../services/QuestionFactory";
import sampleData from "../data/sampleQuestions.json"

/**
 * The Context file for the maze, and all its needed values/states.
 *
 *  @author Zach Sanchez (zachs00)
 *  @author Caleb Carroll (calebca)
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
  myRoomToNavigateTo: Room | null;
  started: boolean;
  loading: boolean;
  isAnsweringQuestions: boolean;
  isCorrect: boolean | null;
  gameOverMessage: string;
  myQuestions: Question[] | null;
  cheatsAllowed: boolean;
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
  setMyRoomToNavigateTo: React.Dispatch<React.SetStateAction<Room | null>>;
  setMyQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
  setGameOverMessage: React.Dispatch<React.SetStateAction<string>>;
  setCheatsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
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

// const getSavedMaze = () => {
//   const maze = localStorage.getItem("maze");
//   return maze ? JSON.parse(maze) : null;
// }


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
  const [myRoomToNavigateTo, setMyRoomToNavigateTo] = useState<Room | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string>("");
  const [cheatsAllowed, setCheatsAllowed] = useState<boolean>(false);

  /**
   * Hook that saves the state of the maze after any updates to either the maze itself, or the current room that the player is in
   */
  // useEffect(() => {
  //   if(myMaze){
  //     myMaze.saveMaze();
  //   }
    
  // }, [myMaze, myCurrentRoom])

  /**
   * Resets all the states to their default values.
   * 
   * @returns void
  */
  const startOver = ():void => {
    setMyMazeAsNumbers([]);
    setMyMaze(null);
    setLoading(true);
    setStarted(false);
    setMyCurrentQuestion(null);
    setMyQuestions([]);
    setIsAnsweringQuestions(false);
    setIsCorrect(null);
    setMyRoomToNavigateTo(null);
    setMyPowerUp("");
    setGameOverMessage("");   
    setCheatsAllowed(false);
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


  /**
   * Sets the questions in the rooms of the maze.
   * 
   * @param theMaze - The maze to set the questions in.
   * @returns The maze with the questions in the rooms.
  */
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

  /**
   * Sets the question in the room.
   * 
   * @param theRoom - The room to set the question in.
   * @param count - The index of the question to set.
   * @returns The room with the question in it.
  */
  const setQuestionInRoom =  (theRoom: Room, count:number): Room | null =>{
      
    if(myQuestions){
        let currQuestion = myQuestions[count];
        theRoom.setQuestion(currQuestion);
        return theRoom;
      } 
      return null;
  }

  /**
   * Initializes the questions from db.
   * 
   * @param theme - The theme of the questions to set.
   * @param size - The size of the maze.
   * @returns void
  */
  const initializeQuestionsFromDB = async (theme: QuestionsThemes, size: number) => {
    try {
      const questions = await QuestionFactory.fetchQuestionsFromAPI(theme);
      let count = size * size;
  
      for (let i = 0; i < count; i++) {
        const question = questions[i % questions.length]; // Reuse questions if not enough
        addQuestion(question);
      }
    } catch (error) {
      console.error('Error initializing questions:', error);
    }
  };

  const value: MazeContextType = {
    myMazeAsNumbers,
    myMaze,
    mySize,
    myPowerUp,
    myCurrentQuestion,
    myCurrentRoom,
    myRoomToNavigateTo,
    isAnsweringQuestions,
    isCorrect,
    gameOverMessage,
    started,
    loading,
    myQuestions,
    cheatsAllowed,
    startOver,
    initializeQuestionsFromDB,
    setIsAnsweringQuestions,
    setQuestionsInRooms,
    setQuestionInRoom,
    setMyRoomToNavigateTo,
    setMyQuestions,
    setMyMazeAsNumbers,
    setMyMaze,
    setLoading,
    setMySize,
    setMyPowerUp,
    setStarted,
    setMyCurrentRoom,
    setMyCurrentQuestion,
    setIsCorrect,
    setGameOverMessage,
    setCheatsAllowed
  };




  return (
    <MazeContext.Provider value={value}>
      {children}
    </MazeContext.Provider>
  );
};
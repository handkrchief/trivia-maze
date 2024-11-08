import { useEffect, useState } from 'react';
import s from './Home.module.css'

import MazeGenerator from './models/MazeGenerator'
import MazeComponent from './components/MazeComponent/MazeComponent';
import Maze from './models/Maze';
import Question from './models/Question';
import Item from './models/Item';



function App() {
  const [mySize, setMySize] = useState<number>(4);
  const [myTempMaze, setMyTempMaze] = useState<number[][]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [powerUp, setPowerUp] = useState<string>("");

  const handleAskQuestion = async() => {
    

    let question = new Question(
      "What is the capital of France?",
      "Paris",
      ["Paris", "London", "Berlin", "Madrid"]);
      if(powerUp!== ""){
        question.applyItem(new Item(powerUp));
      }

      alert(question.getMyQuestionText() + "\n" + question.getMyChoices().join("\n"));
    let result = await question.askQuestion();
    alert(result ? "Correct!" : "Incorrect!");
  }

  const handleClickButton = async() => {
    try { 
      const myMazeGenerator:MazeGenerator = new MazeGenerator();
      const myMazeAsNumbers:number[][] = myMazeGenerator.mazeGeneration(mySize);
      const myMaze:Maze = new Maze(myMazeAsNumbers);
      setMyTempMaze(myMazeAsNumbers);

      console.log(myMaze.getStartingRoom());
      myMaze.printMaze();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    if(mySize && mySize > 7){
      alert("Size must be less than or equal to 7");
      setMySize(7);
    }
  }, [mySize]);

  return (
    <div className={s.container}>
      <div className={s.topContainer}>
        <div className={s.buttonContainer}>
         <div className={s.powerUpContainer}>
         <span>
            Power up Tests (only one at a time)
          </span>
          <button className={s.button} onClick={() => {alert("Power up: Phone-a-Friend"); setPowerUp("Phone-a-Friend")}}>Phone-A-Friend</button>
          <button className={s.button} onClick={() => {alert("Power up: 50-50"); setPowerUp("50-50")}}>50-50</button>
         </div>
          <button className={s.button} onClick={handleAskQuestion}>Ask Question</button>
        </div>
      <div className={s.sizeContainer}>
        <span className={s.sizeLabel}>Size</span>
        <input className={s.sizeInput} type="number" value={mySize} onChange={(e) => setMySize(parseInt(e.target.value))} />
      </div>
 
      <button disabled={!mySize || mySize < 4} className={!mySize || mySize < 4 ? s.disabledButton : s.button} onClick={handleClickButton}>Generate Maze</button>

      </div>
      
      <div className={s.mazeContainer}>
        <span>
          {loading ? "no Maze..." : "Maze Generated"}
        </span>
        {!loading && myTempMaze ? 
        <MazeComponent maze={myTempMaze} />
        :
      <></>
    }
      </div> 

    </div>
  )
}

export default App

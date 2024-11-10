import { useEffect, useState } from "react";
import GameComponent from "./components/GameComponent/GameComponent"
import HeaderBar from "./components/HeaderBar/HeaderBar"
import { MazeContextProvider } from "./context/MazeContext"
import s from './Home.module.css'
import './index.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  } 
 
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <MazeContextProvider>
      <div className={s.container}>
        <HeaderBar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <GameComponent />
      </div>
    </MazeContextProvider>
  )
}

export default App

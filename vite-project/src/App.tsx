import GameComponent from "./components/GameComponent/GameComponent"
import HeaderBar from "./components/HeaderBar/HeaderBar"
import { MazeContextProvider } from "./context/MazeContext"
import s from './Home.module.css'


function App() {
  return (
    <MazeContextProvider>
      <div className={s.container}>
        <HeaderBar />
      <GameComponent />
      </div>
    </MazeContextProvider>
  )
}

export default App

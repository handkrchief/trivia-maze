import GameComponent from "./components/GameComponent/GameComponent"
import HeaderBar from "./components/HeaderBar/HeaderBar"
import { MazeContextProvider } from "./context/MazeContext"
import './index.css'
import { ThemeContextProvider } from "./context/ThemeContext";
import Layout from "./components/Layout/Layout";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
    <PlayerProvider>
      <ThemeContextProvider>
        <MazeContextProvider>
          <Layout>
            <HeaderBar />
            <GameComponent />
          </Layout>
        </MazeContextProvider>
      </ThemeContextProvider>
    </PlayerProvider>
  )
}

export default App

import GameComponent from "./components/GameComponent/GameComponent"
import HeaderBar from "./components/HeaderBar/HeaderBar"
import { MazeContextProvider } from "./context/MazeContext"
import './index.css'
import { ThemeContextProvider } from "./context/ThemeContext";
import Layout from "./components/Layout/Layout";

function App() {
  
  return (
    <ThemeContextProvider>
       <MazeContextProvider>
        <Layout>
          <HeaderBar />
          <GameComponent />
        </Layout>
      </MazeContextProvider>
    </ThemeContextProvider>
  )
}

export default App

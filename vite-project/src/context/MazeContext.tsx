import React, { createContext, useContext, useState } from "react";
import Room from "../models/Room";
import Maze from "../models/Maze";

interface MazeContextType {
  myMazeAsNumbers: number[] [];
  setMyMazeAsNumbers: React.Dispatch<React.SetStateAction<number[][]>>;
  myMaze: Maze | null;
  setMyMaze: React.Dispatch<React.SetStateAction<Maze | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mySize: number;
  setMySize: React.Dispatch<React.SetStateAction<number>>;
  powerUp: string;
  setPowerUp: React.Dispatch<React.SetStateAction<string>>;
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
  startOver: () => void;
  currentRoom: Room | null;
  setCurrentRoom: React.Dispatch<React.SetStateAction<Room | null>>;
}

export const MazeContext = createContext<MazeContextType | undefined>(undefined);


export const useMazeContext = () => {
  const context = useContext(MazeContext);
  if (context === undefined) {
    throw new Error("useMazeContext must be used within a MazeContextProvider");
  }
  return context;
};

interface MazeContextProviderProps {
  children: React.ReactNode;
}


export const MazeContextProvider: React.FC<MazeContextProviderProps> = ({ children }) => {
  const [myMazeAsNumbers, setMyMazeAsNumbers] = useState<number[][]>([]);
  const [myMaze, setMyMaze] = useState<Maze | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mySize, setMySize] = useState<number>(4);
  const [powerUp, setPowerUp] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const startOver = () => {
    setMyMazeAsNumbers([]);
    setMyMaze(null);
    setLoading(true);
    setStarted(false);
  }

  const value: MazeContextType = {
    myMazeAsNumbers,
    setMyMazeAsNumbers,
    myMaze,
    setMyMaze,
    loading,
    setLoading,
    mySize,
    setMySize,
    powerUp,
    setPowerUp,
    started,
    setStarted,
    startOver,
    currentRoom,
    setCurrentRoom
  };

  return (
    <MazeContext.Provider value={value}>
      {children}
    </MazeContext.Provider>
  );
};
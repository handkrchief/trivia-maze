import React, { createContext, useContext, useState } from "react";

interface MazeContextType {
  myMaze: number[][];
  setMyMaze: React.Dispatch<React.SetStateAction<number[][]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mySize: number;
  setMySize: React.Dispatch<React.SetStateAction<number>>;
  powerUp: string;
  setPowerUp: React.Dispatch<React.SetStateAction<string>>;
  started: boolean;
  setStarted: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [myMaze, setMyMaze] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mySize, setMySize] = useState<number>(4);
  const [powerUp, setPowerUp] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);

  const value: MazeContextType = {
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
  };

  return (
    <MazeContext.Provider value={value}>
      {children}
    </MazeContext.Provider>
  );
};
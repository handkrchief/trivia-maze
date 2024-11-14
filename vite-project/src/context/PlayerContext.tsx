import { createContext, useContext, useState } from "react";
import Player from "../models/Player";
import Room from "../models/Room";

interface PlayerContextType {
    player: Player;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayerContext must be used within a PlayerProvider');
    }
    return context;
}

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [player, setPlayer] = useState<Player>(new Player(new Room({theRow:0, theCol:0})));
    
    
    return <PlayerContext.Provider value={{ player }}>{children}</PlayerContext.Provider>;
}

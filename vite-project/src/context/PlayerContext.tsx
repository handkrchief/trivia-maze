import { createContext, useContext, useState } from "react";
import Player from "../models/Player";
import Room from "../models/Room";

/**
 * The Context file for the player, not really used yet, but might be later.
 *
 *  @author Zach Sanchez (zachs00)
 *  @version November 17th, 2024
 */


/**
* The Interface for PlayerContext.tsx 
* @field player: Player
*/
interface PlayerContextType {
    player: Player;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

/**
* The hook to use the PlayerContext.
* @returns The PlayerContext.
*/
export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayerContext must be used within a PlayerProvider');
    }
    return context;
}

/**
* The Provider for the PlayerContext.
* @param children - The children to render.
* @returns The PlayerProvider.
*/
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [player, setPlayer] = useState<Player>(new Player(new Room({theRow:0, theCol:0})));
    
    
    return <PlayerContext.Provider value={{ player }}>{children}</PlayerContext.Provider>;
}

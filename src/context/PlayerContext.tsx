import { createContext, useContext, useState } from "react";
import Player from "../models/Player";
import Room from "../models/Room";
import Item from "../models/Item";

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
    setPlayer: (player: Player) => void;
    items: Item[];
    useItem: (itemType:string) => void;
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
    //hardcoded items for testing
    const fifty = new Item("50-50");
    const phone = new Item("Phone-a-Friend");

    //player and items state
    const [player, setPlayer] = useState<Player>(new Player(new Room({theRow:0, theCol:0})));
    const [items, setItems] = useState<Item[]>([fifty, phone, fifty]);
    

    /**
     * The function to use an item.
     * @param theItemType - The type of item to use.
    */
    const useItem = (theItemType: string) => {
        const updatedItems = items.filter((item, index) => 
            index !== items.findIndex(i => i.getItemType() === theItemType)
        );
        setItems(updatedItems);
    };
    
            
            return <PlayerContext.Provider value={{ player, setPlayer, items, useItem }}>{children}</PlayerContext.Provider>;
}

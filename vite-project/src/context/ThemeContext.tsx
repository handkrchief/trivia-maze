import { createContext, useContext, useState } from "react";
import { darkThemeColors, lightThemeColors, ThemeColors } from "../ThemeColors";

/**
 * The Context file for the theme, such as color, light/dark mode, etc.
 *
 *  @author Zach Sanchez (zachs00)
 *  @version November 21st, 2024
 */

/**
* The Interface for ThemeContext.tsx 
* @field theme: string
* @field setTheme: React.Dispatch<React.SetStateAction<string>>
* @field toggleTheme: () => void
* @field themeColors: ThemeColors
*/
interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    toggleTheme: () => void;
    themeColors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


/**
* The hook to use the ThemeContext.
* @returns The ThemeContext.
*/
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};

/**
* The Provider for the ThemeContext.
* @param children - The children to render.
* @returns The ThemeProvider.
*/
export const ThemeContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<string>("light");
    const themeColors = theme === "light" ? lightThemeColors : darkThemeColors;
    const toggleTheme = () => { 
        setTheme(theme === "light" ? "dark" : "light");
    }

    return <ThemeContext.Provider value={{theme, setTheme, toggleTheme, themeColors}}>{children}</ThemeContext.Provider>
}

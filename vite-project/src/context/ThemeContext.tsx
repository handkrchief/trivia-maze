import { createContext, useContext, useState } from "react";
import { darkThemeColors, lightThemeColors, ThemeColors } from "../ThemeColors";

interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    toggleTheme: () => void;
    themeColors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};



export const ThemeContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<string>("light");
    const themeColors = theme === "light" ? lightThemeColors : darkThemeColors;
    const toggleTheme = () => { 
        setTheme(theme === "light" ? "dark" : "light");
    }

    return <ThemeContext.Provider value={{theme, setTheme, toggleTheme, themeColors}}>{children}</ThemeContext.Provider>
}

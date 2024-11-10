import { createContext, useContext, useState } from "react";

interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};

const value = {
    theme: "dark",
    setTheme: () => {},
    toggleTheme: () => {}
}

export const ThemeContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<string>("light");

    const toggleTheme = () => { 
        setTheme(theme === "light" ? "dark" : "light");
    }

    return <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>{children}</ThemeContext.Provider>
}

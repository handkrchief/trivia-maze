import { useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import s from './Layout.module.css';

/**
 * The Layout component, wraps the app to ease the utilization of global styles.
 * 
 * @author Zach Sanchez (Zachs00)
 * @version November 21st, 2024
*/
export default function Layout({children} : {children: React.ReactNode}) {

    /**
     * The theme for the layout.
     */
    const {theme} = useThemeContext();


    /**
     * The useEffect to toggle the dark theme.
     * 
     * runs on every time the theme changes.
     */
    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className={`${s.container} ${theme === "dark" ? s.dark : ""}`}>
            {children}
        </div>
    )
}
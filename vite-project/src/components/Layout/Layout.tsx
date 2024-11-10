import { useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import s from './Layout.module.css';
export default function Layout({children} : {children: React.ReactNode}) {
    const {theme} = useThemeContext();

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className={`${s.container} ${theme === "dark" ? s.dark : ""}`}>
            {children}
        </div>
    )
}
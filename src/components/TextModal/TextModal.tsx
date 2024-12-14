import { useThemeContext } from '../../context/ThemeContext';
import s from './TextModal.module.css';
export default function TextModal({title, text, isOpen, onClose}: {title: string, text: string, isOpen: boolean, onClose: () => void}) {
    const {themeColors} = useThemeContext();
    return (
    <div className={s.container}>"
        <div className={s.modalContainer + " " + themeColors.primaryText + " " + themeColors.formBackground}>
        <div className={s.titleContainer}>
            <h1 className={s.title}>{title}</h1>
        </div>
        <div className={s.textContainer}>
            <p className={s.text}>{text}</p>
        </div>
        <div className={s.buttonContainer}>
            <button className={themeColors.primaryButton} onClick={onClose}>Close</button>
        </div>
        </div>
    </div>
  )
}

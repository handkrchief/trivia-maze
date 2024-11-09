import s from './HeaderBar.module.css';
export default function HeaderBar() {
  return (
    <div className={s.container}>
        <span className={s.title}>
            Trivia Maze
        </span>
    </div>
  )
}

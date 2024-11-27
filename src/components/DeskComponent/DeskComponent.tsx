import s from './DeskComponent.module.css'

/**
 * The DeskComponent component, displays the desk.
 * 
 * honestly working on clean theme to see what we prefer.
 * @author Zach Sanchez (Zachs00)
 * @version November 21st, 2024
*/
export default function DeskComponent() {
  return (
    <div className={s.container}>
      <div className={s.desk}>
        <div className={s.topTrim}>

        </div>
        <div className={s.bottomTrim}>

        </div>
        <div className={s.middle}>
            {Array.from({ length: 128 }).map((_, index) => (
                <div key={index} className={s.lineContainer}>
                    <div className={s.line}></div>
                </div>
            ))}
        </div>
        {/* <div className={s.base}>

        <div className={s.leftLegContainer}>
        <div className={s.leftLeg}></div>
        </div>
        <div className={s.rightLegContainer}>
        <div className={s.rightLeg}></div>
        </div>
        </div> */}
      </div>
    </div>
  )
}

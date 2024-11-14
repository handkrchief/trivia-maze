import s from './DeskComponent.module.css'

// this is be a desk for the tv to sit on. we ideally want to make this a component that sits in the background, meaning items overlap it.
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

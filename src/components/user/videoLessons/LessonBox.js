import React from 'react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import {BsFillHeartFill} from 'react-icons/bs'
import '../../../assest/css/user/videoLessons/LessonBox.css'



export default function LessonBox({lesson, type}) {
  return (
    <div>
        <motion.div className="lesson" 
            initial={{opacity:0, y:"-10px"}} animate={{opacity:1, y:"0px",transition:{duration:0.4}}}>
            <Link to={type ? `/videoLessons/${type}/${lesson.id}` : '#'}><img src={lesson.img} alt='load..' className="lesson-img"/></Link>
            <div className="lesson-box-content">
                <Link to={type ? `/videoLessons/${type}/${lesson.id}` : '#'}>
                    <div className="lesson-box-wrapper">
                        <div className="lesson-content">
                            <h2 className="lesson-title-heading">{lesson.title}</h2>
                            <span className="lesson-teacher text-[16px] font-[400]">
                                الأستاذ <span>{lesson.teacher}</span>
                            </span>
                        </div>
                        <div>
                            <span className={`lesson-ecersice ${lesson.isTrain?"isTrain":"isLesson"}`}>
                                {lesson.isTrain?"تمرين":"درس"}</span>
                        </div>
                    </div>
                </Link>
                <div className="lesson-view">
                    <div className="lesson-view-wrapper">
                        <Link to={`${type?`/videoLessons/watch/${type}/${lesson.id}`:""}`} className="lesson-link"
                        >مشاهدة</Link>
                    </div>
                    <label>
                        <input type='checkbox' name='favorite' style={{display: 'none'}}/>
                        <BsFillHeartFill className='favorite'/>
                    </label>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

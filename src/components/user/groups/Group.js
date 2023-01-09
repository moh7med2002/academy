import {FaUser} from 'react-icons/fa'
import {motion} from 'framer-motion'
import '../../../assest/css/user/groups/groupBox.css'
import {styled} from '@mui/material'
import { Link } from 'react-router-dom'

const Image = styled("img")({
    width:"100%",
    height:"150px"
})

export default function Group({group})
{
    return(
        <motion.div className="group" 
            initial={{opacity:0, y:"-10px"}} animate={{opacity:1, y:"0px",transition:{duration:0.4}}}>
            <Link to={`/groups/${group.id}`}>
                <Image src={`${process.env.REACT_APP_API}/images/${group.image}`}/>
                <div className="group-wrapper">
                    <div className="group-content">
                        <div className="group-text">
                            <h2 className="group-title">{group.title}</h2>
                        </div>
                        <div className="group-count">
                            <span className="number">العدد</span>
                            <span className="num">{group.registerStudents?group.registerStudents:0}/{group.allowedStudents}</span>
                        </div>
                    </div>
                    <div className="group-data">
                        <div className="data-wrapper">
                            <div className="data-icon">
                                <FaUser className='icon'/>
                            </div>
                            <span className="group-teacther">
                                الأستاذ <span>{group.Teacher.name}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
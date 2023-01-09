import { Button } from '@mui/material'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'
import '../../../assest/css/user/forums/forum.css'


export default function Forums({forum,goldurl, type})
{
    return(
            <motion.div className="forum-wrapper" 
            initial={{opacity:0, y:"-10px"}} animate={{opacity:1, y:"0px",transition:{duration:0.4}}}>
            <Link to="/forums/1">
                <img src="https://cdn.spark.app/media/whitefuse/image/blog_forums_cropped.png" alt='load..' className="image"/>
            </Link>
            <div className="wrapper-content">
                <Link to="/forums/1">
                    <h2 className="heading-2">منتدى اللغات</h2>
                    <span className="name">
                            الأستاذ /<span>يوسف يوسف</span>
                    </span>
                </Link>
                <div className='controls'>
                    <Button variant="contained" sx={{width:"140px",borderRadius:"14px"}}>انضم الان</Button>
                </div>
            </div>
        </motion.div>
    )
}
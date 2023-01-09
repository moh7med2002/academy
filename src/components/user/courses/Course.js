import "../../../assest/css/user/courses/course.css";
import { BsCoin } from "react-icons/bs";
import { motion } from "framer-motion";
import {Button, Dialog,DialogActions,DialogTitle} from '@mui/material'
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import {Link} from 'react-router-dom'

export default function Course({ course }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open,setOpen] = useState(false)
  const { currentUser } = useSelector((state) => state.user);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function registerCourse()
  {
    closeSnackbar()
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/student/course/register/${course.id}`,{
        method:"POST",
        headers: {
          "Authorization": currentUser.token,
        },
      })
      const data = await response.json()
      if(response.status!==200&&response.status!==201)
      {
        enqueueSnackbar(data.message,{variant:"error",autoHideDuration:2000})
        setOpen(false);
        throw new Error('failed occured')
      }
      setOpen(false);
      window.location.reload()
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <motion.div
      className="course"
      initial={{ opacity: 0, y: "-10px" }}
      animate={{ opacity: 1, y: "0px", transition: { duration: 0.4 } }}
    >
      <Link to={`${course.id}`}>
        <img
          src={`${process.env.REACT_APP_API}/images/${course.image}`}
          alt="load"
          className="image"
        />
      </Link>
      <div className="course-content">
        <div className="course-header">
          <h3 className="course-title">{course.title}</h3>
          <div className="course-price">
            <BsCoin className="courser-icon" />
            <span>{course.price} د.ج</span>
          </div>
        </div>
        <h3 className="course-teacher">الأستاذ/ {course.Teacher.name}</h3>
        <div className="course-footer">
          {
            !course.Students.find(student => student.id === currentUser.student.id) &&
            <Button variant="contained" onClick={handleClickOpen}>
            اشتـرك
          </Button>
          }
        </div>
        <Dialog
        open={open}
        onClose={handleClose}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          هل تريد الاشتراك بالكورس ؟ 
          </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            إلغاء
          </Button>
          <Button onClick={registerCourse}>موافقة</Button>
        </DialogActions>
        </Dialog>
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import "../../../assest/css/user/courses/AccordinCourse.css";
import { IoIosVideocam } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import {Box, Dialog} from '@mui/material'
import ExamDetails from "./ExamDetails";

export default function AccordinCourse({ unit,isAllowed }) {
  const [show, setShow] = useState(false);
  const [openExamDialog,setOpenExamDialog] = useState(null)
  return (
    <div className="course-unit">
      <div className="unit" onClick={() => setShow((back) => !back)} style={{cursor:"pointer"}}>
        <span>{unit.title} </span>
        <button className="btn">
          {show ? "-" : "+"}
        </button>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="boxes-unit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {unit.Lessons?.map((lesson, index) => {
                return (
                  <Box key={index + "m9"} sx={{cursor:!isAllowed?"not-allowed":""}}>
                    <div
                      className={`box-unit ${
                        index % 2 !== 0 ? "notColor" : "color"
                      }`}
                    >
                      <div className="unit-content">
                        <IoIosVideocam className="unit-video" />
                        <a href={isAllowed?`/lessons/${lesson.id}`:`#`} className="unit-text">{lesson.title}</a>
                      </div>
                      {!isAllowed&&<BiLockAlt />}
                    </div>
                  </Box>
                );
              })}
              {unit.Exams?.map((exam, index) => {
                return (
                  <>
                    {exam.Questions.length>0&&<div style={{cursor:!isAllowed?"not-allowed":""}}
                    key={index + "m9"}
                    className={`box-unit ${
                      index % 2 === 0 ? "notColor" : "color"
                    }`}
                  >
                    <div className="unit-content">
                      <MdQuiz className="unit-video" />
                      <button onClick={()=>setOpenExamDialog(exam.id)} className="unit-text" style={{color:"black"}}>{exam.title}</button>
                    </div>
                    {!isAllowed&&<BiLockAlt />}
                    {isAllowed&&
                    <Dialog open={openExamDialog===exam.id} onClose={()=>setOpenExamDialog(null)}>
                      <ExamDetails exam={exam} setOpenExamDialog={setOpenExamDialog}/>
                    </Dialog>}
                  </div>}
                  </>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

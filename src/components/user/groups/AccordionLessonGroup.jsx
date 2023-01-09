import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Typography} from '@mui/material'
import moment from 'moment/moment';
import { useState } from 'react';
import { useEffect } from 'react';
export default function AccordionLessonGroup({lesson}) {

    const currentDate = moment(new Date()).format("YYYY-MM-DD")
    const lessonDate = lesson.day.split('T')[0]
    const [start,setStart] = useState(null)

    useEffect(()=>
    {
        // if(new Date(currentDate).getTime()<new Date(lessonDate).getTime())
        // {
        //     setStart(0)
        // }
        // else if(new Date(currentDate).getTime()>new Date(lessonDate).getTime())
        // {
        //     setStart(2)
        // }
            const startDate = new Date(`${lessonDate} , ${lesson.startTime}`).getTime()
            const EndDate = new Date(`${lessonDate} , ${lesson.EndTime}`).getTime()
            const currentDate = new Date().getTime()
            if(startDate>currentDate)
            {
                setStart(0)
            }
            else if(startDate<currentDate&&currentDate<EndDate)
            {
                setStart(1)
            }
            else if(currentDate>EndDate)
            {
                setStart(2)
            }
    },[])

    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <Typography>{lesson.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>تاريخ اللقاء : {lesson.day.split('T')[0]}</Typography>
                <Typography>ساعة البداية : {moment(lesson.startTime,'h:mm:ss').format('LT')}</Typography>
                <Typography>ساعة النهاية : {moment(lesson.EndTime,'h:mm:ss').format('LT')}</Typography>
                {start!==0&&<Typography>رابط الزوم : <a href={`${lesson.meetLink}`}>{lesson.meetLink}</a></Typography>}
                <Typography color="error" sx={{marginTop:"6px"}}>
                    {
                        start===0?
                        "* لم يبدأ حتى الآن"
                        :
                        start === 2?
                        "* انتهى لقاء الزوم"
                        :
                        start === 1 && "الدرس متاح الآن"
                    }
                </Typography>
            </AccordionDetails>
    </Accordion>
    )
}

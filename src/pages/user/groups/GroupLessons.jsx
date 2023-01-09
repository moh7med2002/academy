import React from 'react'
import { Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import AccordionLessonGroup from '../../../components/user/groups/AccordionLessonGroup';

export default function GroupLessons() {

    const {id} = useParams()
    const { currentUser } = useSelector((state) => state.user);
    const [lessons,setLessons] = useState([])
    const [isRegister,setIsRegister] = useState(false)

    useEffect(()=>
    {
        async function getLessons()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/group/one/${id}`,{
                    headers:{
                        'Authorization': currentUser.token,
                    }
                })
                const data = await response.json()
                setIsRegister(data.groupe.Students.findIndex(student=>student.id===currentUser.student.id)!==-1)
                setLessons(data.groupe.GroupLessons)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getLessons()
    },[])

    return (
        <Box className='container' sx={{marginTop:"100px",marginBottom:"50px",minHeight:"50vh"}}>
            <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"30px"}}>الدروس</Typography>
            {isRegister?
            <>
            {
                lessons?.length>0?lessons.map((lesson,index)=>
                {
                    return(
                        <AccordionLessonGroup lesson={lesson} key={index+'m1q'}/>
                    )
                })
                :
                <Typography>لا يوجد دروس متاحة لعرضها</Typography>
            }
            </>
            :
            <Typography>يرجى الاشتراك بالمجموعة لمشاهدة الدروس</Typography>
            }
        </Box>
    )
}

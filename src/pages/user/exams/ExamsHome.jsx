import { Box, Grid, Paper, Typography,styled,Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'

const Span = styled("span")({
    fontWeight:"400"
})

export default function ExamsHome() {

    const { currentUser } = useSelector((state) => state.user);
    const [exams,setExams] = useState([])
    const navigate = useNavigate()
    useEffect(()=>
    {
        async function getExams()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/exam/student/allowed`,{
                    headers:{
                        "Authorization":currentUser.token
                    }
                })
                if(response.status!==200&&response.status!==201)
                {
                    throw new Error('failed to occured')
                }
                const data = await response.json()
                setExams(data.exams)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        if(currentUser)
        {
            getExams()
        }
    },[])

    return (
        <Box sx={{margin:"120px 0 80px"}} className="container">
            <>
            <Box sx={{display:"flex",columnGap:"6px"}}>
                <Link to="/exams">
                    <Typography sx={{fontSize:"22px",fontWeight:"500",marginBottom:"30px",color:"#18A0FB"}}>الاختبارات /</Typography>
                </Link>
                <Link to="/marks">
                    <Typography sx={{fontSize:"22px",fontWeight:"500",marginBottom:"30px"}}>الدرجات</Typography>
                </Link>
            </Box>
            <Grid container sx={{rowGap:"20px" , minHeight:"30vh"}}>
                {
                    exams?.length>0&&exams.map((exam,index)=>
                    {
                        return(
                            <Grid item key={index+'ai1'} xs={12} sm={6} md={4} xl={3} sx={{padding:"0px 7px"}}>
                                <Paper sx={{padding:"10px"}}>
                                    <Typography sx={{fontSize:"20px",fontWeight:"600",marginBottom:"12px"}}>{exam.title}</Typography>
                                    <Typography sx={{fontSize:"16px",fontWeight:"600",marginBottom:"6px"}}>
                                        مدة الاختبار : 
                                        <Span> {exam.duration} دقائق</Span>
                                    </Typography>
                                    <Typography sx={{fontSize:"16px",fontWeight:"600",marginBottom:"6px"}}>
                                        عدد الأسئلة 
                                        <Span> {exam.questionsNumber} سؤال</Span>
                                    </Typography>
                                    <Button variant='contained' sx={{margin:"10px 0px"}} onClick={()=>navigate(`/exams/${exam.id}`)}>بدء الاختبار</Button>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
            </>
        </Box>
    )
}

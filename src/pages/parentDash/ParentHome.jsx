import { Container, Grid, Paper, Typography,Button, Avatar } from '@mui/material'
import React from 'react'
import LayoutParent from '../../components/parentDash/LayoutParent'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function ParentHome() {
    const [students,setStudents] = useState([])
    const { currentParent } = useSelector((state) => state.parent);

    useEffect(()=>
    {
        async function getStudents()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/parent/students/child`,{
                    headers:{
                        'Authorization': currentParent.token,
                    }
                })
                const data = await response.json()
                setStudents(data.students)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getStudents()
    },[])

    const navigate = useNavigate()
    return (
        <LayoutParent>
            <Container sx={{marginTop:"100px",marginBottom:"60px"}}>
                <Typography sx={{color:"#000000",fontWeight:"700",fontSize:"24px",marginBottom:"8px"}}>اهلا بك في اكاديمتنا</Typography>
                <Typography sx={{color:"#000000",fontWeight:"500",fontSize:"18px",marginBottom:"32px"}}>يسعدنا تسهيل عملية متابعة دراسة ابنائك من خلال اكاديميتنا </Typography>
                <Grid container spacing={3}>
                    {
                        students?.length>0&&
                        students.map((student,index)=>
                        {
                            return(
                                <Grid item xs={12} md={4} lg={3} sx={{width:"100%"}} key={index='re1'}>
                                    <Paper sx={{padding:"8px 6px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                        <Avatar alt={student.name} src={`${process.env.REACT_APP_API}/images/${student.image}`} 
                                        sx={{width:"105px",height:"105px",fontSize:"42px"}}/>
                                        <Typography sx={{fontWeight:"500",marginY:"10px",fontSize:"18px",minHeight:"50px",textAlign:"center"}}>الطالب : {student.name} </Typography>
                                        <Button onClick={()=>navigate(`/parent-dash/student/${student.id}`)}>مشاهدة</Button>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </LayoutParent>
    )
}

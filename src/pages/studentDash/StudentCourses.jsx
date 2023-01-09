import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../../components/studentDash/Layout'
import { useSelector } from 'react-redux'
import {Box,Grid,Paper,styled, Button} from '@mui/material'
import { useNavigate } from 'react-router'

const Text = styled("h3")({})
const Image = styled("img")({
    borderRadius:"6px"
})

export default function StudentCourses() {
    const [courses,setCourses] = useState([])
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate()
    useEffect(()=>
    {
        async function getCourses()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/student/my-coures`,{
                    headers:{
                        'Authorization': currentUser.token,
                    }
                })
                const data = await response.json()
                setCourses(data.courses)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCourses()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"22px"}}>دوراتي</Text>
            {
                courses?.length>0&&courses.map((course,index)=>
                {
                    return(
                        <Box>
                            <Grid container>
                                <Grid item  key={index+'mo1'} xs={12} sm={5.5} lg={3.8}>
                                    <Paper sx={{width:"fit-content",padding:"10px 10px 15px"}}>
                                        <Image src={`${process.env.REACT_APP_API}/images/${course.image}`}/>
                                        <Text sx={{fontSize:"22px",fontWeight:"500",margin:"6px 0 10px"}}>{course.title}</Text>
                                        <Button variant='contained' onClick={()=>navigate(`/courses/${course.id}`)}>مشاهدة الدورة</Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                })
            }
        </Layout>
    )
}

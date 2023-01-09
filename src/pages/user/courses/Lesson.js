import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from "react-redux";
import { Box,Container,styled} from '@mui/material';

const Text = styled("h3")({})
const Frame = styled("iframe")({})

export default function Lesson() {

    const { currentUser } = useSelector((state) => state.user);
    const params = useParams()
    const [lesson,setLesson] = useState({})

    useEffect(()=>
    {
        async function getLesson()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/lesson/lessons/${params.lessonId}`,{
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: currentUser.token,
                    }
                })
                const data = await response.json()
                data.lesson.videoUrl = data.lesson.videoUrl.replace('watch?v=','embed/');
                setLesson(data.lesson)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getLesson()
    },[])

    return (
        <>
        <Box sx={{padding:"120px 0"}}>
            <Container>
                <Text sx={{fontSize:"24px",marginBottom:"16px"}}>{lesson?.title}</Text>
                <Text sx={{fontSize:"16px",color:"#747579",fontWeight:"500",marginBottom:"18px"}}>{lesson?.content}</Text>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Frame src={lesson?.videoUrl} width="660px" height="445px" allowfullscreen frameborder="0"></Frame>
                </Box>
            </Container>
        </Box>
        </>
    )
    }

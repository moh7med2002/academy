import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,CircularProgress,Box,Grid} from '@mui/material'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import AcceptedSession from '../../components/user/psychologist/AcceptedSession';

const Text = styled("h3")({})

export default function TeacherSessions() {
    const [load,setLoad] = useState(false)
    const [psychos,setPsychos] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const {id} = useParams()

    useEffect(()=>
    {   
        async function getPsychos()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/psycho/teacher/accepted/${id}`,{
                    headers:{
                        "Authorization":currentTeacher.token
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    setPsychos(data.psychos)
                    setLoad(false);
                });
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getPsychos()
    },[id])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>جلساتي النفسية</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                {
                load?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                psychos?.length>0?
                <Grid container spacing={2} sx={{padding:"6px"}}>
                    {
                        psychos.map((item,index)=>
                        {
                            return(
                                <>
                                <Grid xs={12} md={6} xl={4} item><AcceptedSession key={index+'aq1'} item={item}/></Grid>
                                </>
                            )
                        })
                    }
                </Grid>
                :
                <Text>لا يوجد جلسات متاحة</Text>
                }
            </Box>
        </Layout>
    )
}
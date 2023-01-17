import React from 'react'
import Layout from '../../components/studentDash/Layout'
import {Box, CircularProgress, Grid, styled} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import AcceptedSession from '../../components/user/psychologist/AcceptedSession'

const Text = styled("h3")({})

export default function StudentSessions() {
    const [load,setLoad] = useState(false)
    const [psychos,setPsychos] = useState([])
    const { currentUser } = useSelector((state) => state.user);
    const {id} = useParams()

    useEffect(()=>
    {   
        async function getPsychos()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/psycho/all/student`,{
                    headers:{
                        "Authorization":currentUser.token
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
            <Text sx={{marginBottom:"20px",fontSize:"22px"}}>جلساتي النفسية</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                {
                load?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress/>
                </Box>
                :
                psychos?.length>0?
                <Grid container spacing={2} sx={{padding:"6px"}}>
                    {
                        psychos.map((item,index)=>
                        {
                            return(
                                <>
                                <Grid xs={12} md={6} xl={4} item><AcceptedSession key={index+'aq1'} type="student" item={item}/></Grid>
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

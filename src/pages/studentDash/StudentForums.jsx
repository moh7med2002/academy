import { styled,Grid, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../components/studentDash/Layout'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import Group from '../../components/user/groups/Group'
import Forum from '../../components/user/forums/Forum'
const Text = styled("h3")({})
export default function StudentForums() {
    const [forums,setForums] = useState([])
    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>
    {
        async function getGroups()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/forum/student/registred`,{
                    headers:{
                        'Authorization': currentUser.token,
                    }
                })
                const data = await response.json()
                console.log(data)
                setForums(data.forums)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getGroups()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"20px",fontSize:"22px"}}>منتدياتي</Text>
            <Grid container spacing={2}>
                {
                    forums?.length>0?
                    forums.map((forum,idnex)=>
                    {
                        return(
                            <Grid item xs={12} md={6} lg={4} xl={3} sx={{marginBottom:"20px"}}>
                                <Forum forum={forum}/>
                            </Grid>
                        )
                    })
                    :
                    <Typography sx={{margin:"16px",fontSize:"18px",fontWeight:"600"}}>لم يتم الاشتراك بمنتديات</Typography>
                }
            </Grid>
        </Layout>
    )
}

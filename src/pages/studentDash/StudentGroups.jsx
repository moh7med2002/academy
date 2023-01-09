import { styled,Grid, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../components/studentDash/Layout'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import Group from '../../components/user/groups/Group'
const Text = styled("h3")({})
export default function StudentGroups() {
    const [groups,setGroups] = useState([])
    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>
    {
        async function getGroups()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/group/student/registred`,{
                    headers:{
                        'Authorization': currentUser.token,
                    }
                })
                const data = await response.json()
                console.log(data)
                setGroups(data.groups)
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
            <Text sx={{marginBottom:"20px",fontSize:"22px"}}>مجموعاتي</Text>
            <Grid container spacing={2}>
                {
                    groups?.length>0?
                    groups.map((group,idnex)=>
                    {
                        return(
                            <Grid item xs={12} md={6} lg={4} xl={3} sx={{marginBottom:"20px"}}>
                                <Group group={group}/>
                            </Grid>
                        )
                    })
                    :
                    <Typography>لم يتم الاشتراك بمجموعات</Typography>
                }
            </Grid>
        </Layout>
    )
}

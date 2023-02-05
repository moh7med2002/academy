import React, { useEffect } from 'react'
import {styled, Container, Typography} from '@mui/material'
import LayoutParent from '../../components/parentDash/LayoutParent'
import Notification from '../../components/Notification'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Text = styled("h3")({marginBottom:"20px",fontSize:"22px"})

export default function ParentNotifications() {

    const { currentParent } = useSelector((state) => state.parent);
    const [notifications,setNotifications] = useState([])
    const [load,setLoad] = useState(true)

    useEffect(()=>
    {
        async function getNotifications()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/parent/notifications`,{
                    headers:{
                        "Authorization":currentParent.token
                    }
                })
                const data = await response.json()
                setNotifications(data.notifications)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getNotifications()
    },[])

    return (
        <LayoutParent>
            <Container sx={{marginY:"120px"}}>
                <Text>الإشعارات</Text>
                {
                    !load?
                    notifications?.length>0
                    ?
                    notifications.map((item,index)=>
                    {
                        return <Notification key={index+'u1'} item={item}/>
                    })
                    :
                    <Typography sx={{fontSize:"22px",fontWegiht:"500"}}>لا يوجد إشعارات متاحة</Typography>
                    :
                    <Typography sx={{fontSize:"22px",fontWegiht:"500"}}>جاري التحميل الآن ...</Typography>
                }
            </Container>
        </LayoutParent>
    )
}

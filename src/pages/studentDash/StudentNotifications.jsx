import React from 'react'
import Layout from '../../components/studentDash/Layout'
import {styled} from '@mui/material'
import Notification from '../../components/Notification';

const Text = styled("h3")({marginBottom:"20px",fontSize:"22px"})

export default function StudentNotifications() {
    return (
        <Layout>
            <Text>الإشعارات</Text>
            <Notification/>
        </Layout>
    )
}

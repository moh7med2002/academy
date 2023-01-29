import React from 'react'
import { Badge } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom'
export default function NotificationBadge() {
    return (
        <Link to="/notifications">
            <Badge color="error" badgeContent={1}>
                <NotificationsIcon sx={{color:"#F7E249",fontSize:"28px"}}/>
            </Badge>
        </Link>
    )
}

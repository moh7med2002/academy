import { Box,Paper, Typography ,Button} from '@mui/material'
import React from 'react'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment/moment';

export default function AcceptedSession({item,type}) {
    return (
        <Paper sx={{padding:"15px 10px"}}>
            {
                type?
                <Typography sx={{marginBottom:"6px",fontSize:"16px",fontWeight:"500"}}>اسم الجلسة : {item.Psycho.title}</Typography>
                :
                <Typography sx={{marginBottom:"6px",fontSize:"16px",fontWeight:"500"}}>اسم الطالب : {item.Student.name}</Typography>
            }
            <Typography sx={{fontSize:"14px",textAlign:"justify",marginBottom:"6px",height:"60px"}}>{item?.description}</Typography>
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Box sx={{display:"flex",columnGap:"4px",alignItems:"center",marginY:"8px"}}>
                    <CalendarMonthIcon sx={{fontSize:"18px"}}/>
                    <Typography sx={{fontSize:"15px"}}>{item.startDate.split('T')[0]}</Typography>
                </Box>
                <Box sx={{display:"flex",columnGap:"4px",alignItems:"center"}}>
                    <QueryBuilderIcon sx={{fontSize:"18px"}}/>
                    <Typography sx={{fontSize:"15px"}}>{moment(item.startDate,'h:mm:ss').format('LT')}</Typography>
                </Box>
            </Box>
            <a href={`${item.meetLink}`} target="_blank">
                <Button variant="contained" fullWidth sx={{marginTop:"8px"}}>الانتقال إلى اللقاء</Button>
            </a>
        </Paper>
    )
}

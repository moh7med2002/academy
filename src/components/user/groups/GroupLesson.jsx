import { Box,Paper,styled, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

const Image = styled('img')({
    width:"100%",
    borderTopLeftRadius:"8px",
    borderTopRightRadius:"8px",
    height:"135px"
})

export default function GroupLesson() {
    return (
        <Link to={`/group/${1}/lesson/${1}`}>
            <Paper sx={{borderRadius:"8px"}}>
                <Image src={"https://nodeacad.academiatouna.com/images/1670419108665-testjpg.jpg"}/>
                <Box sx={{padding:"0px 10px 10px"}}>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                        <Typography sx={{fontWeight:"600"}}>مجموعة الرياضيات</Typography>
                        <Typography sx={{fontWeight:"600",fontSize:"14px",backgroundColor:"#F7C92B",borderRadius:"8px",padding:"2px 6px"}}>
                            منتهية
                        </Typography>
                    </Box>
                    <Typography sx={{color:"#868383",fontSize:"16px",marginBottom:"14px"}}>
                        يوم الخميس من كل اسبوع  
                        من 6.00 م حتي 8.00 م    
                    </Typography>
                    <Typography sx={{backgroundColor:"#4DCABD",paddingX:"10px",width:"fit-content",height:"25px"
                    ,textAlign:"center",borderRadius:"8px",margin:"auto"}}>الحصة الاولى</Typography>
                </Box>
            </Paper>
        </Link>
    )
}

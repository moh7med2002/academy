import React from 'react'
import {Box, styled, Typography} from '@mui/material'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

const Wrapper = styled(Box)({
    display:"flex",
    columnGap:"10px",
    justifyContent:"center"
})

const IconWrapper = styled(Box)({
    width:"65px",
    height:"65px",
    borderRadius:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
})


export default function Notification({item}) {
    return (
        <Wrapper sx={{marginBottom:"35px"}}>
            <IconWrapper sx={{backgroundColor:true?"#e66b4c47":"40c0dc33"}}>
                <NotificationsActiveOutlinedIcon sx={{color:"black",fontSize:"26px",transform:'rotate(45deg)'}}/>
            </IconWrapper>
            <Box sx={{width:"90%"}}>
                <Typography sx={{fontSize:{md:"18px",xs:"15px"},color:"#303030",fontWeight:"400",marginBottom:"8px"}}>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفسالمساحة، لقد تم توليد هذا النص من مولد النص العربى،حيث يمكنك أن تولد مثل هذا النص أو العديد 
                </Typography>
                <Typography sx={{fontSize:{md:"16px",xs:"14px"},color:"#949494",fontWeight:"500"}}> قبل 5 دقائق  </Typography>
            </Box>
        </Wrapper>
    )
}

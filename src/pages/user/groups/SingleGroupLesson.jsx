import { Box,styled, Typography } from '@mui/material'
import React from 'react'

const Image = styled("img")({
    width:"479px",
    maxWidth:"100%",
    height:"251px",
    borderRadius:"12px"
})

const Title = styled(Typography)({
    fontWeight:"700",
    fontSize:"18px",
})

const LinkReact = styled('a')({
    color:"#18A0FB"
})

export default function SingleGroupLesson() {
    return (
        <Box className='container' sx={{marginY:"130px"}}>
            <Typography sx={{fontSize:"20px",fontWeight:"700",marginBottom:"18px"}}>الحصة الأولى</Typography>
            <Image src="https://nodeacad.academiatouna.com/images/1670419108665-testjpg.jpg"/>
            <Box sx={{marginTop:"20px"}}>
                <Title>اليوم / </Title>
                <Typography sx={{fontSize:"18px",fontWeight:"400",padding:"9px 12px",marginBottom:"14px"}}>يوم الاربع من كل اسبوع او 10/10/2022</Typography>
                <Title>الساعة / </Title>
                <Typography sx={{fontSize:"18px",fontWeight:"400",padding:"9px 12px",marginBottom:"14px"}}>السابعة مساء 7.00 م</Typography>
                <Title>الرابط / </Title>
                <Typography sx={{fontSize:"18px",fontWeight:"400",padding:"9px 12px",marginBottom:"14px"}}>
                    <LinkReact target="_blank" href='/www.gnsrrvfgnb vfbfhfg ghvfvfhv bgfinfb gigngfnbglmb'>www.gnsrrvfgnb vfbfhfg ghvfvfhv bgfinfb gigngfnbglmb</LinkReact>
                </Typography>
            </Box>
        </Box>
    )
}

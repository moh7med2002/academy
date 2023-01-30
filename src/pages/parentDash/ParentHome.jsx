import { Container, Grid, Paper, Typography,styled,Button } from '@mui/material'
import React from 'react'
import LayoutParent from '../../components/parentDash/LayoutParent'
import { useNavigate } from 'react-router'

const Image = styled('img')({
    width:"120px",
    height:"120px",
    borderRadius:"50%",
})

export default function ParentHome() {
    const navigate = useNavigate()
    return (
        <LayoutParent>
            <Container sx={{marginTop:"100px",marginBottom:"60px"}}>
                <Typography sx={{color:"#000000",fontWeight:"700",fontSize:"24px",marginBottom:"8px"}}>اهلا بك في اكاديمتنا</Typography>
                <Typography sx={{color:"#000000",fontWeight:"500",fontSize:"18px",marginBottom:"32px"}}>يسعدنا تسهيل عملية متابعة دراسة ابنائك من خلال اكاديميتنا </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3} sx={{width:"100%"}}>
                        <Paper sx={{padding:"8px 6px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <Image src={'https://mui.com/static/images/avatar/2.jpg'}/>
                            <Typography sx={{fontWeight:"500",marginY:"10px",fontSize:"18px"}}>الطالب : يوسف أبوهاني</Typography>
                            <Button onClick={()=>navigate('/parent-dash/student/1')}>مشاهدة</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </LayoutParent>
    )
}

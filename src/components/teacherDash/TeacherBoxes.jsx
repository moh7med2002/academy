import { Box,Grid, Paper,styled } from '@mui/material'
import React from 'react'
import image1 from '../../images/teacher/group1.png'
import image2 from '../../images/teacher/group2.png'
import image3 from '../../images/teacher/group3.png'
import image4 from '../../images/teacher/group4.png'

const Image = styled('img')({})
const Text = styled("h3")({})

export default function TeacherBoxes() {
    return (
        <Box>
            <Grid container sx={{columnGap:"15px",rowGap:"10px"}}>
                <Grid item xs={12} sm={5.7} lg={2.8}>
                    <Paper sx={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0"}}>
                        <Image src={image1} alt={"image"} sx={{marginBottom:"16px"}}/>
                        <Text sx={{marginBottom:"8px"}}>10</Text>
                        <Text>الدورات</Text>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5.7} lg={2.8}>
                    <Paper sx={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0"}}>
                        <Image src={image2} alt={"image"} sx={{marginBottom:"16px"}}/>
                        <Text sx={{marginBottom:"8px"}}>10</Text>
                        <Text>الاختبارات</Text>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5.7} lg={2.8}>
                    <Paper sx={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0"}}>
                        <Image src={image3} alt={"image"} sx={{marginBottom:"16px"}}/>
                        <Text sx={{marginBottom:"8px"}}>10</Text>
                        <Text>المجموعات</Text>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5.7} lg={2.8}>
                    <Paper sx={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0"}}>
                        <Image src={image4} alt={"image"} sx={{marginBottom:"16px"}}/>
                        <Text sx={{marginBottom:"8px"}}>10</Text>
                        <Text>المحفظة</Text>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

import React from 'react'
import {Grid, Paper, Typography} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import QuizIcon from '@mui/icons-material/Quiz';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SubtitlesIcon from '@mui/icons-material/Subtitles';

export default function ParentBoxes({info}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Paper sx={{padding:"15px 10px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <GroupIcon sx={{fontSize:"44px",marginBottom:"6px",color:"#43C5FF"}}/>
                    <Typography sx={{color:"#000000",fontSize:"24px",fontWeight:"600",marginBottom:"6px"}}>{info.Groupes.length}</Typography>
                    <Typography sx={{color:"#000000",fontSize:"20px",fontWeight:"600"}}>المجموعات</Typography>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper sx={{padding:"15px 10px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <WorkspacePremiumIcon sx={{fontSize:"44px",marginBottom:"6px",color:"#43C5FF"}}/>
                    <Typography sx={{color:"#000000",fontSize:"24px",fontWeight:"600",marginBottom:"6px"}}>{info.Courses.length}</Typography>
                    <Typography sx={{color:"#000000",fontSize:"20px",fontWeight:"600"}}>الدورات المنجزة</Typography>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper sx={{padding:"15px 10px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <QuizIcon sx={{fontSize:"44px",marginBottom:"6px",color:"#43C5FF"}}/>
                    <Typography sx={{color:"#000000",fontSize:"24px",fontWeight:"600",marginBottom:"6px"}}>{info.Grades.length}</Typography>
                    <Typography sx={{color:"#000000",fontSize:"20px",fontWeight:"600"}}>الاختبارات</Typography>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper sx={{padding:"15px 10px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <SubtitlesIcon sx={{fontSize:"44px",marginBottom:"6px",color:"#43C5FF"}}/>
                    <Typography sx={{color:"#000000",fontSize:"24px",fontWeight:"600",marginBottom:"6px"}}>{info.Psychos.length}</Typography>
                    <Typography sx={{color:"#000000",fontSize:"20px",fontWeight:"600"}}>الجلسات</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

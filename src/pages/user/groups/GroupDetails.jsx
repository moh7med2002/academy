import { Box, Grid, Paper, Typography,styled } from "@mui/material";
import GroupLesson from "../../../components/user/groups/GroupLesson";

const ExamWrapper = styled(Paper)({
    border:"1px solid black",
    padding:"10px",
    marginBottom:"20px",
    fontSize:"18px",
    fontWeight:"500",
    width:"fit-content"
})

export default function GroupDetails()
{
    return(
        <Box className="container" sx={{marginY:"120px"}}>
            <Typography sx={{fontSize:"20px",fontWeight:"600",marginBottom:"24px"}}>مجموعة الرياضيات</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}><GroupLesson/></Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}><GroupLesson/></Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}><GroupLesson/></Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}><GroupLesson/></Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}><GroupLesson/></Grid>
            </Grid>
            <Typography sx={{fontSize:"20px",fontWeight:"600",marginBottom:"24px",marginTop:"90px"}}>الاختبارات</Typography>
            <ExamWrapper>
            اختبار الوحده الاولي مادة رياضيات  
            </ExamWrapper>
            <ExamWrapper>
            اختبار الوحده الاولي مادة رياضيات  
            </ExamWrapper>
        </Box>
    )
}
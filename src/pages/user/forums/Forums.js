import Forum from "../../../components/user/forums/Forum";
import '../../../assest/css/user/forums/forumsPage.css'
import {Typography,Box, Grid} from '@mui/material'

export default function Forums()
{
    return(
        <Box className="container" sx={{marginBottom:"80px",marginTop:"120px"}}>
                <Box>
                    <Typography sx={{fontSize:"28px",fontWeight:"600",marginBottom:"20px"}}>المنتديات والنوادي</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Forum/></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Forum/></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Forum/></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Forum/></Grid>
                    </Grid>
                </Box>
        </Box>
    )
}
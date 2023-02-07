import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import { Badge, Button } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {logout} from '../../redux/parentSlice'
import { useState } from 'react';

const Image = styled('img')({
    width:"63px",
    height:"50.4px"
})

const drawerWidth = 240;

function LayoutParant(props) {
    const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispatch = useDispatch()

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const [numberOfNotifications,setNumberOfNotifications] = useState(0)

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }} color="black">
            أكاديميتنا
        </Typography>
        <Divider />
        <List>
            <Button sx={{marginTop:"6px"}} onClick={()=>navigate('/parent-dash/notifications')}>
                <Badge badgeContent={numberOfNotifications} color="error"><NotificationsIcon/></Badge>
            </Button>
            <Link to="/parent-dash">
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText color='#424242' primary={"الرئيسية"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/parent-dash/add-students">
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText color='#424242' primary={"إضافة أبناء"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/">
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText color='#424242' primary={"تسجيل الخروج"} />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{backgroundColor:"white"}}>
            <Toolbar>
            <IconButton
                color="black"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component="div"
                color="#424242"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' },alignItems:"center",columnGap:"12px",fontWeight:"600",fontSize:"24px"}}
            >
                <Image src={logo} alt="أكاديميتنا"/>
                أكاديميتنا
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button onClick={()=>navigate('/parent-dash/notifications')}>
                    <Badge badgeContent={numberOfNotifications} color="error"><NotificationsIcon/></Badge>
                </Button>
                <Button sx={{ color: '#424242',fontSize:"15px",fontWeight:"500"}} onClick={()=>navigate('/parent-dash')}>
                    الرئيسية 
                </Button>
                <Button sx={{ color: '#424242',fontSize:"15px",fontWeight:"500"}} onClick={()=>navigate('/parent-dash/add-students')}>
                    إضافة أبناء
                </Button>
                <Button sx={{ color: '#424242',fontSize:"15px",fontWeight:"500"}} onClick={()=>{dispatch(logout());navigate('/login/parent')}}>
                    تسجيل الخروج
                </Button>
            </Box>
            </Toolbar>
        </AppBar>
        <Box component="nav">
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </Box>
        {props.children}
        </Box>
    );
    }

    LayoutParant.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    };

export default LayoutParant;
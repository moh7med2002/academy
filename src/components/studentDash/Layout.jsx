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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Avatar, styled} from '@mui/material'
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import StudentBoxes from '../../components/studentDash/StudentBoxes'
import {Button} from '@mui/material' 
import { useNavigate } from 'react-router-dom';
import { logout } from "../../redux/userSilce";
import { useDispatch,useSelector } from 'react-redux';

const drawerWidth = 240;

const Image = styled("img")({})

const Text = styled("h3")({})

function Layout(props) {
    const dispatch = useDispatch()
    const navig = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { currentUser } = useSelector((state) => state.user);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleLogout()
    {
        dispatch(logout())
        navig('/')
    }

    const drawer = (
        <div>
        <Toolbar />
        <Divider />
        <Box sx={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column",paddingTop:"20px"}}>
            <Avatar src={`${process.env.REACT_APP_API}/images/${currentUser?.student.image}`} alt={currentUser?.student.name} 
            sx={{marginBottom:"10px",width:"150px",height:"150px",fontSize:"65px"}}/>
            <Text>مرحبا بك ..</Text>
            <Text>التلميذ / {currentUser?.student.name}</Text>
        </Box>
        <List>
            <Image/>
                <Link to="/">
                    <ListItem  disablePadding>
                        <ListItemButton>
                        <Text>الصفحة الرئيسية</Text>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/student-dash/studentWallet">
                    <ListItem  disablePadding>
                        <ListItemButton>
                        <Text>محفظتي</Text>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/student-dash/studentGroups">
                    <ListItem  disablePadding>
                        <ListItemButton>
                        <Text>مجموعاتي</Text>
                        </ListItemButton>
                    </ListItem>
                </Link>
            <Link to="/student-dash/studentCourses">
                <ListItem  disablePadding>
                    <ListItemButton>
                    <Text>دوراتي</Text>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/student-dash/examReveal">
                <ListItem  disablePadding>
                    <ListItemButton>
                    <Text>كشف العلامات</Text>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/profile">
                <ListItem  disablePadding>
                    <ListItemButton>
                    <Text>الملف الشخصي</Text>
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor:"white"
            }}
        >
            <Toolbar>
            <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                <IconButton
                    color="#242424"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"20px"}}>
                    <Image src={logo} alt="أكاديميتنا" sx={{width:"60px",height:"45px"}}/>
                    <Link to="/">
                        <Text sx={{color:"#242424",fontSize:"22px"}}>
                            أكاديميتنا
                        </Text>
                    </Link>
                </Box>
                <Button onClick={handleLogout}>تسجيل الخروج</Button>
            </Box>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }}}
        >
            <Toolbar />
            <StudentBoxes/>
            <Box sx={{marginTop:"25px"}}>
                {props.children}
            </Box>
        </Box>
        </Box>
    );
    }

    Layout.propTypes = {
    window: PropTypes.func,
    };

export default Layout;
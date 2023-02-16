import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';

const Text = styled("h3")({})
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
    }));

export default function TeacherForums() {
    const [load,setLoad] = useState(false)
    const [forums,setForums] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const navigate = useNavigate()

    useEffect(()=>
    {   
        async function getCourses()
        {
            try{
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API}/api/teacher/my-forums`,
                {
                    headers:{
                        'Authorization': currentTeacher.token,
                    }
                })
                if(response.status!==200&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                const data = await response.json()
                setForums(data.forums)
                console.log('data.forums: ', data);
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCourses()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"22px"}}>دوراتي</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم النادي</StyledTableCell>
                                <StyledTableCell TableCell>عدد المسجلين</StyledTableCell>
                                <StyledTableCell TableCell>عرض النادي</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            load?
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                                    :
                                    forums?.length>0?forums.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.title}
                                                </StyledTableCell>
                                                {/* <StyledTableCell component="th" scope="row" >
                                                    {item.Level.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Class.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Section?.title?item.Section?.title:''}
                                                </StyledTableCell> */}
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Students.length}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    <Button onClick={()=>navigate(`/teacher-dash/forums/${item.id}`)}><VisibilityIcon/></Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد نوادي متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
            </Box>
        </Layout>
    )
}

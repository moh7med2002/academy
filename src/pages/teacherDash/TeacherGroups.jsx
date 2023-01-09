import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import { useState } from 'react'
import { useEffect } from 'react'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

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

export default function TeacherGroups() {

    const navigate = useNavigate()
    const [groups,setGroups] = useState([])
    const [load,setLoad] = useState(false)
    const { currentTeacher } = useSelector((state) => state.teacher);

    useEffect(()=>
    {
        async function getGroups()
        {
            setLoad(true)
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/group/teacher`,{
                    headers:{
                        "Authorization":currentTeacher.token
                    }
                })
                const data = await response.json()
                setGroups(data.groups)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getGroups()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"22px"}}>مجموعاتي</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم المجموعة</StyledTableCell>
                                <StyledTableCell TableCell>سعر المجموعة</StyledTableCell>
                                <StyledTableCell TableCell>المرحلة الدراسية</StyledTableCell>
                                <StyledTableCell TableCell>السنة الدراسية</StyledTableCell>
                                <StyledTableCell TableCell>الشعبة الدراسية</StyledTableCell>
                                <StyledTableCell TableCell>مشاهدة</StyledTableCell>
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
                                    groups?.length>0?groups.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.price}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Level.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Class.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Section?.title?item.Section?.title:''}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    <Button onClick={()=>navigate(`/teacher-dash/groups/${item.id}`)}><VisibilityIcon/></Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد مجموعات متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
            </Box>
        </Layout>
    )
}

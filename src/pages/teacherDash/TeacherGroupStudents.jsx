import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button, Dialog} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import AddGroupLesson from '../../components/teacherDash/AddGroupLesson';
import UpdateGroupLesson from '../../components/teacherDash/UpdateGroupLesson';

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

export default function TeacherGroupStudents() {
    const [students,setStudents] = useState([])
    const [load,setLoad] = useState(false)
    const params = useParams()

    useEffect(()=>
    {
        async function getStudents()
        {
            try{
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API}/api/group/one/${params.id}`)
                const data = await response.json()
                setStudents(data.groupe.Students)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getStudents()
    },[])
    return (
        <Layout>
            <Text sx={{marginBottom:"15px"}}>الطلاب المسجلين بالمجموعة</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الطالب</StyledTableCell>
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
                                    students?.length>0?students.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.name}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد طلاب مسجلين بالمجموعة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
            </Box>
        </Layout>
    )
}

import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
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

export default function TeacherGrades() {
    const [load,setLoad] = useState(false)
    const [grades,setGrades] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>
    {   
        async function getGrades()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/exam/teacher/grades/${params.examId}`,{
                    headers:{
                        "Authorization":currentTeacher.token
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    setGrades(data.grades)
                    console.log(data.grades)
                    setLoad(false);
                });
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getGrades()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>كشف الدرجات</Text>
            <Button variant='contained' sx={{margin:"6px 0 20px"}} onClick={()=>navigate(-1)}>الرجوع</Button>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الطالب</StyledTableCell>
                                <StyledTableCell TableCell>علامة الطالب</StyledTableCell>
                                <StyledTableCell TableCell>العلامة الكلية</StyledTableCell>
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
                                    grades?.length>0?grades.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Student.name}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.studentGrade}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.totalGrade}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد درجات متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
                </Box>
        </Layout>
    )
}

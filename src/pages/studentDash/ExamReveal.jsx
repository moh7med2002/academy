import React from 'react'
import Layout from '../../components/studentDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Text = styled("h3")({})
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:"#18A0FB",
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

export default function ExamReveal() {
    const [load,setLoad] = useState(false)
    const [exams,setExams] = useState([])
    const { currentUser } = useSelector((state) => state.user);
    useEffect(()=>
    {   
        async function getExams()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/student/grades`,
                {
                    headers:{
                        'Authorization': currentUser.token,
                    }
                })
                if(response.status!==200&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                const data = await response.json()
                setExams(data.grades)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getExams()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"22px"}}>كشف العلامات</Text>
            <Box sx={{overflowX:"auto",maxWidth:{md:"100%",xs:"100%",margin:'auto'}}}>
                    <Table sx={{width:"100%"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>الامتحان</StyledTableCell>
                                <StyledTableCell TableCell>العلامة</StyledTableCell>
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
                                    exams?.length>0?exams.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.Exam.title}
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
                                        لا يوجد اختبارات متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
                </Box>
        </Layout>
    )
}

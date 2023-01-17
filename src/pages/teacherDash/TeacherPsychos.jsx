import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button,Tooltip} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableChartIcon from '@mui/icons-material/TableChart';
import FactCheckIcon from '@mui/icons-material/FactCheck';

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

export default function TeacherPsychos() {
    const [load,setLoad] = useState(false)
    const [psychos,setPsychos] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const navigate = useNavigate()

    useEffect(()=>
    {   
        async function getPsychos()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/psycho/all/teacher`,{
                    headers:{
                        "Authorization":currentTeacher.token
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    setPsychos(data.psychos)
                    setLoad(false);
                });
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getPsychos()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>جلساتي النفسية</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الجلسة</StyledTableCell>
                                <StyledTableCell TableCell>السعر</StyledTableCell>
                                <StyledTableCell TableCell>المدة</StyledTableCell>
                                <StyledTableCell TableCell>مشاهدة</StyledTableCell>
                                <StyledTableCell TableCell>الإجراءات</StyledTableCell>
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
                                    psychos?.length>0?psychos.map((item,index)=>
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
                                                    {item.duration}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Button onClick={()=>navigate(`/teacher-dash/psychos/${item.id}`)}><VisibilityIcon/></Button>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Tooltip title="جدول قبول ورفض الجلسات">
                                                        <Button onClick={()=>navigate(`/teacher-dash/psychos/${item.id}/sessions`)}><TableChartIcon/></Button>
                                                    </Tooltip>
                                                    <Tooltip title="جدول الجلسات المقبولة">
                                                        <Button onClick={()=>navigate(`/teacher-dash/psychos/${item.id}/sessionsAccepted`)}><FactCheckIcon/></Button>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد جلسات متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
                </Box>
        </Layout>
    )
}

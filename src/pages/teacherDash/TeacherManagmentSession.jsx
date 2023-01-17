import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button, Dialog} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CheckSession from '../../components/teacherDash/CheckSession';

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

export default function TeacherManagmentSession() {
    const [load,setLoad] = useState(false)
    const [psychos,setPsychos] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const [openCheck,setOpenCheck] = useState(false)
    const {id} = useParams()

    useEffect(()=>
    {   
        async function getPsychos()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/psycho/teacher/requested/${id}`,{
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
    },[id])

    async function rejectSession(id)
    {
        filterSessions(id)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/api/psycho/teacher/reject`,{
                method:"PUT",
                headers:{
                    "Authorization":currentTeacher.token,
                    "Content-Type":'application/json'
                },
                body:JSON.stringify({requestPsycho:id})
            })
            const data = await response.json()
            console.log(data)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    function filterSessions(id)
    {
        setPsychos(back=>back.filter(item=>item.id!==id))
    }

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>جدول قبول ورفض الجلسات</Text>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الطالب</StyledTableCell>
                                <StyledTableCell TableCell>تاريخ الطلب</StyledTableCell>
                                <StyledTableCell TableCell>الوصف</StyledTableCell>
                                <StyledTableCell TableCell>قبول</StyledTableCell>
                                <StyledTableCell TableCell>رفض</StyledTableCell>
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
                                                    {item.Student.name}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.createdAt.split('T')[0]}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.description}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Button color="success" onClick={()=>setOpenCheck(item.id)}><CheckIcon/></Button>
                                                </StyledTableCell>
                                                <Dialog open={openCheck===item.id} onClose={()=>setOpenCheck(false)}>
                                                    <CheckSession token={currentTeacher.token} id={item.id} setOpenCheck={setOpenCheck} filterSessions={filterSessions}/>
                                                </Dialog>
                                                <StyledTableCell>
                                                    <Button color="error" onClick={()=>rejectSession(item.id)}><CloseIcon/></Button>
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

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

export default function TeacherGroupLessons() {
    const [lessons,setLessons] = useState([])
    const [load,setLoad] = useState(false)
    const [openAddLesson,setOpenAddLesson] = useState(false)
    const [openEditLesson,setOpenEditLesson] = useState(false)
    const params = useParams()

    useEffect(()=>
    {
        async function getLessons()
        {
            try{
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API}/api/group/one/${params.id}`)
                const data = await response.json()
                setLessons(data.groupe.GroupLessons)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getLessons()
    },[])
    return (
        <Layout>
            <Text>الدروس</Text>
            <Button sx={{ marginBottom: "20px",marginTop:"20px"}} variant="contained" onClick={()=>setOpenAddLesson(true)}>
            + إضافة درس
            </Button>
            <Dialog open={openAddLesson} onClose={()=>setOpenAddLesson(false)}>
                <AddGroupLesson setOpenAdd={setOpenAddLesson} GroupId={params.id}/>
            </Dialog>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الدرس</StyledTableCell>
                                <StyledTableCell TableCell>رابط الدرس</StyledTableCell>
                                <StyledTableCell TableCell>موعد الدرس</StyledTableCell>
                                <StyledTableCell TableCell>وقت البداية</StyledTableCell>
                                <StyledTableCell TableCell>وقت النهاية</StyledTableCell>
                                <StyledTableCell TableCell>تعديل الدرس</StyledTableCell>
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
                                    lessons?.length>0?lessons.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.meetLink}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.day.split('T')[0]}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.startTime}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.EndTime}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    <Button onClick={()=>setOpenEditLesson(item.id)}>تعديل الدرس</Button>
                                                </StyledTableCell>
                                                <Dialog open={openEditLesson===item.id} onClose={()=>setOpenEditLesson(null)}>
                                                    <UpdateGroupLesson lesson={item} setOpenEdit={setOpenEditLesson}/>
                                                </Dialog>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد دروس متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
            </Box>
        </Layout>
    )
}

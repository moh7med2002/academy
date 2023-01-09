import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button,Tooltip,Dialog} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLesson from '../../components/teacherDash/AddLesson';
import TeacherUpdateLesson from '../../components/teacherDash/TeacherUpdateLesson';

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

export default function TeacherLessons() {
    const [load,setLoad] = useState(false)
    const [lessons,setLessons] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const params = useParams()

    useEffect(()=>
    {   
        async function getLessons()
        {
            try{
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API}/api/lesson/unit/${params.unitId}`,
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
                setLessons(data.lessons.filter(lesson=>lesson.status===1))
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getLessons()
    },[])

    const [openAddLesson,setOpenAddLesson] = useState(false)
    const [openEditLesson,setOpenEditLesson] = useState(false)
    const navigate = useNavigate()

    const deleteLesson = (lesson)=>{
        fetch(`${process.env.REACT_APP_API}/api/lesson/teacher/${lesson.id}`, {
            method: "DELETE",
            headers:{
                "Authorization":currentTeacher.token
            }
            }).then(res => res.json()).then(data => window.location.reload()).catch(err => console.log(err))
        };

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>الدروس</Text>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Button variant='contained' sx={{margin:"6px 0 20px"}} color="success" onClick={()=>setOpenAddLesson(true)}>+ إضافة درس</Button>
                <Button variant='contained' sx={{margin:"6px 0 20px"}} onClick={()=>navigate(-1)}>الرجوع</Button>
            </Box>
            
            <Dialog open={openAddLesson} onClose={()=>setOpenAddLesson(false)}>
                <AddLesson setOpenAdd={setOpenAddLesson}/>
            </Dialog>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الدرس</StyledTableCell>
                                <StyledTableCell TableCell>رابط الدرس</StyledTableCell>
                                <StyledTableCell TableCell>وصف الدرس</StyledTableCell>
                                <StyledTableCell TableCell>الاجراءات</StyledTableCell>
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
                                                    {item.videoUrl}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.content}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <Tooltip title={"تعديل الدرس"} placement="bottom">
                                                        <Button onClick={()=>setOpenEditLesson(item.id)}>
                                                            <EditIcon />
                                                        </Button>
                                                    </Tooltip>
                                                    <Dialog open={openEditLesson===item.id} onClose={()=>setOpenEditLesson(null)}>
                                                        <TeacherUpdateLesson setOpenEdit={setOpenEditLesson} lesson={item}/>
                                                    </Dialog>
                                                    <Tooltip title={"حذف الدرس"} placement="bottom">
                                                        <Button color={"error"} onClick={() => deleteLesson(item)}>
                                                            <DeleteIcon />
                                                        </Button>
                                                    </Tooltip>
                                                    </StyledTableCell>
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

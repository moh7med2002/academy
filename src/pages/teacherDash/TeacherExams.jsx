import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button,Tooltip,Dialog} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {Link,useNavigate} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import TeacherUpdateExam from '../../components/teacherDash/TeacherUpdateExam';
import AddExam from '../../components/teacherDash/AddExam';
import ReplyIcon from "@mui/icons-material/Reply";

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

export default function TeacherExams() {
    const [load,setLoad] = useState(false)
    const [exams,setExams] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const params = useParams()

    useEffect(()=>
    {   
        async function getLessons()
        {
            try{
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API}/api/unit/exams/${params.unitId}`,
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
                setExams(data.exams)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getLessons()
    },[])

    const [openAddExam,setOpenAddExam] = useState(false)
    const [openEditExam,setOpenEditExam] = useState(false)
    const navigate = useNavigate()

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>الاختبارات</Text>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Button variant='contained' color="success" sx={{margin:"6px 0 20px"}} onClick={()=>setOpenAddExam(true)}>+ إضافة اختبار</Button>
                <Button variant='contained' sx={{margin:"6px 0 20px"}} onClick={()=>navigate(-1)}>الرجوع</Button>
            </Box>
            <Dialog open={openAddExam} onClose={()=>setOpenAddExam(false)}>
                <AddExam setOpenExam={setOpenAddExam}/>
            </Dialog>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الاختبار</StyledTableCell>
                                <StyledTableCell TableCell>مدة الاختبار بالدقائق</StyledTableCell>
                                <StyledTableCell TableCell>عدد الأسئلة</StyledTableCell>
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
                                    exams?.length>0?exams.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.title}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.duration}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.questionsNumber}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <Tooltip title={"تعديل الاختبار"} placement="bottom">
                                                        <Button onClick={()=>setOpenEditExam(item.id)}>
                                                            <EditIcon />
                                                        </Button>
                                                    </Tooltip>
                                                    <Dialog open={openEditExam===item.id} onClose={()=>setOpenEditExam(false)}>
                                                        <TeacherUpdateExam  setOpenEdit={setOpenEditExam} exam={item}/>
                                                    </Dialog>
                                                    <Tooltip
                                                        title={"الانتقال الى أسئلة الاختبار"}
                                                        placement="bottom"
                                                    >
                                                        <Link to={`/courses/${params.courseId}/units/${params.unitId}/exams/${item.id}/questions`}>
                                                        <Button>
                                                            <ReplyIcon />
                                                        </Button>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title={"الانتقال الى كشف الدرجات "}
                                                        placement="bottom"
                                                    >
                                                        <Link to={`/exams/${item.id}/marks`}>
                                                        <Button>
                                                            <SignalCellularAltIcon />
                                                        </Button>
                                                        </Link>
                                                    </Tooltip>
                                                    </StyledTableCell>
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد امتحانات متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
                </Box>
        </Layout>
    )
}

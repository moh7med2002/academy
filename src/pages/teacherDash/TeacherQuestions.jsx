import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button,Tooltip,Dialog} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import AddQuestion from '../../components/teacherDash/AddQuestion';
import EditIcon from '@mui/icons-material/Edit';
import EditQuestion from '../../components/teacherDash/EditQuestion';

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

export default function TeacherQuestions() {
    const [load,setLoad] = useState(false)
    const [questions,setQuestions] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const [openEdit,setOpenEdit] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>
    {   
        async function getQuestions()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/exam/${params.examId}`,{
                    headers:{
                        "Authorization":currentTeacher.token
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    setQuestions(data.questions);
                    setLoad(false);
                });
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getQuestions()
    },[])

    const [openAddQuestion,setOpenAddQuestion] = useState(false)

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>الأسئلة</Text>
            <Box  sx={{display:"flex",justifyContent:"space-between"}}>
                <Button variant='contained' sx={{margin:"6px 0 20px"}} onClick={()=>setOpenAddQuestion(true)} color="success">+ إضافة سؤال</Button>
                <Button variant='contained' sx={{margin:"6px 0 20px"}} onClick={()=>navigate(-1)}>الرجوع</Button>
            </Box>
            <Dialog open={openAddQuestion} onClose={()=>setOpenAddQuestion(false)}>
                <AddQuestion setOpenExam={setOpenAddQuestion} examId={params.examId}/>
            </Dialog>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>السؤال</StyledTableCell>
                                <StyledTableCell TableCell>تعديل السؤال</StyledTableCell>
                                <StyledTableCell TableCell>الخيار الأول</StyledTableCell>
                                <StyledTableCell TableCell>الخيار الثاني</StyledTableCell>
                                <StyledTableCell TableCell>الخيار الثالث</StyledTableCell>
                                <StyledTableCell TableCell>الخيار الرابع</StyledTableCell>
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
                                    questions?.length>0?questions.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.title}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Button onClick={()=>setOpenEdit(item.id)}>
                                                        <EditIcon/>
                                                    </Button>
                                                    <Dialog open={item.id===openEdit}>
                                                        <EditQuestion setOpenEdit={setOpenEdit} question={item}/>
                                                    </Dialog>
                                                </StyledTableCell>
                                                {item.answers?.map((answer,index)=>
                                                {
                                                    return <StyledTableCell key={index+"z123"} sx={{color:answer.isRight&&"red"}}>{answer.title}</StyledTableCell>
                                                })}
                                            </StyledTableRow>
                                            )
                                        }
                                )
                                :
                                <StyledTableRow>
                                    <StyledTableCell colSpan={8}>
                                        لا يوجد أسئلة متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
                </Box>
        </Layout>
    )
}

import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {styled,Table,TableBody,TableHead,TableCell,TableRow,CircularProgress,Box, Button,Tooltip,Dialog} from '@mui/material'
import  { tableCellClasses } from '@mui/material/TableCell';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {Link,useNavigate} from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizIcon from '@mui/icons-material/Quiz';
import TeacherUpdateUnit from '../../components/teacherDash/TeacherUpdateUnit';
import AddUnit from '../../components/teacherDash/AddUnit';

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

export default function TeacherUnits() {
    const [load,setLoad] = useState(false)
    const [units,setUnits] = useState([])
    const { currentTeacher } = useSelector((state) => state.teacher);
    const params = useParams()

    const [openUpdate,setOpenUpdate] = useState(false)
    const [openCreateUnit,setOpenCreateUnit] = useState(false)

    const navigate = useNavigate()

    function handleCloseUpdate()
    {
        setOpenUpdate(false)
    }

    function handleClostCreateUnit()
    {
        setOpenCreateUnit(false)
    }

    const unitDelete = (unitId) => {
        fetch(`${process.env.REACT_APP_API}/api/unit/teacher/${unitId}`, {
            method: "DELETE",
            headers:{
                "Authorization":currentTeacher.token
            }
            })
            .then((res) => res.json())
            .then((data) => window.location.reload())
            .catch((err) => console.log(err));
        };

    useEffect(()=>
    {   
        async function getCourse()
        {
            try{
                setLoad(true)
                const response = await fetch(`${process.env.REACT_APP_API}/api/unit/course/${params.courseId}`,
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
                setUnits(data.units)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getCourse()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"26px"}}>الوحدات</Text>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Button variant='contained' color="success" sx={{margin:"6px 0 20px"}} onClick={()=>setOpenCreateUnit(true)}>+ إضافة وحدة</Button>
                <Button variant='contained' sx={{margin:"6px 0 20px"}} onClick={()=>navigate(-1)}>الرجوع</Button>
            </Box>
            <Dialog open={openCreateUnit} onClose={handleClostCreateUnit}>
                <AddUnit setOpenAdd={setOpenCreateUnit}/>
            </Dialog>
            <Box sx={{overflowX:"auto",maxWidth:"100%"}}>
                    <Table sx={{ minWidth:"500px"}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell TableCell>اسم الوحدة</StyledTableCell>
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
                                    units?.length>0?units.map((item,index)=>
                                        {
                                            return(
                                            <StyledTableRow key={index+'0o'}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {item.title}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <Tooltip title={"تعديل الوحدة"} placement="bottom">
                                                        <Button onClick={()=>setOpenUpdate(item.id)}>
                                                            <EditIcon />
                                                        </Button>
                                                    </Tooltip>
                                                    <Dialog open={openUpdate===item.id} onClose={handleCloseUpdate} aria-labelledby="responsive-dialog-title">
                                                        <TeacherUpdateUnit handleCloseUpdate={handleCloseUpdate} unit={item}/>
                                                    </Dialog>
                                                    <Tooltip
                                                        title={"الانتقال الى دروس الوحدة"}
                                                        placement="bottom"
                                                    >
                                                        <Link to={`/teacher-dash/courses/${item.id}/lessons`}>
                                                        <Button>
                                                            <VisibilityIcon />
                                                        </Button>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title={"الانتقال الى اختبارات الوحدة"}
                                                        placement="bottom"
                                                    >
                                                        <Link to={`/teacher-dash/courses/${params.courseId}/units/${item.id}/exams`}>
                                                        <Button>
                                                            <QuizIcon />
                                                        </Button>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title={"حذف الوحدة"} placement="bottom">
                                                        <Button onClick={()=>{unitDelete(item.id)}} color={"error"}>
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
                                        لا يوجد وحدات متاحة       
                                    </StyledTableCell>
                                </StyledTableRow>
                                }
                            </TableBody>
                    </Table>
                </Box>
        </Layout>
    )
}

import { Box,styled, Typography ,Button, Dialog} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Layout from '../../components/teacherDash/Layout'
import UpdateGroup from '../../components/teacherDash/UpdateGroup'

const Image = styled("img")({
    width:"350px",
    height:"250px"
})

export default function TeacherSingleGroup() {

    const params = useParams()
    const navigate = useNavigate()
    const [group,setGroup] = useState(null)
    const [openEditGroup,setOpenEditGroup] = useState(false)

    useEffect(()=>
    {
        async function getGroup()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/group/one/${params.id}`)
                const data = await response.json()
                setGroup(data.groupe)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getGroup()
    },[params.id])

    return (
        <Layout>
            <Box sx={{marginBottom:"50px"}}>
                {
                    group?
                    <>
                        <Image src={`${process.env.REACT_APP_API}/images/${group.image}`}/>
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>إسم المجموعة : {group.title}</Typography>
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>سعر المجموعة : {group.price} دج</Typography>
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>المرحلة الدراسية : {group.Level.title}</Typography>
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>الصف الدراسي: {group.Class.title}</Typography>
                        {group.Section&&
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>الشعبة الدراسية : {group.Section.title}</Typography>
                        }
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>عدد الطلاب المسموح لهم بالتسحيل : {group.allowedStudents}</Typography>
                        <Typography sx={{marginTop:"10px",fontWeight:"500"}}>عدد الطلاب المسجلين : {group.registerStudents?group.registerStudents:0}</Typography>
                        <Box sx={{marginTop:"30px"}}>
                            <Typography sx={{marginBottom:"8px",fontWeight:"600"}}>الوصف : </Typography>
                            <Typography sx={{fontSize:"15px"}}>{group.description}</Typography>
                        </Box>
                        <Box sx={{marginTop:"30px"}}>
                            <Typography sx={{marginBottom:"8px",fontWeight:"600"}}>الهدف : </Typography>
                            <Typography sx={{fontSize:"15px"}}>{group.goals}</Typography>
                        </Box>
                        <Box sx={{marginTop:"35px"}}>
                            <Button variant='contained' onClick={()=>setOpenEditGroup(true)} sx={{marginRight:"10px",marginBottom:"6px"}}>تعديل المجموعة</Button>
                            <Button variant='contained' onClick={()=>navigate(`/teacher-dash/groups/${group.id}/students`)} sx={{marginRight:"10px",marginBottom:"6px"}}>الإنتقال إلى الطلبة المسجلين </Button>
                            <Button variant='contained' onClick={()=>navigate(`/teacher-dash/groups/${group.id}/lessons`)}>الإنتقال إلى دروس المجموعة</Button>
                        </Box>
                        <Dialog open={openEditGroup} onClose={()=>setOpenEditGroup(false)}>
                            <UpdateGroup setOpenEdit={setOpenEditGroup} group={group}/>
                        </Dialog>
                    </>
                    :
                    <Typography>جاري التحميل ...</Typography>
                }
            </Box>
        </Layout>
    )
}

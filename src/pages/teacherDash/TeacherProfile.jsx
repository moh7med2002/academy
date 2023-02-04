import React from 'react'
import Layout from '../../components/teacherDash/Layout'
import {Avatar, Typography,styled, Box, Button} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ImageIcon from '@mui/icons-material/Image';
import {useSnackbar} from 'notistack'
import {updateTeacher} from '../../redux/teacherSlice'

export default function TeacherProfile() {

    const Span = styled("Span")({fontSize:"18px",fontWeight:"500"})
    const [teacher,setTeacher] = useState(null)
    const { currentTeacher } = useSelector((state) => state.teacher);
    const [image,setImage] = useState(null)
    const {enqueueSnackbar,closeSnackbar} = useSnackbar()
    const dispatch = useDispatch()
    useEffect(()=>
    {
        async function getTeacher()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/teacher/${currentTeacher?.teacher?.id}`,{
                    headers:{
                        'Authorization': currentTeacher.token,
                    }
                })
                const data = await response.json()
                setTeacher(data.teacher)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getTeacher()
    },[])

    async function udapteProfileImage()
    {
        const formData = new FormData()
        formData.append('image',image)
        closeSnackbar()
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/api/teacher/update/image`,{
                method:"PUT",
                headers:{
                    'Authorization': currentTeacher.token,
                },
                body:formData
            })
            if(response.status!==20&&response.status!==201)
            {
                enqueueSnackbar("فشل تحميل الصورة",{variant:"error",autoHideDuration:"2000"})
                throw new Error('failed image upload')
            }
            const data = await response.json()
            dispatch(updateTeacher({teacher : data.teacher}))
            console.log(data)
            window.location.reload()
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Layout>
            <Box sx={{marginBottom:"30px"}}>
                <Box sx={{position:"relative",marginBottom:"15px"}}>
                    <Avatar src={image ? URL.createObjectURL(image) :`${process.env.REACT_APP_API}/images/${teacher?.image}`} 
                    alt={teacher?.name} sx={{width:"120px",height:"120px",fontSize:"38px"}}/>
                    <label htmlFor='image_profile'>
                        <Box sx={{position:"absolute",bottom:"-6px",left:"70px",cursor:"pointer",width:"30px",height:"30px",
                        borderRadius:"50%",backgroundColor:"#18A0FB",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <ImageIcon sx={{fontSize:"18px"}}/>
                        </Box>
                    </label>
                    <input id='image_profile' type="file" hidden onChange={(e)=>setImage(e.target.files[0])}/>
                </Box>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الاسم : <Span>{teacher?.name}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الايميل  : <Span>{teacher?.email}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الجنس  : <Span>{teacher?.gender==='male'?"ذكر":"أنثى"}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>رقم الجوال  : <Span>{teacher?.phone}</Span></Typography>
                {
                    image&&
                    <Button variant="contained" sx={{marginTop:"15px"}} onClick={udapteProfileImage}>تعديل الصورة الشخصية</Button>
                }
            </Box>
        </Layout>
    )
}

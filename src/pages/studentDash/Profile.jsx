import React from 'react'
import Layout from '../../components/studentDash/Layout'
import {Avatar, Typography,styled, Box, Button} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ImageIcon from '@mui/icons-material/Image';
import {useSnackbar} from 'notistack'
import {updateStudent} from '../../redux/userSilce'
export default function Profile() {

    const Span = styled("Span")({fontSize:"18px",fontWeight:"500"})
    const [user,setUser] = useState({})
    const { currentUser } = useSelector((state) => state.user);
    const [image,setImage] = useState(null)
    const {enqueueSnackbar,closeSnackbar} = useSnackbar()
    const dispatch = useDispatch()

    useEffect(()=>
    {
        async function getUser()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/student/${currentUser.student.id}`,{
                    headers:{
                        'Authorization': currentUser.token,
                    }
                })
                const data = await response.json()
                setUser(data.student)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getUser()
    },[])

    async function udapteProfileImage()
    {
        const formData = new FormData()
        formData.append('image',image)
        closeSnackbar()
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/api/student/update/image`,{
                method:"PUT",
                headers:{
                    'Authorization': currentUser.token,
                },
                body:formData
            })
            if(response.status!==20&&response.status!==201)
            {
                enqueueSnackbar("فشل تحميل الصورة",{variant:"error",autoHideDuration:"2000"})
                throw new Error('failed image upload')
            }
            const data = await response.json()
            dispatch(updateStudent({student : data.student}))
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
                    <Avatar src={image ? URL.createObjectURL(image) :`${process.env.REACT_APP_API}/images/${user?.image}`} 
                    alt={user?.name} sx={{width:"120px",height:"120px",fontSize:"38px"}}/>
                    <label htmlFor='image_profile'>
                        <Box sx={{position:"absolute",bottom:"-6px",left:"70px",cursor:"pointer",width:"30px",height:"30px",
                        borderRadius:"50%",backgroundColor:"#18A0FB",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <ImageIcon sx={{fontSize:"18px"}}/>
                        </Box>
                    </label>
                    <input id='image_profile' type="file" hidden onChange={(e)=>setImage(e.target.files[0])}/>
                </Box>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الاسم : <Span>{user?.name}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الايميل  : <Span>{user?.email}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الجنس  : <Span>{user?.gender==='male'?"ذكر":"أنثى"}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>المرحلة الدراسية : <Span>{user?.Level?.title}</Span></Typography>
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الصف الدراسي : <Span>{user?.Class?.title}</Span></Typography>
                {user?.Section&&
                <Typography sx={{fontSize:"18px",fontWeight:"600",marginBottom:"8px"}}>الشعبة الدراسية  : <Span>{user?.Section.title}</Span></Typography>}
                {
                    image&&
                    <Button variant="contained" sx={{marginTop:"15px"}} onClick={udapteProfileImage}>تعديل الصورة الشخصية</Button>
                }
            </Box>
        </Layout>
    )
}

import React,{useState} from 'react'
import Layout from '../../components/studentDash/Layout'
import {styled, TextField,Button,Dialog,DialogTitle,DialogContent,Box,DialogActions} from '@mui/material'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useSnackbar} from 'notistack'
const Text = styled("h3")({})
const Image = styled("img")({})

export default function StudentWallet() {
    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar()

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const Input = styled('input')({})
    
    const [money,setMoney] = useState(0)
    const [image,setImage] = useState("")

    const handleSubmit = async(e)=>
    {
        try{
            e.preventDefault()
            if(!image)
            {
                return ;
            }
            const formData = new FormData()
            formData.append("image",image)
            formData.append('money',money)
            const response = await fetch(`${process.env.REACT_APP_API}/api/wallet/student/add`,
            {
                method:"POST",
                headers:{
                    'Authorization': currentUser.token,
                },
                body:formData
            })
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
            const data = await response.json()
            enqueueSnackbar("تم إرسال المبلغ المضاف للإدارة بنجاح",{variant:"success"})
            setOpen(false);
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const [userMoney,setUserMoney] = useState(0)
    useEffect(()=>
    {
        async function getMoney()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/student/money`,
                {
                    headers:{
                        'Authorization': currentUser.token,
                    },
                })
                const data = await response.json()
                setUserMoney(data.money)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getMoney()
    },[])

    return (
        <Layout>
            <Text sx={{marginBottom:"15px",fontSize:"22px"}}>محفظتي</Text>
            <Text sx={{marginBottom:"20px"}}>المبلغ المتوفر : {userMoney} دج </Text>
            <Button variant="contained" sx={{fontFamily:"Tajawal"}} onClick={handleClickOpen}>إضافة مبلغ للمحفطة</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={(e)=>handleSubmit(e)}>
                <DialogContent>
                <DialogTitle id="alert-dialog-title" sx={{fontFamily:"Tajawal",marginBottom:"15px"}}>إضافة مبلغ للمحفظة</DialogTitle>
                    <TextField required label="المبلغ" variant='outlined' type="number" sx={{marginBottom:"15px",width:"350px",maxWidth:"100%"}}
                    onChange={(e)=>setMoney(e.target.value)}/>
                    <Box>
                        <Input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    </Box>
                    {image&&<Image src={URL.createObjectURL(image)} sx={{marginTop:"20px",width:"100%",height:"300px"}}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">إلغاء</Button>
                    <Button  variant="contained" type="submit">حفظ</Button>
                </DialogActions>
                </form>
            </Dialog>
        </Layout>
    )
}
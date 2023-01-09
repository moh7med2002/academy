import { Box, Typography , Button } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <Box className="container" sx={{display:"flex",justifyContent:"center",alingItems:"center",marginTop:"100px",minHeight:"60vh"}}>
            <Box>
                <Typography sx={{fontSize:"140px",fontWeight:"600",textAlign:"center"}}>
                    404
                </Typography>
                <Typography sx={{fontSize:"18px",marginBottom:"24px"}}>
                    الصفحة التي تبحث عنها غير موجودة. ولكن يمكنك النقر فوق الزر أدناه للعودة إلى الصفحة الرئيسية.
                </Typography>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Button variant='contained' onClick={()=>navigate('/')}>الصفحة الرئيسية</Button>
                </Box>
            </Box>
        </Box>
    )
}

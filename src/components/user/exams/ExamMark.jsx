import { Box, Typography ,Card, CardContent} from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import React from 'react'

export default function ExamMark({totalMark,examMark}) {
    return (
        <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",paddingTop:{md:"30px"}}}>
            <Card sx={{width:"300px",textAlign:"center",maxWidth:"100%"}}>
                <CardContent>
                    <EmojiEmotionsIcon sx={{color:"orange",fontSize:"100px"}}/>
                    <Typography sx={{fontSize:"24px",fontWeight:"500",margin:"8px 0px 16px"}}>حظ موفق !</Typography>
                    <Typography sx={{fontSize:"18px",fontWeight:"500",marginTop:"14px"}}>علامتك : {examMark}</Typography>
                    <Typography sx={{fontSize:"18px",fontWeight:"500",marginTop:"4px"}}>العلامة الكلية : {totalMark}</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

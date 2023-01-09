import { DialogTitle,DialogContent,DialogActions, Typography,styled,Button} from '@mui/material'
import { useNavigate } from 'react-router'
import React from 'react'

export default function ExamDetails({exam,setOpenExamDialog}) {
    const Span = styled("span")({})
    const navigate = useNavigate()
    return (
        <>
            <DialogTitle>{exam.title}</DialogTitle>
            <DialogContent sx={{width:"350px",maxWidth:"100%"}}>
                <Typography sx={{marginBottom:"6px"}}>مدة الاختبار : <Span>{exam.duration} دقائق</Span></Typography>
                <Typography sx={{marginBottom:"10px"}}>عدد الأسئلة : <Span>{exam.questionsNumber} دقائق</Span></Typography>
                <DialogActions>
                <Button autoFocus onClick={()=>setOpenExamDialog(false)}>
                    إلغاء
                </Button>
                <Button variant="contained" onClick={()=>navigate(`/exams/${exam.id}`)}>تقديم</Button>
                </DialogActions>
            </DialogContent>
        </>
    )
}

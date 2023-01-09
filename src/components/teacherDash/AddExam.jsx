import React from 'react'
import {DialogTitle,DialogContent,TextField,DialogActions,Button} from '@mui/material'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
export default function AddExam({setOpenExam}) {
    const { register, handleSubmit } = useForm();
    const { currentTeacher } = useSelector((state) => state.teacher);
    const params = useParams()
    return (
        <form
        onSubmit={handleSubmit((data) => {
            fetch(`${process.env.REACT_APP_API}/api/exam/teacher/create`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization":currentTeacher.token
                },
                body: JSON.stringify({
                title: data.title,
                duration: data.duration,
                questionsNumber: data.numberOfQuestions,
                UnitId:params.unitId
                }),
            })
                .then((res) => res.json())
                .then((info) => {
                window.location.reload()
                })
                .catch((err) => {
                console.log(err);
                });
            })}
        >
            <DialogTitle>إضافة اختبار</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"اسم الاختبار"}
                type="text"
                fullWidth
                variant="standard"
                {...register("title")}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"مدة الاختبار بالدقائق"}
                type="text"
                fullWidth
                variant="standard"
                {...register("duration")}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"عدد الأسئلة"}
                type="text"
                fullWidth
                variant="standard"
                {...register("numberOfQuestions")}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenExam(false)}>إلغاء</Button>
            <Button type="submit" onClick={() => setOpenExam(false)}>
                موافق
            </Button>
            </DialogActions>
        </form>
    )
}

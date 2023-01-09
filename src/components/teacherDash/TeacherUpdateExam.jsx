import React from 'react'
import {DialogTitle,TextField,DialogContent,DialogActions,Button} from '@mui/material'
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';

export default function TeacherUpdateExam({setOpenEdit,exam}) {
    const { register, handleSubmit } = useForm();
    const { currentTeacher } = useSelector((state) => state.teacher);
    return (
        <div>
            <form
            onSubmit={handleSubmit((data) => {
                fetch(`${process.env.REACT_APP_API}/api/exam/teacher/${exam.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":currentTeacher.token
                },
                body: JSON.stringify({
                    title: data.title,
                    duration: data.duration,
                    questionsNumber: data.numberOfQuestions,
                }),
                })
                .then((res) => res.json())
                .then((info) => {
                    console.log(info);
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err);
                });
            })}
            >
            <DialogTitle>تعديل اختبار</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"اسم الاختبار"}
                type="text"
                fullWidth
                variant="standard"
                defaultValue={exam.title}
                {...register("title")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"مدة الاختبار بالدقائق"}
                type="text"
                fullWidth
                defaultValue={exam.duration}
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
                defaultValue={exam.questionsNumber}
                {...register("numberOfQuestions")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
                <Button type="submit" onClick={() => setOpenEdit(false)}>
                موافق
                </Button>
            </DialogActions>
            </form>
        </div>
    )
}
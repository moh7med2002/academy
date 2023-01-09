import React from 'react'
import {DialogTitle,DialogContent,TextField,DialogActions,Button} from '@mui/material'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
export default function TeacherUpdateLesson({setOpenEdit,lesson}) {
    const { currentTeacher } = useSelector((state) => state.teacher);
    const { register, handleSubmit } = useForm();
    console.log(lesson);
    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => {
                fetch(`${process.env.REACT_APP_API}/api/lesson/teacher/${lesson.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":currentTeacher.token
                },
                body: JSON.stringify({
                    title: data.editName,
                    videoUrl: data.editUrl,
                    content: data.editDescribe,
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
            <DialogTitle>تعديل الدرس</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"اسم الدرس"}
                type="text"
                fullWidth
                defaultValue={lesson.title}
                variant="standard"
                {...register("editName")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"رابط الدرس"}
                type="text"
                fullWidth
                defaultValue={lesson.videoUrl}
                variant="standard"
                {...register("editUrl")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"وصف الدرس"}
                type="text"
                fullWidth
                defaultValue={lesson.content}
                variant="standard"
                {...register("editDescribe")}
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

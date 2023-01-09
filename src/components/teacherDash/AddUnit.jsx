import React from 'react'
import {DialogTitle,DialogContent,TextField,DialogActions,Button} from '@mui/material'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

export default function AddUnit({setOpenAdd}) {
    const { currentTeacher } = useSelector((state) => state.teacher);
    const { register, handleSubmit } = useForm();
    const params = useParams()
    return (
        <>
        <form
        onSubmit={handleSubmit((data) => {
                fetch(`${process.env.REACT_APP_API}/api/unit/teacher/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":currentTeacher.token
                
                },
                body: JSON.stringify({
                    title: data.title,
                    CourseId: params.courseId,
                }),
                })
                .then((res) => res.json())
                .then((info) => {
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err);
                });
            })}>
            <DialogTitle>إضافة وحدة</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"اسم الوحدة"}
                type="text"
                fullWidth
                variant="standard"
                {...register("title")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenAdd(false)}>إلغاء</Button>
                <Button type="submit" onClick={() => setOpenAdd(false)}>
                موافق
                </Button>
            </DialogActions>
        </form></>
    )
}

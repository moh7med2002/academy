import React from 'react'
import {DialogTitle,DialogContent,TextField,DialogActions,Button} from '@mui/material'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import {useSnackbar} from 'notistack'
export default function AddLesson({setOpenAdd}) {
    const { currentTeacher } = useSelector((state) => state.teacher);
    const { register, handleSubmit } = useForm();
    const params = useParams()
    const {closeSnackbar,enqueueSnackbar}  = useSnackbar()

    return (
        <div>
            <form
            onSubmit={handleSubmit((data) => {
                fetch(`${process.env.REACT_APP_API}/api/lesson/teacher/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":currentTeacher.token
                },
                body: JSON.stringify({
                    title: data.name,
                    UnitId: params.unitId,
                    videoUrl: data.url,
                    content: data.describe,
                }),
                })
                .then((res) => res.json())
                .then((info) => {
                    enqueueSnackbar('تم إرسال الدرس للموافقة من قبل الأدمن',{variant:"success",autoHideDuration:4000})
                })
                .catch((err) => {
                    console.log(err);
                });
            })}
            >
            <DialogTitle>إضافة درس</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"اسم الدرس"}
                type="text"
                fullWidth
                variant="standard"
                {...register("name")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"رابط الدرس"}
                type="text"
                fullWidth
                variant="standard"
                {...register("url")}
                />
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"وصف الدرس"}
                type="text"
                fullWidth
                variant="standard"
                {...register("describe")}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenAdd(false)}>إلغاء</Button>
                <Button type="submit" onClick={() => setOpenAdd(false)}>
                موافق
                </Button>
            </DialogActions>
            </form>
        </div>
    )
}

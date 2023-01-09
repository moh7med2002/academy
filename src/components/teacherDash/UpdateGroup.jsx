import React from 'react'
import {DialogTitle,DialogContent,TextField,DialogActions,Button, Box} from '@mui/material'
import { useSelector } from "react-redux";
import { useForm  , Controller} from "react-hook-form";
import { useState } from 'react';

export default function UpdateGroup({setOpenEdit,group}) {
    const { handleSubmit  , control} = useForm({
        defaultValues:{
            title:group.title,
            price:group.price,
            description:group.description,
            TeacherId:group.TeacherId,
            goals:group.goals,
            allowedStudents:group.allowedStudents
        }
    });
    const { currentTeacher } = useSelector((state) => state.teacher);
    const [load,setLoad] = useState(false)

    return (
        <div>
            <form
            onSubmit={handleSubmit((data) => {
                setLoad(true)
                fetch(`${process.env.REACT_APP_API}/api/group/teacher/update/${group.id}`, {
                method: "PUT",
                headers:{
                    "Authorization":currentTeacher.token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({title:data.title,price:data.price,description:data.description,TeacherId:group.TeacherId,goals:data.goals,allowedStudents:data.allowedStudents})
                })
                .then((res) => res.json())
                .then((info) => {
                    window.location.reload();
                    setOpenEdit(false);
                    setLoad(false)
                })
                .catch((err) => {
                    console.log(err);
                });
            })}
            >
            <DialogTitle>تعديل مجموعة</DialogTitle>
            <DialogContent sx={{width:"500px"}}>
            <Box sx={{marginBottom:"15px"}}>
            <Controller
                name="title"
                control={control}
                rules={{required:true}}
                render={({ field }) => <TextField {...field} label="اسم المجموعة" fullWidth variant="standard" />}
            />
            </Box>
            <Box sx={{marginBottom:"15px"}}>
            <Controller
                name="goals"
                control={control}
                rules={{required:true}}
                render={({ field }) => <TextField {...field} label="هدف المجموعة" fullWidth variant="standard" />}
            />
            </Box>
            <Box sx={{marginBottom:"15px"}}>
            <Controller
                name="price"
                control={control}
                rules={{required:true}}
                render={({ field }) => <TextField {...field} label="سعر المجموعة" fullWidth variant="standard" type={"number"}/>}
            /></Box>
            <Box sx={{marginBottom:"15px"}}>
            <Controller
                name="description"
                control={control}
                rules={{required:true}}
                render={({ field }) => <TextField {...field} label="وصف المجموعة" fullWidth variant="standard" />}
            /></Box>
            <Box sx={{marginBottom:"15px"}}>
            <Controller
                name="allowedStudents"
                control={control}
                rules={{required:true}}
                render={({ field }) => <TextField {...field} label={"عدد الطلاب المسموحين"} fullWidth variant="standard" type={"number"} />}
            /></Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
                {!load?
                <Button type="submit">
                موافق
                </Button>
                :
                <Button>يتم التعديل ...</Button>}
            </DialogActions>
            </form>
        </div>
    )
}

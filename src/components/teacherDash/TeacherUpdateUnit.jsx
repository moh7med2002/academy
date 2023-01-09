import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function TeacherUpdateCourse({handleCloseUpdate,unit}) {
    const [title,setTitle] = useState(unit.title)
    const { currentTeacher } = useSelector((state) => state.teacher);

    async function updateUnit()
    {
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/api/unit/teacher/${unit.id}`,
            {
                method:"PUT",
                headers:{
                    'Authorization': currentTeacher.token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({title})
            })
            if(response.status!==200&response.status!==201)
            {
                throw new Error('failed occured')
            }
            handleCloseUpdate()
            window.location.reload()
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Box>
            <DialogTitle id="responsive-dialog-title">
            تعديل الوحدة
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                <TextField name="title" value={title} onChange={(e)=>setTitle(e.target.value)} label="العنوان" sx={{marginTop:"10px"}}/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleCloseUpdate}>
                إلغاء
            </Button>
            <Button onClick={updateUnit} autoFocus>
                تحديث
            </Button>
            </DialogActions>
        </Box>
    )
    }

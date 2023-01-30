import { Container, Typography,Button } from '@mui/material'
import React from 'react'
import LayoutParent from '../../components/parentDash/LayoutParent'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AddStudents() {
    const [value, setValue] = useState([]);
    const [students,setStduents] = useState([])

    useEffect(()=>
    {
      async function getAllStudents()
      {
        try{
          const response = await fetch(`${process.env.REACT_APP_API}/api/parent/students/all`)
          const data = await response.json()
          setStduents(data.students)
        }
        catch(err)
        {
          console.log(err)
        }
      }
      getAllStudents()
    },[])
    
    return (
        <LayoutParent>
            <Container sx={{marginTop:"100px",marginBottom:"60px"}}>
                <Typography sx={{fontSize:"24px",fontWeight:"600",color:"#424242",marginBottom:"15px"}}>إضافة أبناء</Typography>
                {students?.length>0&&
                <Autocomplete
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                multiple
                id="size-small-standard-multi"
                size="small"
                options={students}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="إضافة أبناء"
                />
                )}
            />}
            <Button sx={{marginTop:"20px"}} variant="contained">حفظ</Button>
            </Container>
        </LayoutParent>
    )
}
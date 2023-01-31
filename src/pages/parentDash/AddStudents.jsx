import { Container, Typography,Button } from '@mui/material'
import React from 'react'
import LayoutParent from '../../components/parentDash/LayoutParent'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'

export default function AddStudents() {
    const [value, setValue] = useState([]);
    const [students,setStduents] = useState([])
    const { currentParent } = useSelector((state) => state.parent);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar()
    const [load,setLoad] = useState(false)

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

    async function handelPushStudents()
    {
      const newStudents = value.map((item,index)=>
      {
        return item.id
      })
      try{
          setLoad(true)
          closeSnackbar()
          const response = await fetch(`${process.env.REACT_APP_API}/api/parent/students/add`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            'Authorization':currentParent.token
          },
          body:JSON.stringify({students:newStudents})
        })
        if(response.status!==200&&response.status!==201)
        {
          setLoad(false)
          throw new Error('failed occured')
        }
        setLoad(false)
        const data = await response.json()
        enqueueSnackbar(data.message,{variant:"success",autoHideDuration:8000})
      }
      catch(err)
      {
        console.log(err)
      }
    }
    
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
            {!load?
              <Button sx={{marginTop:"20px"}} variant="contained" onClick={handelPushStudents}>حفظ</Button>
            :
            <Button sx={{marginTop:"20px"}} variant="contained">حفظ ...</Button>}
            </Container>
        </LayoutParent>
    )
}
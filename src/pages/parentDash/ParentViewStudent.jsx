import { Container } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import LayoutParant from '../../components/parentDash/LayoutParent'
import ParentBoxes from '../../components/parentDash/ParentBoxes'
import ViewStudentMarks from '../../components/parentDash/ViewStudentMarks'

export default function ParentViewStudent() {
    const {id} = useParams()
    const [info,setInfo] = useState(null)
    const { currentParent } = useSelector((state) => state.parent);

    useEffect(()=>
        {
            async function getStudent()
            {
                try{
                    const response = await fetch(`${process.env.REACT_APP_API}/api/parent/student/${id}`,{
                        headers:{
                            'Authorization': currentParent.token,
                        }
                    })
                    const data = await response.json()
                    setInfo(data)
                }
                catch(err)
                {
                    console.log(err)
                }
            }
            if(id)
            {
                getStudent()
            }
        },[id])

    return (
        <LayoutParant>
            <Container sx={{marginTop:"90px",marginBottom:"40px"}}>
                {info&&
                <>
                    <ParentBoxes info={info.student}/>
                    <ViewStudentMarks grades={info.grades}/>
                </>
                }
            </Container>
        </LayoutParant>
    )
}

import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import LayoutParant from '../../components/parentDash/LayoutParent'
import ParentBoxes from '../../components/parentDash/ParentBoxes'
import ViewStudentMarks from '../../components/parentDash/ViewStudentMarks'

export default function ParentViewStudent() {
    const {id} = useParams()
    return (
        <LayoutParant>
            <Container sx={{marginTop:"90px",marginBottom:"40px"}}>
                <ParentBoxes/>
                <ViewStudentMarks/>
            </Container>
        </LayoutParant>
    )
}

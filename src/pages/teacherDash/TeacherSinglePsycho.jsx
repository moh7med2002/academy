import {styled, Box, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Layout from '../../components/teacherDash/Layout'

const Image = styled("img")({
    height:"300px",
    borderRadius:"8px"
})

export default function TeacherSinglePsycho() {
    const {id} = useParams()
    const [psycho,setPsycho] = useState(null)

    useEffect(()=>
    {
        async function getPsycho()
        {
            try{
                fetch(`${process.env.REACT_APP_API}/api/psycho/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setPsycho(data.psycho)
                });
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getPsycho()
    },[id])

    return (
        <Layout>
            {
                psycho&&
                <Box sx={{width:"500px",maxWidth:"100%",marginBottom:"40px"}}>
                    <Image src={`${process.env.REACT_APP_API}/images/${psycho.image}`}/>
                    <Box sx={{marginTop:"10px"}}>
                    <Typography sx={{fontSize:"22px",fontWeight:"500",marginBottom:"15px"}}>{psycho.title}</Typography>
                    <Box sx={{display:"flex",justifyContent:"space-between"}}>
                        <Typography sx={{fontSize:"15px",fontWeight:"500"}}>السعر : {psycho.price} دج</Typography>
                        <Typography sx={{fontSize:"15px",fontWeight:"500"}}>المدة : {psycho.duration} دقائق</Typography>
                    </Box>
                    <Typography sx={{fontSize:"14px",marginTop:"20px",textAlign:"justify",textJustify:"inter-word"}}>{psycho.description}</Typography>
                </Box>
                </Box>
            }
        </Layout>
    )
}

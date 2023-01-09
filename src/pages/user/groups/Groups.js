import { useEffect, useState } from "react";
import Group from "../../../components/user/groups/Group";
import "../../../assest/css/user/groups/groupsPage.css";
import {Box, Grid, Typography} from '@mui/material'
import { useSelector } from "react-redux";
export default function Groups() {

  const { currentUser } = useSelector((state) => state.user);
  const [groups,setGroups] = useState([])

  useEffect(()=>
  {
    async function getGroups()
    {
      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/group/forStudent`,{
          headers:{
            "Authorization":currentUser.token
          }
        })
        const data = await response.json()
        setGroups(data.groups)
      }
      catch(err)
      {
        console.log(err)
      }
    }
    getGroups()
  })

  return (
    <Box className="container" sx={{marginTop:"100px",minHeight:"50vh"}}>
          <Typography sx={{fontSize:"28px",fontWeight:"600",marginBottom:"20px"}}>المجموعات</Typography>
          <Grid container sx={{minHeight:"32vh",marginBottom:"50px",rowGap:"15px"}} spacing={1}>
            {
              groups?.length>0?
              groups.map((group,index)=>
              {
                return(
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index+'aq1'}>
                      <Group group={group}/>
                  </Grid>
                )
              })
              :
              <Typography>لا يوجد مجموعات متاحة</Typography>
            }
          </Grid>
        </Box>
  )
}

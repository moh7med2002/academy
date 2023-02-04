import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {Button, Typography,styled} from '@mui/material'
import "../../../assest/css/user/groups/singleGroupPage.css";
import { useSnackbar } from 'notistack';

const Span = styled("span")({})

export default function SingleGropup() {
  const { enqueueSnackbar,closeSnackbar } = useSnackbar();
  const { id } = useParams();
  const [group, setGroup] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [load,setLoad] = useState(false)
  const [isRegister,setIsRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>
  {
    async function getGroup()
    {
      setLoad(true)
      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/group/one/${id}`)
        const data = await response.json()
        setGroup(data.groupe)
        setLoad(false)
        setIsRegister(data.groupe.Students.findIndex(student=>student.id===currentUser?.student.id)!==-1)
      }
      catch(err)
      {
        console.log(err)
      }
    } 
    getGroup()
  },[])

  async function registerGroup()
  {
    closeSnackbar()
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/group/register/${id}`,{
        method:"POST",
        headers:{
          "Authorization":currentUser.token
        }
      })
      const data = await response.json()
      if(response.status!==200&&response.status!==201)
      {
        enqueueSnackbar(data.message,{variant:"error",autoHideDuration:2000})
        throw new Error('failed occured')
      }
      enqueueSnackbar('تم الاشتراك بالمجموعة',{variant:"success",autoHideDuration:2000})
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
      <div className="container singleGroup">
        {!load?
          <div>
              <h4 className="group-title">{group.title}</h4>
              <div className="group-wrapper">
                <div className="group-content">
                  <div>
                    <img
                      src={`${process.env.REACT_APP_API}/images/${group.image}`}
                      alt="load.."
                      className="group-image"
                    />
                  </div>
                  <div className="content">
                    <h3 className="content-title">السعر : <Span sx={{fontWeight:"400"}}>{group.price}دج</Span></h3>
                  </div>
                  <div className="content">
                    <h3 className="content-title">وصف</h3>
                    <p className="content-description">{group.description}</p>
                  </div>
                  <div className="content">
                    <h3 className="content-title">الهدف من المجموعه </h3>
                    <p className="content-description">{group.goals}</p>
                  </div>
                  {!isRegister&&
                    <div className="group-event">
                    <Button variant="contained" sx={{width:"150px"}} onClick={registerGroup}>
                      إنضم الآن
                    </Button>
                  </div>}
                  {isRegister&&
                    <Button variant="contained" sx={{wdith:"150px",marginTop:"30px"}} onClick={()=>navigate(`/groups/${group.id}/details`)}>
                      مشاهدة 
                    </Button>
                  }
                </div>
              </div>
            </div>:
            <Typography sx={{fontSize:"24px",fontWeight:"600",minHeight:"30vh"}}>جاري التحميل</Typography>}
      </div>
  );
}
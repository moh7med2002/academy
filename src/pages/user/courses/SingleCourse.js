import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../../assest/css/user/courses/singlecourse.css";
import AccordinCourse from "../../../components/user/courses/AccordainCourse";
import { useSelector } from "react-redux";
import { Box,Typography,styled} from "@mui/material";

const MainBox = styled(Box)({
  position:"relative",
  width:"100%",
  height:"500px",
  backgroundSize:"cover",
  backgroundRepeat:"no-repeat",
  backgroundPosition:"center",
  marginTop:"80px"
})
export default function SingleCourse() {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [course, setCourse] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    currentUser &&
      fetch(`${process.env.REACT_APP_API}/api/student/allowedCourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: currentUser.token,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.json());
          }
        })
        .then((info) => {
          setCourse(info.courses.filter((e) => e.id == params.courseId));
        })
        .catch((err) => {
          console.log(err);
        });
    currentUser &&
      fetch(
        `${process.env.REACT_APP_API}/api/course/fulldata/${params.courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: currentUser.token,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(res.json());
          }
        })
        .then((info) => {
          setUnits(info.course.Units);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const [isAllowed,setIsAllowed] = useState(false)

  useEffect(()=>
  {
    if(course.length>0)
    {
      if(course[0].Students.find(student => student.id === currentUser.student.id))
        setIsAllowed(true) 
    }
  },[course])

  console.log(course[0])

  return (
    <Box sx={{padding:"0px 0px 60px", minHeight:"80vh"}}>
        <MainBox sx={{ backgroundImage:`url(${process.env.REACT_APP_API}/images/${course[0]?.image})`}} className="overlay">
            <Box sx={{position:"absolute",zIndex:6,top:"30%",color:"white",left:"10%"}}>
                <Typography sx={{fontSize:"40px",marginBottom:"40px",fontWeight:"500"}}>{course[0]?.title}</Typography>
                <Box sx={{backgroundColor:"#18A0FB",borderRadius:"20px",width:"fit-content",padding:"4px 15px",marginBottom:"14px"}}>
                  {course[0]?.Subject?.title}
                </Box>
                <Typography>من طرف : الأستاذ {course[0]?.Teacher.name}</Typography>
            </Box>
        </MainBox>
    <div className="container singleCourse">
      <>
        {course?.map((e, i) => {
            return (
                <div key={i + "qw"}>
                    <div className="goals">
                      <h3 className="goals-title">اهداف الدورة </h3>
                      <div className="goals-parts">
                        <div className="goal">
                          <p className="singleCourse-desc">{e.goals}</p>
                        </div>
                      </div>
                    </div>
                    <div className="study">
                      <h3 className="study-title">منهاج الدراسة </h3>
                      <div>
                        {units?.map((unit, index) => {
                          return (
                            <AccordinCourse
                              unit={unit}
                              key={index + "k1m"}
                              isAllowed={isAllowed}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
            );
          })
        }
      </>
    </div>
    </Box>
  );
}

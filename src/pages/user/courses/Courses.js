import { useEffect, useState } from "react";
import Course from "../../../components/user/courses/Course";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import {Box, Container, Grid,Typography} from '@mui/material'

export default function Courses() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [ courses, setCourses ] = useState([]);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    currentUser && fetch(`${process.env.REACT_APP_API}/api/student/allowedCourses`, {
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
        console.log(info);
        setCourses(info.courses);
      })
      .catch((err) => {
        console.log(err);
      }); 
    setIsLoading(false);
  }, []);

  return (
    <Box className="container" sx={{marginTop:"100px",minHeight:"50vh"}}>
      <Typography sx={{fontSize:"28px",fontWeight:"600",marginBottom:"20px"}}>الدورات</Typography>
      <Grid container sx={{marginBottom:"20px"}} spacing={3}>
            {isLoading ? (
              <ClipLoader
                color={"#99DAE9"}
                loading={isLoading}
                cssOverride={{
                  display: "block",
                  marginTop: "100px",
                  marginInline: "auto",
                  borderWidth: "10px",
                }}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              courses?.map((course, index) => {
                return (
                  <Grid key={course.id+'werw'} item xs={12} sm={6} md={4} lg={3}>
                    <Course course={course} />
                  </Grid>
                );
              })
            )}
          </Grid>
    </Box>
  );
}

import Forum from "../../../components/user/forums/Forum";
import "../../../assest/css/user/forums/forumsPage.css";
import { Typography, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Forums() {
  const [forums, setForums] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    async function getForums() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/forum/student/allowed`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization":currentUser.token
            },
          }
        );
        const data = await response.json();
        setForums(data.forums);
      } catch (err) {
        console.log(err);
      }
    }
    getForums();
  }, []);
  return (
    <Box
      className="container"
      sx={{ marginBottom: "80px", marginTop: "120px" }}
    >
      <Box>
        <Typography
          sx={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px" }}
        >
          المنتديات والنوادي
        </Typography>
        <Grid container spacing={2}>
          {forums?.map((forum) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Forum forum={forum} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

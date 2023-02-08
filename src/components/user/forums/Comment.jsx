import "../../../assest/css/user/forums/forumsPage.css";
import {
  Typography,
  CardContent,
  Card,
  CardHeader,
  Avatar,
  CardActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";

export default function Comment({ comment }) {
  const [avatar, setAvatar] = useState("a");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getAvatar() {
      if (comment.StudentId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/api/student/${comment.StudentId}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setAvatar(data?.student?.name[0]);
          setName(data?.student?.name);
          setEmail(data?.student?.email);
        } catch (err) {
          console.log(err);
        }
      } else if (comment.TeacherId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/api/teacher/${comment.TeacherId}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          console.log(data, "posts");
          setAvatar(data?.teacher?.name[0]);
          setName(data?.teacher?.name);
          setEmail(data?.teacher?.email);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getAvatar();
  }, []);
  return (
    <>
      <Card
        key={comment.id}
        sx={{
          maxWidth: 345,
          margin: "12px auto",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label={name}>
              {avatar}
            </Avatar>
          }
          title={name}
          subheader={email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comment?.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </>
  );
}

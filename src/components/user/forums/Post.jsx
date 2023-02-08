import "../../../assest/css/user/forums/forumsPage.css";
import {
  Typography,
  CardContent,
  Collapse,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardActions,
  Dialog,
} from "@mui/material";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import { useParams } from "react-router";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function Post({ post }) {
  const params = useParams();

  const [avatar, setAvatar] = useState("a");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function getAvatar() {
      if (post.StudentId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/api/student/${post.StudentId}`,
            {
              method: "GET",
              headers: {
                Authorization: currentUser.token,
              },
            }
          );
          const data = await response.json();
          setAvatar(data?.student?.name[0]);
          setName(data?.student?.name);
          setEmail(data?.student?.email);
          console.log("data?.student?.name[0]: ", data?.student?.name[0]);
        } catch (err) {
          console.log(err);
        }
      } else if (post.TeacherId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/api/teacher/${post.TeacherId}`,
            {
              method: "GET",
              headers: {
                Authorization: currentUser.token,
              },
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
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  async function getComments() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/forum/comments/${post.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setComments(data.comments);
    } catch (err) {
      console.log(err);
    }
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [openForm, setOpenForm] = useState(false);

  function handleCloseProfileDialog() {
    setOpenForm(false);
  }
  return (
    <>
      <Card
        key={post.id}
        sx={{
          maxWidth: 345,
          margin: "16px auto",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label={name}>
              {avatar}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                setOpenForm(true);
              }}
            >
              <AddCommentOutlinedIcon />
            </IconButton>
          }
          title={name}
          subheader={email}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={() => {
              getComments(post.id);
              handleExpandClick();
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>التعليقات:</Typography>
            {comments.length === 0 ? (
              <Typography paragraph>لا يوجد تعليقات</Typography>
            ) : (
              comments.map((comment) => {
                return <Comment comment={comment} />;
              })
            )}
          </CardContent>
        </Collapse>
      </Card>
      <Dialog open={openForm} onClose={handleCloseProfileDialog}>
        <AddComment
          post={post}
          openProfile={openForm}
          handleCloseProfileDialog={handleCloseProfileDialog}
        />
      </Dialog>
    </>
  );
}

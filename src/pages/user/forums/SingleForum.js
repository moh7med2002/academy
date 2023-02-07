import { styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assest/css/user/forums/singleForum.css";
import * as React from "react";
import { Button } from '@mui/material'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from '@mui/material/Dialog';
import AddPost from '../../../components/user/forums/AddPost'

export default function SingleForum() {
  const params = useParams();

  const [forum, setForum] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getForums() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/forum/${params.forumId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data.forum, 'dattttttttttt');
        setForum(data.forum);
      } catch (err) {
        console.log(err);
      }
    }
    getForums();

    async function getPosts() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/forum/posts/${params.forumId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data, 'posts');
        setPosts(data.posts);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, []);

  async function getComments() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/forum/comments/${params.forumId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data, 'comments');
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  }

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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const [openProfile, setOpenProfile] = useState(false)
  function handleCloseProfileDialog() {
    setOpenProfile(false)
  }

  return (
    <div>
      <h1 style={{ marginTop: 100, marginBottom: 30, marginRight: 50 }}>{`نادي${forum.title}`}</h1>
      <Button style={{ marginRight: 50 }} variant="contained" onClick={() => setOpenProfile(true)}>إضافة منشور</Button>

      <Dialog open={openProfile} onClose={handleCloseProfileDialog}>
                      <AddPost forum={forum} openProfile={openProfile} handleCloseProfileDialog={handleCloseProfileDialog}/>
                  </Dialog>
      {posts.length === 0 ? <div>لا يوجد منشورات</div> : posts.map((post) => {
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
              onClick={() => {
                getComments(post.id)
                handleExpandClick()
              }
              }
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {comments.map((comment) => {
                <Typography paragraph>
                  {comment.text}
                </Typography>
              })}
            </CardContent>
          </Collapse>
        </Card>
      })}
    </div>
  );
}

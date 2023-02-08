import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../assest/css/user/forums/singleForum.css";
import * as React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import AddPost from "../../../components/user/forums/AddPost";
import Post from "../../../components/user/forums/Post";

export default function SingleForum() {
  const params = useParams();

  const [forum, setForum] = useState([]);
  const [posts, setPosts] = useState([]);

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
        console.log(data.forum, "dattttttttttt");
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
        console.log(data, "posts");
        setPosts(data.posts);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, []);

  const [openForm, setOpenForm] = useState(false);

  function handleCloseProfileDialog() {
    setOpenForm(false);
  }

  return (
    <div>
      <h1
        style={{ marginTop: 100, marginBottom: 30, marginRight: 50 }}
      >{`نادي ${forum.title}`}</h1>
      <Button
        style={{ marginRight: 50 }}
        variant="contained"
        onClick={() => setOpenForm(true)}
      >
        إضافة منشور
      </Button>

      <Dialog open={openForm} onClose={handleCloseProfileDialog}>
        <AddPost
          forum={forum}
          openProfile={openForm}
          handleCloseProfileDialog={handleCloseProfileDialog}
        />
      </Dialog>
      {posts.length === 0 ? (
        <Typography variant="h4" sx={{ margin: "10px 45px" }} gutterBottom>
          لا يوجد منشورات
        </Typography>
      ) : (
        posts.map((post) => {
          return <Post post={post} />;
        })
      )}
    </div>
  );
}

import React from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function AddPost(props) {
  const { register, handleSubmit } = useForm();

  const { currentUser } = useSelector((state) => state.user);
  const { currentTeacher } = useSelector((state) => state.teacher);

  const api =
  currentUser
      ? `${process.env.REACT_APP_API}/api/student/post/${props.forum.id}`
      : `${process.env.REACT_APP_API}/api/teacher/post/${props.forum.id}`;
      const auth =
  currentUser
      ? currentUser
      : currentTeacher;  return (
    <form
      onSubmit={handleSubmit((data) => {
        const formData = new FormData();
        formData.append("content", data.content);

        fetch(
          api,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: auth?.token,
            },
          }
        )
          .then((res) => res.json())
          .then((info) => {
            window.location.reload();
            props.handleCloseProfileDialog();
          })
          .catch((err) => {
            console.log(err);
          });
      })}
    >
      <Box sx={{ width: "400px" }}>
        <DialogTitle>إضافة منشور</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={"نص المنشور"}
            type="text"
            fullWidth
            variant="standard"
            {...register("content")}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseProfileDialog}>إلغاء</Button>
          <Button type="submit">نشر</Button>
        </DialogActions>
      </Box>
    </form>
  );
}

export default AddPost;

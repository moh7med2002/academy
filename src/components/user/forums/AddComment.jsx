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

function AddComment(props) {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const formData = new FormData();
        formData.append("text", data.text);
        console.log("props.post.id: ", props.post.id);

        fetch(
          `${process.env.REACT_APP_API}/api/student/comment/${props.post.id}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: currentUser.token,
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
        <DialogTitle>إضافة تعليق</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={"نص التعليق"}
            type="text"
            fullWidth
            variant="standard"
            {...register("text")}
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

export default AddComment;

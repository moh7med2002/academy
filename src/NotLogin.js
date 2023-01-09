import { Box, Typography } from "@mui/material";

export default function NotLogin(){
  return (
    <Box className="container">
      <Typography sx={{fontSize:{md:"26px",xs:"20px"},fontWeight:"500",margin:"120px 0px 80px",minHeight:"33vh"}}>
        يرجى تسجيل الدخول للمتابعة
      </Typography>
    </Box>
  )
}
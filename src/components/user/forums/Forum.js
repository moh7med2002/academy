import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../assest/css/user/forums/forum.css";

export default function Forums({ forum }) {
  const navigate = useNavigate();

  async function joinForum() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/student/joinForum/${forum.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      navigate(`/forums/${forum.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      className="forum-wrapper"
      initial={{ opacity: 0, y: "-10px" }}
      animate={{ opacity: 1, y: "0px", transition: { duration: 0.4 } }}
    >
      <Link to="/forums/1">
        {forum?.image ? (
          <img src={forum?.image} alt="load.." className="image" />
        ) : (
          <img
            src="https://cdn.spark.app/media/whitefuse/image/blog_forums_cropped.png"
            alt="load.."
            className="image"
            to={`/forum/${forum.id}`}
          />
        )}
      </Link>
      <div className="wrapper-content">
        <Link to={`/forums/${forum.id}`}>
          <h2 className="heading-2">{forum?.title} </h2>
          <span className="name">
            الأستاذ /<span> {forum?.Teacher?.name}</span>
          </span>
        </Link>
        <div className="controls">
          <Button
            variant="contained"
            sx={{ width: "140px", borderRadius: "14px" }}
            onClick={() => joinForum()}
          >
            انضم الان
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

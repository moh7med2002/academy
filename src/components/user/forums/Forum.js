import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../assest/css/user/forums/forum.css";

export default function Forum({ forum }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(forum.Students.find(st => st.id == currentUser.student.id));

  async function joinForum() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/student/joinForum/${forum.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":currentUser.token
          },
        }
      );
      const data = await response.json();
      navigate(`/forums/${forum.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      key={forum.id}
      className="forum-wrapper"
      initial={{ opacity: 0, y: "-10px" }}
      animate={{ opacity: 1, y: "0px", transition: { duration: 0.4 } }}
    >
        {forum?.image ? (
          <img src={`${process.env.REACT_APP_API}/images/${forum.image}`} alt="load.." className="image" />
        ) : (
          <img
            src={`${process.env.REACT_APP_API}/images/${forum.image}`}
            alt="load.."
            className="image"
            to={`/forum/${forum.id}`}
          />
        )}
      <div className="wrapper-content">
          <h2 className="heading-2">{forum?.title} </h2>
          <span className="name">
            الأستاذ /<span> {forum?.Teacher?.name}</span>
          </span>
        <div className="controls">
          {
            forum.Students.find(st => st.id == currentUser.student.id)?
            <Link to={`/forums/${forum.id}`}>
            <Button
            variant="contained"
            sx={{ width: "140px", borderRadius: "14px" }}
          >
             مشاهدة
          </Button>
            </Link>
          :
          <Button
            variant="contained"
            sx={{ width: "140px", borderRadius: "14px" }}
            onClick={() => joinForum()}
          >
            انضم الان
          </Button>
          }
        </div>
      </div>
    </motion.div>
  );
}

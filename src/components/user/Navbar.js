import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "../../assest/css/user/Navbar.css";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSilce";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import { Box } from "@mui/system";
import NotificationBadge from "./NotificationBadge";

export default function Navbar() {
  const [showNav, setshowNav] = useState(false);
  const ref = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setshowNav((p) => false);
      document.body.style.overflowY = "visible";
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <nav className="navBar">
        <div className="nav-container container">
          <nav className="nav-wrapper">
            <div className="nav-logo ">
              <img src={logo} alt="logo" className="logo-nav" />
              <h3 className="heading-three">أكادميتنا</h3>
            </div>
            <button
              className="toggle-show"
              onClick={() => setshowNav((p) => !p)}
            >
              {!showNav ? <AiOutlineMenu /> : <AiOutlineClose />}
            </button>
            <div
              className={`links-wrapper ${showNav ? "show" : "notShow"}`}
              ref={ref}
            >
              <div className="pages-links-wrapper">
                <NavLink
                  end
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "page-link active" : "page-link"
                  }
                >
                  الرئيسية
                </NavLink>
                <NavLink
                  to={"/courses"}
                  className={({ isActive }) =>
                    isActive ? "page-link active" : "page-link"
                  }
                >
                  الدورات
                </NavLink>
                <NavLink
                  to={"/memberships"}
                  className={({ isActive }) =>
                    isActive ? "page-link active" : "page-link"
                  }
                >
                  الاشتراكات
                </NavLink>
                {currentUser&&<NavLink
                  to={"/student-dash"}
                  className={({ isActive }) =>
                    isActive ? "page-link active" : "page-link"
                  }
                >
                  لوحة التحكم
                </NavLink>}
              </div>
              {currentUser ? (
                <Box sx={{display:"flex",columnGap:"30px",rowGap:"20px",alignItems:"center",flexDirection:{xl:"row",xs:"column"}}}>
                  <NotificationBadge/>
                  <Button variant="contained" onClick={() => {
                      dispatch(logout());
                      navigate('/')
                    }}>
                    تسجيل الخروج
                  </Button>
                </Box>
              ) : (
                <div className="register-links-wrapper">
                  <Link to={"/register/teacher"} className="register-link">
                    انشاء حساب
                  </Link>
                  <Link to={"/login/teacher"} className="register-link ">
                    تسجيل دخول
                  </Link>
                  <Link to={"/login/parent"} className="register-link">
                    دخول ولي امر الطالب
                  </Link>
                  <span className="language-translate">En</span>
                </div>
              )}
            </div>
          </nav>
        </div>
      </nav>
      <div className="page-overlay"></div>
    </>
  );
}

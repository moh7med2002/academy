import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { successLogin } from "../../redux/userSilce";

export default function StudentLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const error = useRef(null);
  const dispatch = useDispatch();


  const onSubmit = (data) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/api/student/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if(res.ok){
          return res.json()
         }else{
          return Promise.reject(res.json())
         }
      })
      .then((info) => {
        console.log(info);
        dispatch(successLogin({user: info}))
        // setUser(JSON.stringify(info));
        // localStorage.setItem('academy-user', JSON.stringify(info));
        navigate('/');
        setLoading(false);
      })
      .catch((err) => {
        err.then(e => {error.current.textContent = e.message});
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <div className="student-login container">
      <div className="register-top">
        <h2 className="heading">انضم الينا </h2>
        <h3 className="hasaccount">
          ليس لديك حساب ؟{" "}
          <Link to={"/register/student"} className="link">
            إنشاء حساب
          </Link>{" "}
        </h3>
        <div className="register-as">
          <Link to={"/login/student"} className="active">
            تسجيل كطالب{" "}
          </Link>
          <Link to={"/login/teacher"} className="notActive">
            تسجيل كمعلم{" "}
          </Link>
        </div>
        <div className="register-process-wrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <div className="form-input-wrapper">
              <label className="input-title">البريد الاكتروني</label>
              <input
                type={"email"}
                {...register("email", { required: "البريد الالكتروني مطلوب" })}
                className="input"
              />
              <span style={{ color: "red" }}>{errors.email?.message}</span>
            </div>
            <div className="form-input-wrapper">
              <label className="input-title"> كلمة المرور </label>
              <input
                type={"password"}
                {...register("password", { required: "كلمة المرور مطلوبة" })}
                className="input"
              />
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </div>
            {/* <Link className="forgot-password-link" to={"/forgot-password"}>
              هل نسيت كلمة المرور
            </Link> */}
            <span ref={error} style={{ color: "red" }}></span>
            <button style={{opacity: loading ? 0.5 : 1}} className='register-btn'>{loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

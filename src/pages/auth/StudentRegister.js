import { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const error = useRef(null);



  const onSubmit = (data) => {
    setLoading(true);
    if(watch('LevelId')=="3" && !watch('SectionId')){
      alert('الرجاء إختيار شعبة دراسية');
      setLoading(false);
      return;
    }
    fetch(`${process.env.REACT_APP_API}/api/student/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      if(res.ok){
        return res.json()
        }else{
          return Promise.reject(res.json())
        }
    })
    .then(info => {
      error.current.textContent = '';
      navigate('/login/student')
      setLoading(false);
    })
    .catch(err => {
      err.then(e => {error.current.textContent = e.message});
      setLoading(false)
    });
  };

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });

    fetch(`${process.env.REACT_APP_API}/api/level/all`)
      .then((res) => res.json())
      .then((data) => setLevels(data.levels))
      .catch(err => console.log(err));

    fetch(`${process.env.REACT_APP_API}/api/class/all`)
      .then((res) => res.json())
      .then((data) => setClasses(data.classes));

    fetch(`${process.env.REACT_APP_API}/api/section/all`)
      .then((res) => res.json())
      .then((data) => setSections(data.sections));
    
  }, []);

  const [LevelId , setLevelId] = useState('');
  const [ClassId , setClassId] = useState('');




  return (
    <div className="student-register container">
      <div className="register-top">
        <h2 className="heading">انضم الينا </h2>
        <h3 className="hasaccount">
          انضم الينا هل لديك حساب على اكادميتنا ؟{" "}
          <Link to={"/login/student"} className="link">
            تسجيل الدخول
          </Link>{" "}
        </h3>
        <div className="register-as">
          <Link to={"/register/student"} className="active">
            تسجيل كطالب{" "}
          </Link>
          <Link to={"/register/teacher"} className="notActive">
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
              <label className="input-title">الاسم</label>
              <input
                {...register("name", { required: "الاسم مطلوب" })}
                className="input"
              />
              <span style={{ color: "red" }}>{errors.name?.message}</span>
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
            <div className="form-input-wrapper">
              <label className="input-title"> تاكيد كلمة المرور </label>
              <input
                type={"password"}
                {...register("confirmPass", {
                  required: "تاكيد كلمة المرور مطلوب",
                  validate: (v) =>
                    v == watch("password") ? true : "كلمة المرور غير مطابقة",
                })}
                className="input"
              />
              <span style={{ color: "red" }}>
                {errors.confirmPass?.message}
              </span>
            </div>
            <div className="form-input-wrapper">
              <label className="input-title">الجنس</label>
              <select {...register("gender")} className="input select">
                <optgroup label="اختيار الجنس" className="descripe-select">
                  <option value={'male'} className="option">ذكر</option>
                  <option value={'female'} className="option">انثى</option>
                </optgroup>
              </select>
            </div>
            <div className="form-input-wrapper">
              <label className="input-title">المستوى التعليمي </label>
              <select
                {...register("LevelId" , { required: " المستوى الدراسي مطلوب" })}
                className="input select"
                onChange={e=> { resetField('ClassId') ; setLevelId(e.target.value)}}
              >
                {/* <optgroup label=" اختر المستوى " className="descripe-select"> */}
                  <option value={""} disabled selected>اختر المستوى الدراسي</option>
                  {
                    levels?.map((e , i) => (
                      <option key={e.id} value={e.id} className="option">
                          {e.title}
                      </option>
                    ))
                  }
                {/* </optgroup> */}
              </select>
              <span style={{ color: "red" }}>
                {errors.LevelId?.message}
              </span>
            </div>
            <div className="form-input-wrapper">
              <label className="input-title"> السنة الدراسية </label>
              <select {...register("ClassId" , { required: " السنة الدراسية مطلوب" } )} className="input select"
              onChange={(e)=>{resetField('SectionId') ; setClassId(e.target.value)}}>
                {/* <optgroup
                  label="  اختر السنة الدراسية   "
                  className="descripe-select"
                > */}
                  {classes.filter((e) => e.LevelId == (LevelId || '1'))?.map((e, i) => (
                    <>
                    <option key={e.id+'rht'} value={e.id} className="option" >
                      {e.title}
                    </option>  
                    </>
                  ))}
                {/* </optgroup> */}
              </select>
              <span style={{ color: "red" }}>
                {errors.ClassId?.message}
              </span>
            </div>
            <div className="form-input-wrapper">
              <label className="input-title">الشعبة</label>
              <select {...register("SectionId")} className="input select">
                {/* <optgroup
                  label="اختر الشعبة"
                  className="descripe-select"
                > */}
                  <option value={""} disabled selected>اختر الشعبة الدراسية</option>
                  { LevelId == "3" && sections.filter((e) => e.ClassId == (ClassId || '10'))?.map((e, i) => (
                    <option key={e.id+'rf'} value={e.id} className="option"  >
                      {e.title}
                    </option>
                  ))}
                {/* </optgroup> */}
              </select>
              <span style={{ color: "red" }}>
                {errors.SectionId?.message}
              </span>
            </div>
            <div className="policy-wrapper">
              <input
                type={"checkbox"}
                {...register("policy", {
                  required: "يجب الموافقة على شروط الخدمة وسياسة الخصوصية",
                })}
                className="input-radio"
                id="student-policy"
              />
              <label className="policy-label" htmlFor="student-policy">
                بالضغط على التسجيل أنا أوافق على شروط الخدمة و سياسة الخصوصية{" "}
              </label>
            </div>
            <span style={{ color: "red" }}>{errors.policy?.message}</span>
            <span ref={error} style={{ color: "red" }}></span>
            <button style={{opacity: loading ? 0.5 : 1}} className='register-btn'>{loading ? 'جاري التسجيل...' : 'سجل الان'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

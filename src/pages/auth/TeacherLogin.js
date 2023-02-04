import {useEffect} from 'react'
import '../../assest/css/auth/techerLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useRef } from 'react';
import { useState } from 'react';
import {successLogin} from '../../redux/teacherSlice'
import {logout} from '../../redux/userSilce'
import { useDispatch } from 'react-redux';

export default function TeacherLogin() {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const error = useRef(null);

  const onSubmit = async(data)=>{
    setLoading(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/teacher/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      })
      if(response.status!==200&&response.status!==201)
      {
        throw new Error('failed occured')
      }
      const resData = await response.json()
      setLoading(false)
      dispatch(successLogin({teacher:resData}))
      dispatch(logout())
      navigate('/teacher-dash')
    }
    catch(err)
    {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(()=>{
    window.scrollTo({
      behavior:"smooth",
      top:0
    })
  },[])

  return (
    <div className='teacher-login container'>
        <div className='register-top'>
            <h2 className='heading'>انضم الينا </h2>
            <h3 className='hasaccount'>ليس لديك حساب ؟ <Link to={"/register/teacher"} className="link">إنشاء حساب</Link> </h3>
            <div className='register-as'>
                <Link to={"/login/student"} className="notActive">تسجيل كطالب </Link>
                <Link to={"/login/teacher"} className="active">تسجيل كمعلم </Link>
            </div>
            <div className='register-process-wrapper'>
              <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
                <div className='form-input-wrapper'>
                  <label className='input-title'>البريد الاكتروني</label>
                  <input type={"email"} {...register('email', {required: 'البريد الالكتروني مطلوب'})} className="input"/>
                  <span style={{color: 'red'}}>{errors.email?.message}</span>
                </div>
                <div className='form-input-wrapper'>
                  <label className='input-title'> كلمة المرور   </label>
                  <input type={'password'} {...register('password', {required: 'كلمة المرور مطلوبة'})} className="input"/>
                  <span style={{color: 'red'}}>{errors.password?.message}</span>
                </div>
                {/* <Link className='forgot-password-link' to={"/forgot-password"}>
                هل نسيت كلمة المرور
                </Link> */}
                <span ref={error} style={{ color: "red" }}></span>
                <button style={{opacity: loading ? 0.5 : 1}} className='register-btn'>{loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}</button>
              </form>
          </div>
        </div>
    </div>
  )
}

import {useEffect, useRef} from 'react'
import '../../assest/css/auth/parentLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {successLogin} from '../../redux/parentSlice'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import {useSnackbar} from 'notistack'

export default function ParentLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}, watch} = useForm();
  const error = useRef(null);
  const [loading, setLoading] = useState(false);
  const {closeSnackbar,enqueueSnackbar} = useSnackbar()

    useEffect(()=>{
        window.scrollTo({
          behavior:"smooth",
          top:0
        })
      },[])

      const onSubmit = async(data)=>{
        setLoading(true);
        closeSnackbar()
        try{
          const response = await fetch(`${process.env.REACT_APP_API}/api/parent/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
          })
          const resData = await response.json()
          if(response.status!==200&&response.status!==201)
          {
            setLoading(false)
            enqueueSnackbar(resData.message,{variant:"error",autoHideDuration:7000})
            throw new Error('failed occured')
          }
          setLoading(false)
          dispatch(successLogin({parent:resData}))
          navigate('/parent-dash')
          enqueueSnackbar('تم تسجيل الدخول',{variant:"success",autoHideDuration:7000})
        }
        catch(err)
        {
          console.log(err)
        }
      }

  return (
    <div className='parent-login container'>
        <div className='register-top'>
            <h2 className='heading'> سجل الدخول ولي امر الطالب </h2>
            <h3 className='description-login'>من هنا يمكنك تسجيل  دخول ولي امر الطالب ومتابعة ابناءه  </h3>
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
                    <span style={{color: 'red'}}>{errors.policy?.message}</span>
                    <span ref={error} style={{ color: "red" }}></span>
                    <button style={{opacity: loading ? 0.5 : 1}} className='register-btn'>{loading ? 'جاري التسجيل...' : 'سجل الان'}</button>
                </form>
          </div>
        </div>
    </div>
  )
}

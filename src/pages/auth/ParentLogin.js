import {useEffect, useRef} from 'react'
import '../../assest/css/auth/parentLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function ParentLogin() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const authError = useRef();

    useEffect(()=>{
        window.scrollTo({
          behavior:"smooth",
          top:0
        })
      },[])

      const handleAuth = (e)=>{
        e.preventDefault();
        axios.post('https://pall.pal-lady.com/InfixLMS%20v5.0.0/api/login', null,{
          params: {
            email: email.current.value,
            password: password.current.value,
          },
        }).then(response => {
          if(response.status == 200){
            navigate('/')
          }else{
            console.log('auth error')
          }
        }).catch(err => {
          authError.current.textContent = 'خطأ في بيانات التسجيل'
        });
      };

  return (
    <div className='parent-login container'>
        <div className='register-top'>
            <h2 className='heading'> سجل الدخول ولي امر الطالب </h2>
            <h3 className='description-login'>من هنا يمكنك تسجيل  دخول ولي امر الطالب ومتابعة ابناءه  </h3>
           <div className='register-process-wrapper'>
              <form className='register-form'>
                <div className='form-input-wrapper'>
                  <label className='input-title'>البريد الاكتروني</label>
                  <input ref={email} type={"email"} className="input"/>
                </div>
                {/* <div className='form-input-wrapper'>
                  <label  className='input-title'>عدد الابناء المسجلين </label>
                  <select className="input select">
                    <optgroup label='اختار عدد الابناء المسجلين ' className='descripe-select'>
                      <option className='option'>طالب واحد </option>
                      <option className='option'>اكثر من طالب </option>
                    </optgroup>
                  </select>
                </div>
                <div className='form-input-wrapper'>
                  <label className='input-title'>رقم ID الطالب  </label>
                  <input type={'text'} className="input"/>
                </div> */}
                <div className='form-input-wrapper'>
                  <label className='input-title'> كلمة المرور   </label>
                  <input ref={password} type={'password'} className="input"/>
                </div>
                <Link className='forgot-password-link' to={"/forgot-password"}>
                هل نسيت كلمة المرور
                </Link>
                <button onClick={handleAuth} className='register-btn'> تسجيل الدخول  </button>
                <h2 style={{color: 'red'}} ref={authError}></h2>
              </form>
          </div>
        </div>
    </div>
  )
}

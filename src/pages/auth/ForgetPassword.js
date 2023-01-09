import {useEffect} from 'react'
import '../../assest/css/auth/forgotPasssword.css'

export default function ForgotPassword() {

  useEffect(()=>{
    window.scrollTo({
      behavior:"smooth",
      top:0
    })
  },[])

  return (
    <div className='forgot-password-wrapper container'>
        <div className='register-process-wrapper'>
        <h2 className='heading'> نسيت كلمة المرور  </h2>
           <div className=''>
              <form className='register-form'>
                <div className='form-input-wrapper'>
                  <label className='input-title'>البريد الاكتروني</label>
                  <input type={"email"} className="input"/>
                </div>
                <button className='register-btn'> ارسال  </button>
              </form>
          </div>
        </div>
    </div>
  )
}

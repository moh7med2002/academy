import {useEffect, useRef, useState} from 'react'
import '../../assest/css/auth/teacherRegister.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function ParentRegister() {
    const {register, handleSubmit, formState: {errors}, watch} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const error = useRef(null);

    const onSubmit = (data)=>{
    setLoading(true);
        fetch(`${process.env.REACT_APP_API}/api/parent/register`, {
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
        navigate('/login/parent')
        setLoading(false);
        })
        .catch(err => {
        err.then(e => {error.current.textContent = e.message});
        console.log(err)
        setLoading(false)
        });
    }
    
    useEffect(()=>{
        window.scrollTo({
        behavior:"smooth",
        top:0
        })
    },[])

    return (
    <div className='teacher-register container'>
        <div className='register-top'>
            <h2 className='heading'>انضم الينا </h2>
            <h3 className='hasaccount'>انضم الينا هل لديك حساب على اكادميتنا ؟ <Link to={"/login/teacher"} className="link">تسجيل الدخول</Link> </h3>
            <div className='register-as'>
                <Link to={"/register/student"} className="notActive">تسجيل كطالب </Link>
                <Link to={"/register/teacher"} className="notActive">تسجيل كمعلم </Link>
                <Link to={"/register/parent"} className="active">تسجيل كأب </Link>
            </div>
            <div className='register-process-wrapper'>
                <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
                    <div className='form-input-wrapper'>
                    <label className='input-title'>البريد الاكتروني</label>
                    <input type={"email"} {...register('email', {required: 'البريد الالكتروني مطلوب'})} className="input"/>
                    <span style={{color: 'red'}}>{errors.email?.message}</span>
                    </div>
                    <div className='form-input-wrapper'>
                    <label className='input-title'>الاسم</label>
                    <input {...register('name', {required: 'الاسم مطلوب'})} className="input"/>
                    <span style={{color: 'red'}}>{errors.name?.message}</span>
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
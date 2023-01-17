import {useEffect} from 'react'
import PsychologistMenuBar from '../../../components/user/psychologist/PsychologistMenuBar'
import {HiOutlineCurrencyDollar} from 'react-icons/hi'
import {GiClockwork} from 'react-icons/gi'
import '../../../assest/css/user/psychologist/requestSession.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useState } from 'react'
import {useSnackbar} from 'notistack'
export default function RequestSession() {

    useEffect(()=>{
        window.scrollTo({
            behavior:"smooth",
            top:0
        })
    },[])

    const { currentUser } = useSelector((state) => state.user);
    const {sessionId} = useParams()
    const [psycho,setPsycho] = useState(null)
    const [description,setDescription] = useState(null)
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const [load,setLoad] = useState(false)

    useEffect(()=>
    {
        async function getPsycho()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/psycho/${sessionId}`)
                const data = await response.json()
                setPsycho(data.psycho)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getPsycho()
    },[sessionId])

    async function requestSession()
    {
        closeSnackbar()
        setLoad(true)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/api/psycho/register`,{
                method:"PUT",
                headers:{
                    "Authorization":currentUser.token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({description,studentId:currentUser.student.id,psychoId:sessionId})
            })
            const data = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                enqueueSnackbar(data.message,{variant:"error",autoHideDuration:7000})
                setLoad(false)
                throw new Error('failed occured')
            }
            enqueueSnackbar('تم طلب الجلسة',{variant:"success",autoHideDuration:7000})
            setLoad(false)
        }
        catch(err)
        {
            console.log(err)
        }
    }

return (
    <div className='container request-session'>
        {
        psycho&&
        <div className="request-wrapper">
                <div className="menu-wrapper">
                    <PsychologistMenuBar/>
                </div>
                <div className="content">
                    <div className='content-wrapper'>
                        <div className='content-form'>
                            <h3 className="content-title">{psycho.title}</h3>
                            <form onSubmit={e=>e.preventDefault()} className="form">
                                <div className='form-box'>
                                    <label className='form-label'>الاسم ثلاثي</label>
                                    <input className='form-input' value={currentUser?.student.name} disabled/>
                                </div>
                                {/* <div  className='form-box'>
                                    <label className='form-label'>رقم الجوال </label>
                                    <input className='form-input'/>
                                </div> */}
                                <div  className='form-box'>
                                    <label className='form-label'>وصف بسيط للحالة  </label>
                                    <textarea className='form-area' onChange={(e)=>setDescription(e.target.value)}/>
                                </div>
                                {/* <div className='form-box'>
                                    <label className='form-label'>الاستفادة </label>
                                    <div className='box-radio'>
                                        <input type={"radio"} name="pay" value=""/>
                                        <label>عن طريق العضوية</label>
                                    </div>
                                    <div className='box-radio'>
                                        <input type={"radio"} name="pay" className="" defaultChecked/>
                                        <label>دفع </label>
                                    </div>
                                </div>
                                <div className='box-file'>
                                    <input type={"file"} id="file"/>
                                    <MdOutlineAttachFile className='icon'/>
                                    <label htmlFor='file'>ارفاق وصل الدفع </label>
                                </div> */}
                                <div className="request-btn-wrapper">
                                {
                                !load?
                                <button type='submit' className='requset-btn' onClick={()=>requestSession()}>طلب جلسة </button>
                                :
                                <button className='requset-btn' style={{opacity:".7"}}>طلب جلسة ...</button>
                                }
                                </div>
                            </form>
                        </div>
                        <div className='session'>
                            <div>
                            <img src={`${process.env.REACT_APP_API}/images/${psycho.image}`} alt=""/>
                            </div>
                            <div className='box'>
                                <span className='box-title'>{psycho.title}</span>
                                <div className='counter'>
                                    <div className='box-counter'>
                                        <HiOutlineCurrencyDollar/>
                                        <span className='counter-text'>{psycho.price}</span>
                                    </div>
                                    <div className='box-counter'>
                                        <GiClockwork/>
                                        <span className='counter-text'>{psycho.duration}</span>
                                    </div>
                                </div>
                            </div>
                            <p>
                            تعتبر جلسات الاخصائي النفسي من الامو المهمه جد التي تعمل علي تحسين الحاله النفسية لدي الطالب لتساعده وتشجعه علي الدراسه تعتبر جلسات الاخصائي النفسي من الامو المهمه جد التي تعمل علي تحسين الحاله النفسية لدي الطالب لتساعده وتشجعه علي الدراسه تعتبر جلسات الاخصائي النفسي من الامو المهمه جد التي تعمل علي تحسين الحاله النفسية لدي الطالب لتساعده وتشجعه علي الدراسه 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
)
}
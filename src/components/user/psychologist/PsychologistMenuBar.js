import React from 'react'
import { Link } from 'react-router-dom'
import '../../../assest/css/user/psychologist/psychologistSidebar.css'

export default function PsychologistMenuBar() {
return (
    <div className="psychologist-bar">
    <h3 className="lessons-title">الفئات</h3>
    <ul className="bar-wrapper">
        <Link to={'/psychologist'} className={`link ${window.location.pathname==="/psychologist"&&"active"}`} 
            >النصائح والارشادات
        </Link>
        <Link to={'/psychologist/sessions'}  className={`link ${window.location.pathname==="/psychologist/sessions"&&"active"}`} 
            >جلسات الاخصائي النفسي 
        </Link>
        <Link to={'/psychologist/request/'+1}  className={`link ${window.location.pathname.includes('/psychologist/request')&&"active"}`} 
            >طلب جلسة اخصائي نفسي 
        </Link>
    </ul>
</div>
  )
}

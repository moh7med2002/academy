import React from 'react'
import { Link } from 'react-router-dom'
import '../../../assest/css/user/courses/coursescategorybar.css'

export default function CoursesCategoryBar() {

return (
    <div className='groups-bar'>
    <h3 className="courses-content-title">الفئات</h3>
    <ul className="bar-wrapper">
        <Link to={'/courses'} className={`link  ${window.location.pathname==="/courses"&&"active"}`}
            >الجميع
        </Link>
        <Link to={'/courses/arabic'}  className={`link  ${window.location.pathname==="/courses/arabic"&&"active"}`}
            >اللغة العربية
        </Link>
        <Link to={'/courses/math'}  className={`link  ${window.location.pathname==="/courses/math"&&"active"}`}
            >الرياضيات
        </Link>
        <Link to={'/courses/history'}  className={`link  ${window.location.pathname==="/courses/history"&&"active"}`}
            >التاريخ
        </Link>
        <Link to={'/courses/economie'}  className={`link  ${window.location.pathname==="/courses/economie"&&"active"}`}
            >الإقتصاد
        </Link>
        <Link to={'/courses/etiquette'}   className={`link  ${window.location.pathname==="/courses/etiquette"&&"active"}`}
            >الاداب
        </Link>
        <Link to={'/courses/languages'}  className={`link  ${window.location.pathname==="/courses/languages"&&"active"}`}
            >اللغات الأجنبية
        </Link>
    </ul>
</div>
)
}

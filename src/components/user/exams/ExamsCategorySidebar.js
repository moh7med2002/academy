import React from 'react'
import { Link } from 'react-router-dom'
import '../../../assest/css/user/exams/examsCategorySidebar.css'

export default function ExamsCategoryBar() {
    return (
    <div className='exams-bar'>
        <h3 className="title-content">الفئات</h3>
        <ul className="bar-wrapper">
            <Link to={'/exams'} className={`link ${window.location.pathname==="/exams"&&"active"}`}
                >الجميع
            </Link>
            <Link to={'/exams/arabic'} className={`link ${window.location.pathname==="/exams/arabic"&&"active"}`}
                >اللغة العربية
            </Link>
            <Link to={'/exams/math'} className={`link ${window.location.pathname==="/exams/math"&&"active"}`}
                >الرياضيات
            </Link>
            <Link to={'/exams/history'} className={`link ${window.location.pathname==="/exams/history"&&"active"}`}
                >التاريخ
            </Link>
            <Link to={'/exams/economie'} className={`link ${window.location.pathname==="/exams/economie"&&"active"}`}
                >الإقتصاد
            </Link>
            <Link to={'/exams/etiquette'} className={`link ${window.location.pathname==="/exams/etiquette"&&"active"}`}
                >الاداب
            </Link>
            <Link to={'/exams/languages'} className={`link ${window.location.pathname==="/exams/languages"&&"active"}`}
                >اللغات الأجنبية
            </Link>
        </ul>
</div>
)
}

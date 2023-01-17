import React from 'react'
import {HiOutlineCurrencyDollar} from 'react-icons/hi'
import {GiClockwork} from 'react-icons/gi'
import { Link } from 'react-router-dom'
import '../../../assest/css/user/psychologist/sessionBox.css'

export default function SessionBox({session}) {
return (
    <div className='session-box'>
        <img src={`${process.env.REACT_APP_API}/images/${session.image}`} alt="" className='image'/>
        <div className='box-wrapper'>
            <span className='session-name'>{session.title}</span>
            <div className='moreInfo-wrapper flex gap-x-3'>
                <div className='info-item'>
                    <HiOutlineCurrencyDollar/>
                    <span className='detail'>{session.price}</span>
                </div>
                <div className='info-item flex items-center gap-x-1'>
                    <GiClockwork/>
                    <span className='detail'>{session.duration} دق</span>
                </div>
            </div>
        </div>
        <div className='controls-session'>
            <Link to={`/psychologist/request/${session.id}`} className="btn-request-session">
            طلب جلسة</Link>
        </div>
    </div>
)
}

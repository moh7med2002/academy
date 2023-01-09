import '../../assest/css/parent/parentTopBoxes.css'
import {HiUserGroup} from 'react-icons/hi'
import {SiPytest,SiGooglemeet} from 'react-icons/si'
import {FaMedal} from 'react-icons/fa'

export default function ParenttopBoxes()
{
    return(
        <div className='container'>
            <div className='content-bar'>
                <div className='box'>
                    <HiUserGroup className='box-icon'/>
                    <h3 className='box-num'>8</h3>
                    <h3 className='box-title'>مجموعات</h3>
                </div>
                <div className='box'>
                    <FaMedal className='box-icon'/>
                    <h3 className='box-num'>20</h3>
                    <h3 className='box-title'>الدورات المنجزة</h3>
                </div>
                <div className='box'>
                    <SiPytest className='box-icon'/>
                    <h3 className='box-num'>100</h3>
                    <h3 className='box-title'>اختباراتي </h3>
                </div>
                <div className='box'>
                    <SiGooglemeet className='box-icon'/>
                    <h3 className='box-num'>8</h3>
                    <h3 className='box-title'>جلساتي</h3>
                </div>
            </div>
        </div>
    )
}
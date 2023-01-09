import {useEffect} from 'react'
import '../../../assest/css/user/videoLessons/lessonsSearchNotFound.css'
import EmptyCategory from '../../../components/user/util/EmptyCategory';


export default function VideoLessonsSearchNotFound() {
    

    useEffect(()=>{
        window.scrollTo({
            behavior:"smooth",
            top:0
        })
    },[]);


return (
    <div className="lessons-search-notFound container">
    <div className="groups-wrapper">
        <div className="groups-content">
            <h3 className="title-group">الدروس المرئيية</h3>
            <h4 className='search-title'>نتائج البحث</h4>
            <div>
                <EmptyCategory type='/videoLessons'/>
            </div>
        </div>
    </div>
</div>
  )
}

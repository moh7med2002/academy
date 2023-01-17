import {useEffect, useState} from 'react'
import PsychologistMenuBar from '../../../components/user/psychologist/PsychologistMenuBar'
import SessionBox from '../../../components/user/psychologist/SessionBox'
import '../../../assest/css/user/psychologist/PsychologistSessionsPage.css'

export default function PsychologistSessions() {
    useEffect(()=>
    window.scrollTo({
        behavior:"smooth",
        top:0
    })
    ,[]);

    const [psychos,setPsychos] = useState([])

    useEffect(()=>
    {
        async function getPsychos()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}/api/psycho/all`)
                const data = await response.json()
                setPsychos(data.psychos)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getPsychos()
    },[])

return (
    <div className='psyo-category container'>
        <div className="groups-wrapper">
                <div className="category-wrap">
                    <PsychologistMenuBar/>
                </div>
                <div className="groups-content">
                    <h3 className="title">الاخصائي النفسي </h3>
                    <div className="boxes-wrapper">
                        {
                            psychos.map(data=>{
                            return <SessionBox key={data.id+"ll"} session={data}/>
                            })
                        }
                    </div>
                </div>
            </div>
    </div>
)
}

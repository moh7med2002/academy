import {useEffect}  from 'react'
import '../../assest/css/parent/ChartPage.css'
import {
  Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import image1 from '../../images/goldStudent/Group3605.png'
import image2 from '../../images/goldStudent/Group3606.png'
import image3 from '../../images/goldStudent/Group3647.png'
import image4 from '../../images/goldStudent/gonc.png'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartPage() {
  
    useEffect(()=>{
        window.scrollTo({
            behavior:"smooth",
            top:0
        })
    },[])

  const data = {
    labels:["اللغة العربية ","الاقتصاد ","الرياضيات ","التاريخ ","اللغة العربية ","اللغة العربية ","اللغة العربية ","اللغة العربية ","اللغة العربية ","اللغة العربية "],
    datasets:[
    {
        data:[4,5,6,3,7,1,2,5,8,9],
        backgroundColor:["#F40A0A","#F40A0A","#64B161","#F40A0A","#64B161","#F40A0A","#F40A0A","#F40A0A","#64B161","#64B161"],
        barPercentage:.7,
    },
    ]
}
const options = {
    responsive:true,
    plugins:{
    legend:{
        display:false,
    }
    },
    scales:{
        y:{
            min:0,
            max:10
        }
    }
}

const dataPart = {
    labels:["شهر 7  ","شهر 7 ","شهر 7 ","شهر 7 "," شهر 7 ","شهر 7  ","شهر 7  ","شهر 7  ","شهر 7  "],
    datasets:[
    {
        data:[6,2,6,6,8,6,1,6,6],
        backgroundColor:["#64B161","#F40A0A","#64B161","#64B161","#64B161","#64B161","#F40A0A","#64B161","#64B161"],
        barPercentage:.5
    },
    ]
}
const optionsPart = {
    responsive:true,
    plugins:{
    legend:{
        display:false
    }
    },
    scales:{
        y:{
            min:0,
            max:10
        }
    }
}
  return (
    <div className='chart-single container'>
        <div className='chart-single-header'>
            <div className='chart-single-average'>
            <h3 className='chart-single-average-degree'>متوسط المعدل: <span>8/10</span></h3>
            <h3 className='chart-single-rate'>ممتاز</h3>
            </div>
            <div className='chart-single-images'>
            <img src={image1} alt="load"/>
            <img src={image2} alt="load"/>
        </div>
        </div>
        <div className='chart-single-print'>
            <button><img src={image3} alt="load"/></button>
        </div>
        <div className='chart-single-text'>
            <div className='chart-single-text-wrapper'>
            <h3 className='chart-single-text-title'>مادة اللغة العربية  </h3>
            <img src={image4} className="chart-single-title-image" alt='load'/>
            </div>
            <h4 className='chart-single-text-summary'>هنا الطلع علي علامات ومستوي الطالب باللغة العربية </h4>
        </div>
        <div className='chart-single-mainchart'>
            <Bar datasets data={data} options={options} height="218px"/>
        </div>
        <h3 className='chart-single-title'>مادة اللغة العربية </h3>
    </div>
  )
}

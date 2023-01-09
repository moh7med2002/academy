import React from 'react'
import '../../assest/css/parent/landParentPage.css'
import {
Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import image1 from '../../images/goldStudent/Group3605.png'
import image2 from '../../images/goldStudent/Group3606.png'
import image3 from '../../images/goldStudent/Group3647.png'
import image4 from '../../images/goldStudent/gonc.png'
import {Link} from 'react-router-dom'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function LandParentPage() {
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
      <div className='land-parent container'>
            <div className='land-parent-header'>
                <div className='land-parent-average'>
                  <h3 className='land-parent-average-degree'>متوسط المعدل: <span>8/10</span></h3>
                  <h3 className='land-parent-rate'>ممتاز</h3>
                </div>
                <div className='land-parent-images'>
                  <img src={image1} alt="load"/>
                  <img src={image2} alt="load"/>
              </div>
            </div>
            <div className='land-parent-print'>
                <button><img src={image3} alt="load"/></button>
            </div>
            <div className='land-parent-text'>
                <div className='land-parent-text-wrapper'>
                  <h3 className='land-parent-text-title'>اهلا بك في اكاديمتنا  </h3>
                  <img src={image4} className="land-parent-title-image" alt='load'/>
                </div>
                <h4 className='land-parent-text-summary'>يسعدنا تسهيل عملية متابعة دراسة ابنائك من خلال اكاديميتنا </h4>
            </div>
            <div className='land-parent-mainchart'>
                <Bar datasets data={data} options={options} height="218px"/>
            </div>
            <div className='land-parent-charts'>
              {/* <Link to={'/parent/chart'} className="land-parent-chart-link"><GoldChart data={dataPart} options={optionsPart}/></Link>
              <Link to={'/parent/chart'} className="land-parent-chart-link"><GoldChart data={dataPart} options={optionsPart}/></Link>
              <Link to={'/parent/chart'} className="land-parent-chart-link"><GoldChart data={dataPart} options={optionsPart}/></Link>
              <Link to={'/parent/chart'} className="land-parent-chart-link"><GoldChart data={dataPart} options={optionsPart}/></Link>
              <Link to={'/parent/chart'} className="land-parent-chart-link"><GoldChart data={dataPart} options={optionsPart}/></Link>
              <Link to={'/parent/chart'} className="land-parent-chart-link"><GoldChart data={dataPart} options={optionsPart}/></Link> */}
            </div>
      </div>
  )
}

import Courses from "../../../components/user/home/CoursesSystem";
import HowItsWork from "../../../components/user/home/HowItsWork";
import LandHomePage from "../../../components/user/home/LandingHome";
import Memberships from "../../../components/user/home/Memberships";
import OurServices from "../../../components/user/home/OurServices";
import Participation from "../../../components/user/home/Participation";
import Students from '../../../components/user/home/Students'
import OurTeam from '../../../components/user/home/OurTeam'
import About from '../../../components/user/home/About'
import Academy from '../../../components/user/home/Academy'
import { useEffect } from "react";

export default function Home()
{
    useEffect(()=>{
        window.scrollTo({
            behavior:"smooth",
            top:"0"
        })
    },[]);

    return(
        <div>
            <LandHomePage/>
            <OurServices/>
            <HowItsWork/>
            <Participation/>
            <Memberships/>
            <Courses/>
            <Students/>
            <OurTeam/>
            <About/>
            <Academy/>
        </div>
    )
}
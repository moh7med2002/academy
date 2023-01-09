import GoldMembership from "../../../components/user/memberShips/GoldenMemberShip";
import RegularMembership from "../../../components/user/memberShips/ReqularMemberShip";
import SilverMembership from "../../../components/user/memberShips/SilverMemberShip";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import '../../../assest/css/user/memberShips/memberShipsPage.css'

export default function MemberShipsPage()
{
    useEffect(()=>
    {
        window.scrollTo({
            behavior:'smooth',
            top:0
    })})
    
    const navigate = useNavigate()
    return(
        <div className="container subscription">
            <div className="subscription-wrapper">
                <h3 className="title">الاشتراكات او العضويات </h3>
                <div className="type-members">
                    <button className="not-active type-btn">شهري</button>
                    <button className="active type-btn">فصلي</button>
                    <button className="not-active type-btn">سنوي</button>
                </div>
                <div className="content">
                    <div className="memebrship">
                        <RegularMembership/>
                        <h3 className="membership-text">العضوية العادية  </h3>
                    </div>
                    <div className="gold-member memebrship">
                        <GoldMembership/>
                        <h3 className="membership-text">العضوية الذهبية </h3>
                    </div>
                    <div className="silver-member  memebrship">
                        <SilverMembership/>
                        <h3 className="membership-text">العضوية الفضية  </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
import './../../assest/css/user/footer.css'
import whatsapp from './../../images/icons/whatsapp.svg'
import facebook from './../../images/icons/facebook.svg'
import youtube from './../../images/icons/youtube.svg'
import instagram from './../../images/icons/instagram.svg'

export default function Footer()
{
    return(
        <div className="footer">
            <div className="container footer-container">
                <div className="footer-wraper">
                    <div className="content">
                        <h3 className="title">اكادميتنا </h3>
                        <div className="box-wrapper">
                            <ul className="box-links">
                                <li>خدماتنا </li>
                                <li>الية عمل المنصة </li>
                                <li>انظمتنا</li>
                                <li>فريقنا </li>
                                <li>السياسات والشروط</li>
                            </ul>
                            <ul className="box-links">
                                <li>المراحل العمرية</li>
                                <li>من نحن </li>
                                <li>اكادميتنا والاطفال </li>
                            </ul>
                        </div>
                    </div>
                    <div className="data">
                        <div className="line"></div>
                        <div className='data-wrapper'>
                            <div>
                                <h3 className="data-title">تواصل معنا </h3>
                                <ul className='data-socials'>
                                    <li><img src={whatsapp} alt='whatsapp icon'/></li>
                                    <li><img src={instagram} alt='instagram icon'/></li>
                                    <li><img src={youtube} alt='youtube icon' className='youtube'/></li>
                                    <li><img src={facebook} alt='facebook icon'/></li>
                                </ul>
                            </div>
                            <h2 className='note-text'>جميع الحقوق محفوظة لاكاديميتنا 2022</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

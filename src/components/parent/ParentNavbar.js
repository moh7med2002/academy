import {useState , useRef , useEffect} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiOutlineMenu , AiOutlineClose} from 'react-icons/ai'
import {MdSettings} from 'react-icons/md'
import '../../assest/css/parent/parentNavbar.css'
import logo from '../../images/logo.png'

export default function ParentNavbar() {
  const [showNav,setshowNav]=useState(false);
  const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setshowNav(p=>false);
            document.body.style.overflowY="visible"
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
return (
    <nav className='parent-navBar'>
        <div className='nav-container container'>
        <nav className='nav-wrapper'>
            <div className='nav-logo '>
                <img src={logo} alt="logo" className='logo-nav'/>
                <h3 className='heading-three'>أكادميتنا</h3>
            </div>
              <button className='toggle-show' onClick={()=>setshowNav(p=>!p)}>
                {!showNav?<AiOutlineMenu/>:<AiOutlineClose/>}
              </button>
            <div className={`links-wrapper ${showNav?"show":"notShow"}`} ref={ref}>
                <form className='search-form-second'>
                  <button className='search-icon'>
                    <HiOutlineSearch/>
                  </button>
                  <input 
                  className='search-input'
                  type={"search"}
                  placeholder="ابحث"/>
                </form>
                <div className='setting-icon'>
                    <MdSettings/>
                </div>
            </div>
        </nav>
        </div>
    </nav>
  )
}
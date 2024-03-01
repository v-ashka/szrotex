import React, { useRef, useState } from 'react'
import Logo from '../img/logo.svg'
import Hamburger from '../img/hamburger.svg'
import CloseIcon from '../img/close.svg'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faContactBook, faFireFlameCurved, faPerson, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons"
import { faCircleQuestion, faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { faFireFlameCurved, faPercent, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'


const DashHeader = () => {
  const [show, setShow] = useState(false)
  const datavisibleRef = useRef();
  const primaryNavRef = useRef();

  const handleClick = () => {
    setShow(!show)
    console.log(datavisibleRef.current.hasAttribute('data-visible'));
    datavisibleRef.current.hasAttribute('data-visible') 
      ? primaryNavRef.current.setAttribute("aria-expanded", false)
      : primaryNavRef.current.setAttribute("aria-expanded", true)
    datavisibleRef.current.toggleAttribute("data-visible")
    // console.log(show)
  }

  const content = (
    <header className='primary-header border-b-2 pb-1 border-clr-primary-300 mx-2'>
        <div className='flex justify-between items-center px-2 py-1'>
            <Link to={'/'}><img src={Logo}/></Link>
            <div className='flex justify-end items-center gap-2'>
              <nav className='primary-navigation max-lg:hidden' id='primary-navigation' ref={primaryNavRef}>
                <ul className='nav-list flex gap-4 text-text-clr-secondary-100  hover:transition-all' aria-label='Primary' role='list'>
                  <li className='hover:text-text-clr-secondary-400'><Link to={'/promotions'}><FontAwesomeIcon icon={faPercent} className='text-clr-primary-300 group-hover:text-clr-primary-100' /> Promocje</Link></li>
                  <li className='hover:text-text-clr-secondary-400'><Link to={'/about-us'}><FontAwesomeIcon icon={faCircleQuestion} className='text-clr-primary-300 group-hover:text-clr-primary-100' /> O nas</Link></li>
                  <li className='hover:text-text-clr-secondary-400'><Link to={'/login'}><FontAwesomeIcon icon={farUser} className='fa-light text-clr-primary-300 group-hover:text-clr-primary-100' /> Twoje konto</Link></li>
                </ul>
              </nav>
              <div className='max-sm:hidden flex gap-4' ref={primaryNavRef}>
                <button className='button bg-clr-primary-100 border-clr-primary-300 border-2 py-1 px-4 rounded-xl hover:bg-clr-primary-300 group hover:border-clr-primary-100 hover:transition-all'><FontAwesomeIcon icon={faSearch} className='text-clr-primary-300 group-hover:text-clr-primary-100' /> Wyszukaj</button>
                <Link to="/adding" className='button bg-clr-primary-100 border-clr-primary-300 border-2 py-1 px-4 rounded-xl hover:bg-clr-primary-300 group hover:border-clr-primary-100 hover:transition-all'><FontAwesomeIcon icon={faPlus} className='text-clr-primary-300 group-hover:text-clr-primary-100' /> Dodaj ogłoszenie</Link>
              </div>

              <button onClick={handleClick} className='lg:hidden group' aria-controls='primary-navigation' aria-expanded="false" ref={datavisibleRef}>
                <img className={`icon-close`} src={CloseIcon} alt=''/> 
                <img className='icon-hamburger' src={Hamburger} alt='' aria-hidden="true"/>
                  <span className='hidden'>Menu</span>
              </button>
            </div>
        </div>
    </header>
  )
    
  

  return content
}

export default DashHeader
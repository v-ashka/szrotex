import React, { useEffect, useRef, useState } from 'react'
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

  const primaryHeader = useRef();
  const datavisibleRef = useRef();
  const primaryNavRef = useRef();
  const buttonRef = useRef();

  const handleClick = () => {
    setShow(!show)
    console.log(datavisibleRef.current.hasAttribute('data-visible'));
    datavisibleRef.current.hasAttribute('data-visible') 
      ? primaryNavRef.current.setAttribute("aria-expanded", false)
      : primaryNavRef.current.setAttribute("aria-expanded", true)
    datavisibleRef.current.hasAttribute('data-visible')
      ? buttonRef.current.setAttribute("aria-expanded", false)
      : buttonRef.current.setAttribute("aria-expanded", true)
    datavisibleRef.current.toggleAttribute("data-visible")
    primaryHeader.current.toggleAttribute("data-overlay");    
  }



  const content = (
    <header className='primary-header group group-data-[overlay] data-[overlay]:z-10 container mx-auto' ref={primaryHeader}>
        <div className='flex justify-between items-center px-2 py-1 group-data-[overlay]:grid group-data-[overlay]:grid-cols-2 group-data-[overlay]:z-50 group-data-[overlay]:sticky group-data-[overlay]:bg-clr-primary-200 group-data-[overlay]:w-full group-data-[overlay]:h-fit group-data-[overlay]:pb-5'>
            <Link className='group-data-[overlay]:col-span-4 group-data-[overlay]:z-50' to={'/'}><img src={Logo}/></Link>
            <div className='flex justify-end items-center gap-6 group-data-[overlay]:order-2 group-data-[overlay]:flex-col group-data-[overlay]:col-span-2 group-data-[overlay]:z-50'>
              <nav className='primary-navigation aria-[expanded=false]:max-lg:hidden transition' id='primary-navigation' ref={primaryNavRef} aria-expanded="false">
                <ul className='nav-list flex gap-4 text-text-clr-secondary-100 transition group-data-[overlay]:flex-col group' aria-label='Primary' role='list'>
                  <li className='hover:text-text-clr-secondary-400 group/icon'><Link to={'/promotions'}><FontAwesomeIcon icon={faPercent} className='text-clr-primary-300 group-hover/icon:text-clr-primary-400 px-2' /> Promocje</Link></li>
                  <li className='hover:text-text-clr-secondary-400 group/icon'><Link to={'/about-us'}><FontAwesomeIcon icon={faCircleQuestion} className='text-clr-primary-300 group-hover/icon:text-clr-primary-400 px-2' /> O nas</Link></li>
                  <li className='hover:text-text-clr-secondary-400 group/icon'><Link to={'/login'}><FontAwesomeIcon icon={farUser} className='fa-light text-clr-primary-300 group-hover/icon:text-clr-primary-400 px-2' /> Twoje konto</Link></li>
                </ul>
              </nav>
              <div className='max-sm:hidden aria-[expanded=true]:max-sm:flex flex gap-4 group-data-[overlay]:flex-col group-data-[overlay]:-order-1' ref={buttonRef}>
                <button className='button bg-clr-primary-100 border-clr-primary-300 border-2 py-1 px-4 rounded-xl hover:bg-clr-primary-300 group/icon hover:border-clr-primary-100 hover:transition-all'><FontAwesomeIcon icon={faSearch} className='text-clr-primary-300 group-hover/icon:text-clr-primary-100 mr-2' /> Wyszukaj</button>
                <Link to="/adding" className='button bg-clr-primary-100 border-clr-primary-300 border-2 py-1 px-4 rounded-xl hover:bg-clr-primary-300 group/icon hover:border-clr-primary-100 hover:transition-all'><FontAwesomeIcon icon={faPlus} className='text-clr-primary-300 group-hover/icon:text-clr-primary-100 mr-2' /> Dodaj ogłoszenie</Link>
              </div>

             
            <button onClick={handleClick} className='lg:hidden group mobile-nav-toggle px-2 group-data-[overlay]:order-1 group-data-[overlay]:justify-end group-data-[overlay]:fixed group-data-[overlay]:flex group-data-[overlay]:top-5 group-data-[overlay]:right-2 w-fit h-fit' aria-controls='primary-navigation' aria-expanded="false" ref={datavisibleRef}>
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
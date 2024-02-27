import React from 'react'
import Logo from '../img/logo.svg'
import Hamburger from '../img/hamburger.svg'
import CloseIcon from '../img/close.svg'
import { Link } from 'react-router-dom'
const DashHeader = () => {
  const content = (
    <header className='primary-header'>
        <div className='flex justify-between items-center px-4 py-2'>
            <Link to={'/'}><img src={Logo}/></Link>
            <button className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded="false">
                <img className='icon-hamburger' src={Hamburger} alt='' aria-hidden="true"/>
                <img className='icon-close' src={CloseIcon} alt='' aria-hidden="true" />
                <span className='hidden'>Menu</span>
            </button>
        </div>
    </header>
  )
    
  

  return content
}

export default DashHeader
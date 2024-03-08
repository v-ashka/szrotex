import React, { useState } from 'react'
import LogoInverted from '../img/logo-inverted.svg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faPercent, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../img/hero-image.jpg'
const DashFooter = () => {
  const [userEmail, setUserEmail] = useState('');
  const [gpdrCheckbox, setGpdrCheckbox] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    console.log('passed data: ')
    console.log(userEmail, gpdrCheckbox)
  }

  const content = (
    <footer className='bg-white pt-8 tracking-wide py-4 h-full'>
      <div className='container mx-auto'>
        <div className="newsletter-section">
          <div className='newsletter'>
            <h1 className='font-semibold text-4xl mb-2'>Zostań z nami na dłużej</h1>
            <p className='font-light text-md tracking-wider'>Zapisz się do naszego newslettera, aby otrzymywać najnowsze informacje na temat naszego serwisu!</p>
          <form className='my-4 md:flex flex-wrap gap-4' onSubmit={handleNewsletter}>
            <input type='email' className='form-input' placeholder='Podaj adres email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
            <div className='my-4 gpdr-form md:order-3'>
              <input type='checkbox' defaultChecked={gpdrCheckbox}  onChange={() => setGpdrCheckbox(!gpdrCheckbox)} className='mr-4'/>
              <label className='text-xs'>Wyrażam zgodę na przetwarzanie moich danych osobowych przez Szrotex Sp. z o.o. z siedzibą w Lublinie, ul. Długa 56 20-001 Lublin Polska w celu przesyłania na mój adres e-mail newslettera zawierającego informacje o promocjach oraz najświeższych informacjach ze strony szrotex.com. Podanie danych osobowych jest dobrowolne, ale niezbędne do przesyłania newslettera.</label>
            </div>
            <button type='submit' className='btn-submit disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed md:w-32 lg:w-1/4 md:order-1' disabled={!gpdrCheckbox} >Zapisz się</button>
          </form>
          </div>
          <div className="hero-footer rounded-2xl aspect-square w-full max-sm:hidden sm:h-full lg:h-96">
          </div>
        </div>
        <div className='footer-navigation'>
          <div className='footer-header'>
          <Link className='' to={'/'}><img src={LogoInverted}/></Link>
          <div className='shop-data'>
            <div className='shop-address flex flex-col'>
              <p>Szrotex Sp. z.o.o</p>
              <p>ul. Długa 56</p>
              <p>20-001 Lublin, Polska</p>
            </div>
            <div className='contact-us flex flex-col my-2 justify-center'>
              <Link className='flex flex-row gap-2' to="tel:+48123456789"><FontAwesomeIcon icon={faPhoneFlip} /> +48 123 456 789</Link>
              <Link className='flex flex-row gap-2' to="mailto:szrotex@gmail.com"><FontAwesomeIcon icon={faMailBulk} /> szrotex@gmail.com</Link>
            </div>
          </div>
          </div>
          <div className='footer-nav '>
            <ul>
              <p className='text-xl font-semibold mt-2'>Informacje</p>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>O nas</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Regulamin</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Polityka prywatności</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Kontakt</li>
                </Link>
            </ul>
          </div>
          <div className='footer-nav'>
            <ul>
              <p className='text-xl font-semibold mt-2'>Dla sprzedających</p>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Dodaj ogłoszenie</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Moje konto</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Dodatkowe funkcje</li>
                </Link>
            </ul>
          </div>
          <div className='footer-nav-last mx-3 flex flex-col mb-2'>
            <ul>
              <p className='text-xl font-semibold mt-2'>Dla kupujących</p>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Wyszukaj części</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Jak kupować</li>
                </Link>
                <Link to={'#'}>
                  <li className='pl-2 py-1'>Bezpieczne zakupy</li>
                </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )

  return content
}

export default DashFooter
import React, { useState } from 'react'
import Logo from '../img/logo.svg'
import { Link } from 'react-router-dom';

const DashFooter = () => {
  const [userEmail, setUserEmail] = useState('');
  const [gpdrCheckbox, setGpdrCheckbox] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    console.log('passed data: ')
    console.log(userEmail, gpdrCheckbox)
  }

  const content = (
    <footer className='bg-white px-2 py-8'>
      <div className='newsletter bg-clr-primary-100 rounded-xl p-4 flex flex-col mb-6'>
        <h1 className='font-semibold text-4xl mb-2'>Zostań z nami na dłużej</h1>
        <p className='font-light text-xl'>Zapisz się do naszego newslettera, aby otrzymywac najnowsze informacje na temat naszego serwisu!</p>
      <form className='my-4' onSubmit={handleNewsletter}>
        <input type='email' className='rounded-md bg-clr-primary-300 p-2 text-white w-full placeholder:text-text-clr-secondary-200 font-semibold' placeholder='Podaj adres email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
        <div className='my-4'>
          <input type='checkbox' defaultChecked={gpdrCheckbox}  onChange={() => setGpdrCheckbox(!gpdrCheckbox)} className='mr-4'/>
          <label className='text-xs'>Wyrażam zgodę na przetwarzanie moich danych osobowych przez Szrotex Sp. z o.o. z siedzibą w Lublinie, ul. Długa 56 20-001 Lublin Polska w celu przesyłania na mój adres e-mail newslettera zawierającego informacje o promocjach oraz najświeższych informacjach ze strony szrotex.com. Podanie danych osobowych jest dobrowolne, ale niezbędne do przesyłania newslettera.</label>
        </div>
        <button type='submit' className='bg-clr-primary-400 rounded-md p-2 text-white font-bold text-center w-full disabled:bg-gray-400 disabled:cursor-not-allowed' disabled={!gpdrCheckbox} >Zapisz się</button>
      </form>
      </div>

      <div className='footer-navigation border-clr-primary-300 rounded-xl border-2 text-text-clr-primary-100'>
        <div className='footer-header border-b-2 border-clr-primary-300 mx-3'>
        <Link className='' to={'/'}><img src={Logo}/></Link>
        </div>
        <div className='footer-nav border-b-2 border-clr-primary-300 mx-3 flex flex-col'>
          <ul>
            <p className='text-xl font-bold'>Informacje</p>
              <li>O nas</li>
              <li>Regulamin</li>
              <li>Polityka prywatności</li>
              <li>Kontakt</li>
          </ul>
        </div>
        <div className='footer-nav border-b-2 border-clr-primary-300 mx-3 flex flex-col'>
          <ul>
            <p className='text-xl font-bold'>Informacje</p>
              <li>O nas</li>
              <li>Regulamin</li>
              <li>Polityka prywatności</li>
              <li>Kontakt</li>
          </ul>
        </div>
        <div className='footer-nav border-b-2 border-clr-primary-300 mx-3 flex flex-col'>
          <ul>
            <p className='text-xl font-bold'>Informacje</p>
              <li>O nas</li>
              <li>Regulamin</li>
              <li>Polityka prywatności</li>
              <li>Kontakt</li>
          </ul>
        </div>
      </div>
    </footer>
  )

  return content
}

export default DashFooter
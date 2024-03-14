import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageLogin from '../../../img/login/login-hero.png'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmitAuth = (e) => {
    e.preventDefault();
    console.log(`email: ${email}`)
    console.log(`pwd: ${pwd}`)
  }

  return (
    <GoogleOAuthProvider clientId="<your_client_id>">
    <div className='flex flex-col md:flex-row h-dvh'>
      <section className='left-column m-auto w-full md:w-1/2 flex flex-col justify-center items-center p-6 order-2 md:order-1 sm:p-24'>
        <img src={ImageLogin} alt='Dashboard page functions presentation'/>
        <div className='flex flex-col text-text-clr-secondary-600 tracking-wider'>
          <p className='text-lg font-medium'>Sprzedawaj, rezerwuj, kupuj produkty</p>
          <p className='text-lg font-normal'>Załóż konto i zyskaj dodatkowe funkcjonalności</p>
        </div>
      </section>
      <section className='right-column bg-text-clr-secondary-600 text-text-clr-primary-100 w-full md:w-1/2 flex flex-col justify-center items-center order-1 sm:py-24 md:order-4'>
        <div className='form-section'>
          <section className='form-header mb-6'>
            <p className='text-4xl font-normal'>Zaloguj się</p>
            <p className='text-lg font-light'>Nie masz jeszcze konta? <Link className='item-link' to={"#register"}>Zarejestruj się</Link></p>
          </section>
          <form onSubmit={e => handleSubmitAuth(e)} className='flex flex-col gap-4'>
            <div className='relative'>
              <div className='form-input-auth'>
                <input type="email" className={`${email?.length ? 'filled' : ''}`} onChange={(e) => setEmail(e.target.value)}/><FontAwesomeIcon icon={faAt} className='form-login-icon'/>
              </div>
              <label className='auth-label'>Email</label>
            </div>
            <div className='relative'>
              <div className='form-input-auth'>
                <input type="password" className={`${pwd?.length ? 'filled' : ''}`} onChange={(e) => setPwd(e.target.value)}/><FontAwesomeIcon icon={faUnlockKeyhole} className='form-login-icon'/>
              </div>
              <label className='auth-label'>Password</label>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-2 items-center'>
                <input className='size-4' type='checkbox'/>
                <label>Zapamiętaj mnie</label>
              </div>
              <Link to={"#odzyskiwanie"} className='item-link'>Odzyskiwanie konta</Link>
            </div>
            <button type="submit" className='btn-login'>Zaloguj się</button>
            <GoogleLogin onSuccess={() => {
              console.log('on sucess')
            }}
            onError={() => {
              console.log('login failed')
            }}
            />
          </form>
        </div>
      </section>
    </div>
    </GoogleOAuthProvider>
    
  )
}

export default Login
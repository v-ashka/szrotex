import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ImageLogin from '../../../img/login/login-hero.png'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdRepeat, setPwdRepeat] = useState('');

  const handleSubmitAuth = (e) => {
    e.preventDefault();
    console.log(`email: ${email}`)
    console.log(`pwd: ${pwd}`)
    console.log(`pwd: ${pwdRepeat}`)
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
      <section className='right-column bg-text-clr-secondary-600 text-text-clr-primary-100 w-full md:w-1/2 flex flex-col justify-center items-center order-1 p-4 sm:p-0 sm:py-24 md:order-4'>
        <div className='form-section md:w-3/5 2xl:w-1/3'>
          <section className='form-header mb-6'>
            <p className='text-4xl font-normal'>Zarejestruj się</p>
            <p className='text-lg font-light'>Masz już konto? <Link className='item-link' to={"/login"}>Zaloguj się</Link></p>
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
            <div className='relative'>
              <div className='form-input-auth'>
                <input type="password" className={`${pwd?.length ? 'filled' : ''}`} onChange={(e) => setPwd(e.target.value)}/><FontAwesomeIcon icon={faUnlockKeyhole} className='form-login-icon'/>
              </div>
              <label className='auth-label'>Repeat Password</label>
            </div>
            <button type="submit" className='btn-login'>Zarejestruj się</button>
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

export default Register
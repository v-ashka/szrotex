import React from 'react'
import TopBannerImage from '../img/categories/engine.jpg'
import TopBannerImage2 from '../img/categories/gears.jpg'
import TopBannerImage3 from '../img/categories/carbody.jpg'
import TopBannerImage4 from '../img/categories/engine-equipment.jpg'
import TopBannerImage5 from '../img/categories/braking-system.jpg'
import TopBannerImage6 from '../img/categories/suspension.jpg'
import TopBannerImage7 from '../img/categories/electric-circut.jpg'
import TopBannerImage8 from '../img/categories/others.jpg'
import { Link } from 'react-router-dom'
import { faCar, faCarAlt, faCarTunnel, faRecycle, faRepeat, faSearch, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ContentCategories = ({className}) => {
  return (
    <div className={`bg-white text-text-clr-primary-100 relative -z-0 ${className}`}>
      <div className='container mx-auto'>
        <div className='about-us my-12'>
          <div className='about-us__item'>
            <div className='flex justify-center h-7'>
              <FontAwesomeIcon icon={faWrench} className='about-us__icon' />
            </div>
            <div className='about-us__desc'>
              <p className='about-us__title'>Szybka i łatwa wysyłka</p>
              <p className='text-lg'>Kupuj i sprzedawaj bezpiecznie - Szrotex to platforma, która zapewnia bezpieczne transakcje dla kupujących i sprzedających</p>
            </div>
          </div>
          <div className='about-us__item flex flex-col'>
            <div className='flex justify-center h-7'>
              <FontAwesomeIcon icon={faCar} className='about-us__icon' />
            </div>
            <div className='about-us__desc'>
              <p className='about-us__title'>Znajdź używane części do swojego auta</p>
              <p className='text-lg'>Szukasz używanych części do swojego auta? Szrotex to idealne miejsce dla Ciebie! Oferujemy szeroki wybór części do każdego auta,w atrakcyjnych cenach.</p>
            
            </div>
            <button onClick={null} className='btn-primary text-base mt-2 w-full'>
                <FontAwesomeIcon icon={faSearch} className='' />  Wyszukaj części używane
              </button>
          </div>
          <div className='about-us__item'>
            <div className='flex justify-center h-7'>
              <FontAwesomeIcon icon={faRecycle} className='about-us__icon' />
            </div>
            <div className='about-us__desc'>
              <p className='about-us__title'>Używane części - drugie życie Twojego auta!</p>
              <p className='text-lg'>Kupując używane części na Szrotex możesz dać drugie życie swojemu autu i zaoszczędzić pieniądze.</p>
            </div>
          </div>
        </div>

        <div className='categories '>
          <div className='categories__desc py-8'>
            <p className='text-2xl font-semibold md:text-4xl'>Kategorie główne</p>
            <p className='text-base font-normal md:text-xl'>Używane części oryginalne i zamienne do samochodów wszystkich marek i modeli.</p>
          </div>

          <ul className='categories__list flex flex-wrap gap-4 justify-center my-4 overflow-clip sm:gap-8 lg:justify-around xl:gap-12'>
            <Link to={"#silniki"}>
              <li className='categories-item '>
                <img src={TopBannerImage} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Silniki</p>
                </div>
              </li>
            </Link>
            <Link to={"#skrzynie"}>
              <li className='categories-item '>
                <img src={TopBannerImage2} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Skrzynie biegów</p>
                </div>
              </li>
            </Link>
            <Link to={"#karoseria"}>
              <li className='categories-item '>
                <img src={TopBannerImage3} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Karoseria</p>
                </div>
              </li>
            </Link>
            <Link to={"#osprzet"}>
              <li className='categories-item '>
                <img src={TopBannerImage4} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Osprzęt silnika</p>
                </div>
              </li>
            </Link>
            <Link to={"#ukladhamul"}>
              <li className='categories-item '>
                <img src={TopBannerImage5} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Układ hamulcowy</p>
                </div>
              </li>
            </Link>
            <Link to={"#zawieszenie"}>
              <li className='categories-item '>
                <img src={TopBannerImage6} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Układ zawieszenia</p>
                </div>
              </li>
            </Link>
            <Link to={"#elektryka"}>
              <li className='categories-item '>
                <img src={TopBannerImage7} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                  <p className='categories-item__name'>Układ elektryczny</p>
                </div>
              </li>
            </Link>
            <Link to={"#inne"}>
              <li className='categories-item '>
                <img src={TopBannerImage8} className='categories-item__image' alt=''/>
                <div className='categories-item__box'>
                    <p className='categories-item__name'>Inne</p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ContentCategories
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
import { faCar, faCarAlt, faCarTunnel, faRecycle, faRepeat, faSearch, faWrench, faUserShield, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShowSectionFade from './common/ShowSectionFade'
// icons 
import StarIco from '../img/hero/star.svg'
import VerifedUserIco from '../img/hero/verified_user.svg'
import RecyclingIco from '../img/hero/recycling.svg'
import HandymanIco from '../img/hero/handyman.svg'
import CarRepairIco from '../img/hero/car_repair.svg'
import ImageWithFade from './common/ImageWithFade'

// import BackgroundVector from '../img/background-vector.svg'

const ContentCategories = ({className}) => {
  return (
    <div className={`bg-white text-text-clr-primary-100 relative -z-0 ${className} bg-bg-pattern bg-no-repeat bg-cover	`}>
      <div className='container mx-auto py-6'>
        <ShowSectionFade className="hero-section my-12 py-12">
            
          {/* <div className='about-us__item'>
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
          </div> */}
            
          <div>
            <div className='hero-left-section'>
              <h2 className='text-2xl font-semibold md:text-4xl'>Szrotex rewolucjonizuje rynek używanych części samochodowych</h2>
              <p className='text-lg font-normal md:text-2xl py-2'>Potrzebujesz części do swojego auta? Szrotex to Twoje rozwiązanie. Oferujemy bogaty wybór używanych części samochodowych, łącząc kierowców z renomowanymi stacjami demontażu. Jakość, oszczędność i wygoda w jednym miejscu.</p>

              <div className='py-6'>
                <p className='text-lg'>Dlaczego warto wybrać Szrotex?</p>
                <ul className='text-lg list-disc px-8'>
                  <li><span className='font-bold'>Oszczędność:</span> Używane części w atrakcyjnych cenach</li>
                  <li><span className='font-bold'>Szeroki asortyment:</span> Tysiące części do różnych marek i modeli</li>
                  <li><span className='font-bold'>Wiarygodność:</span> Współpraca tylko ze sprawdzonymi dostawcami</li>
                  <li><span className='font-bold'>Wygoda:</span> Łatwe wyszukiwanie i porównywanie ofert</li>
                  <li><span className='font-bold'>Szybkość:</span> Sprawna realizacja zamówień i dostawa</li>
                  <li><span className='font-bold'>Bezpieczeństwo:</span> Gwarancja jakości i bezpieczne transakcje</li>
                </ul>
              </div>
                <p className='text-lg py-2'>Znajdź idealną część do swojego samochodu już dziś!</p>
                <button onClick={null} className='btn-primary text-lg mt-2 py-2 w-[250px] md:w-[300px]'>
                  <FontAwesomeIcon icon={faSearch} className='mr-2' />  Wyszukaj części
                </button>
              
            </div>
            <div className="hero-section__items">
              <ul className='flex flex-col gap-8 w-fit'>              
                <li className="hero-section__item ">
                {/* <FontAwesomeIcon icon={faCar} className='hero-icon' /> */}
                <ImageWithFade src={CarRepairIco} alt={'Car Repair Icon'} styles={'hero-icon'} />
                <div className='flex flex-col'>
                    <h2>Szybka i łatwa wysyłka</h2>
                    <p>Bezpieczne transakcje dla Twojej wygody.</p>
                  </div>
                </li>
                <li className="hero-section__item ">
                {/* <FontAwesomeIcon icon={faWrench} className='hero-icon' /> */}
                <ImageWithFade src={HandymanIco} alt={'Klucz i młotek ikona'} styles={'hero-icon'} />
                <div className='flex flex-col'>
                    <h2>Szeroki wybór części</h2>
                    <p>Tysiące części do różnych marek i modeli aut w jednym miejscu.</p>
                  </div>
                </li>
                <li className="hero-section__item ">
                {/* <FontAwesomeIcon icon={faRecycle} className='hero-icon' /> */}
                <ImageWithFade src={RecyclingIco} alt={'Recycling icon'} styles={'hero-icon'} />
                <div className='flex flex-col'>
                    <h2>Oszczędność i ekologia</h2>
                    <p>Daj drugie życie częściom i oszczędzaj pieniądze oraz środowisko</p>
                  </div>
                </li>
                <li className="hero-section__item ">
                {/* <FontAwesomeIcon icon={faUserShield} className='hero-icon' /> */}
                <ImageWithFade src={VerifedUserIco} alt={'Verified user icon'} styles={'hero-icon'} />
                <div className='flex flex-col'>
                    <h2>Zaufani sprzedawcy</h2>
                    <p>Współpracujemy tylko z renomowanymi centrami demontażu pojazdów</p>
                  </div>
                </li>
                <li className="hero-section__item ">
                {/* <FontAwesomeIcon icon={faStar} className='hero-icon' /> */}
                <ImageWithFade src={StarIco} alt={'User opinion icon'} styles={'hero-icon'} />
                <div className='flex flex-col'>
                    <h2>Oceny i opinie użytkowników</h2>
                    <p>Sprawdź opinie o sprzedawcach i częściach, podejmuj świadome decyzje zakupowe.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          </ShowSectionFade>

        <ShowSectionFade className='categories '>
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
        </ShowSectionFade>
      </div>
    </div>
  )
}

export default ContentCategories
import React from 'react'
import { Link } from 'react-router-dom'
import ImageExample from '../img/categories/auto-szrot.jpg'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContentStations = ({className}) => {
  return (
    <div className={`${className}`}>
          <div className='companies'>
              <div className='pb-8'>
                <p className='text-2xl font-semibold md:text-4xl'>Renomowane stacje demontażu pojazdów</p>
                <p className='text-base font-normal md:text-xl'>Szukasz pewnego i sprawdzonego źródła używanych części samochodowych? Skorzystaj z listy renomowanych stacji demontażu pojazdów zebranych w bazie naszego serwisu!</p>
              </div>
              <ul className='companies__box'>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc flex flex-wrap justify-between items-center'>
                            <div className='comapny__desc-info'>
                                <p className='company__title'>Auto-Szrot "Gigant"</p>
                                <p className='company__address'>Lublin</p>
                            </div>
                            <div className='company__desc-rating'>
                                <FontAwesomeIcon icon={faStar} /> 
                                <span>3,5/5</span>
                            </div>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
                <Link to={"#"}>
                    <li className='company'>
                        <img src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </Link>
              </ul>
          </div>
    </div>
  )
}

export default ContentStations
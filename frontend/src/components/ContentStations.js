import React from 'react'
import { Link } from 'react-router-dom'
import ImageExample from '../img/categories/auto-szrot.jpg'
const ContentStations = ({className}) => {
  return (
    <div className={`${className}`}>
          <div className='companies'>
              <div className='py-4'>
                <p className='text-2xl font-semibold md:text-4xl'>Renomowane stacje demontażu pojazdów</p>
                <p className='text-base font-normal md:text-xl'>Szukasz pewnego i sprawdzonego źródła używanych części samochodowych? Skorzystaj z listy renomowanych stacji demontażu pojazdów zebranych w bazie naszego serwisu!</p>
              </div>
              <ul className='companies__box'>
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
import React from 'react'
import { Link } from 'react-router-dom'
import ImageExample from '../img/categories/auto-szrot.jpg'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageWithFade from './common/ImageWithFade'
import ShowSectionFade from './common/ShowSectionFade'

const ContentStations = ({className}) => {
  return (
    <div className={`${className}`}>
          <div className='companies'>
              <div className='pb-8'>
                <p className='text-2xl font-semibold md:text-4xl'>Renomowane stacje demontażu pojazdów</p>
                <p className='text-base font-normal md:text-xl'>Szukasz pewnego i sprawdzonego źródła używanych części samochodowych? Skorzystaj z listy renomowanych stacji demontażu pojazdów zebranych w bazie naszego serwisu!</p>
              </div>
              <ul className='companies__box'>
                <ShowSectionFade as={Link} duration={0.2} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
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
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.4} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.6} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.8} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.2} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.4} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.6} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
                <ShowSectionFade as={Link} duration={0.8} translateDir='' translateValue={'50px, 50'}  to={"#"} rootMargin={'50px 0px'}>
                    <li className='company'>
                        <ImageWithFade src={ImageExample} alt={""} className='company__img'/>
                        <div className='company__desc'>
                            <p className='company__title'>Auto-Szrot "Gigant"</p>
                            <p className='company__address'>Lublin</p>
                        </div>
                    </li>
                </ShowSectionFade>
              </ul>
          </div>
    </div>
  )
}

export default ContentStations
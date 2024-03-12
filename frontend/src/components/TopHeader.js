import React from 'react'
import TopBannerImage from '../img/topheader-image.jpg'
import ProductExampleImg from '../img/hero-image2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const TopHeader = ({className}) => {
  return (
    <div className={`top-header ${className}`}>
      <div className="banner-product-search image-filter-overlay">
          <img src={TopBannerImage} className='relative -z-10 block w-full h-[450px] lg:h-full object-cover rounded-2xl -scale-x-100 aspect-square 2xl:h-[760px]' />
          <div className='absolute p-4 bottom-5 block sm:p-8'>
            <div className='text-4xl font-normal my-4 lg:text-6xl'>
              <p>Szukasz części używanych w <span className='font-bold'>Krakowie</span>?</p>
              <p>Znajdziesz je na Szrotex!</p>
            </div>
            <button onClick={null} className='btn-primary lg:text-xl lg:mt-4'>
            <FontAwesomeIcon icon={faSearch} className='text-blacmr-2' />  Wyświetl części z Krakowa
            </button>
          </div>
      </div>
      <div className='info-box rounded-2xl border-2 border-clr-primary-300 tracking-wider'>
        <div className='p-4 sm:p-8 lg:flex lg:flex-col lg:gap-y-4'>
          <div className='info-box__header-text'>
            <p className='font-semibold text-3xl'>Szrotex - Twój partner w naprawach auta.</p>
            <p className='font-light text-base'>Oszczędzaj czas i pieniądze - kupuj używane części na Szrotex!</p>
          </div>
          <div className='info-box__stats'>
            <div className='info-box__item'>
              <p className='text-3xl font-bold'>99999</p>
              <p className='text-xs font-light'>Nowych produktów</p>
            </div>

            <div className='info-box__item'>
              <p className='text-3xl font-bold'>23598</p>
              <p className='text-xs font-light'>Wystawionych opinii</p>
            </div>

            <div className='info-box__item'>
              <p className='text-3xl font-bold'>10352</p>
              <p className='text-xs font-light'>Nowych użytkowników</p>
            </div>
          </div>
        </div>
      </div>
      <div className='latest-added-product bg-clr-primary-100 rounded-2xl'>
        <div className='p-4 sm:p-8'>
          <div className='new-product__info'>
            <p className='font-semibold text-3xl tracking-wide lg:text-4xl'>Ostatnio dodany produkt</p>
            <p className='font-light text-base tracking-wide'>Sprawdź ostatnie produkty dodane przez użytkowników</p>
          </div>
          <Link to={"###"}>
            <div className='new-product__item'>
              <img src={ProductExampleImg} className='h-fit'/>
              <div className='new-product__data'>
                <p className='font-semibold text-lg md:truncate'>Silnik z pełnym wyposażeniem 1.6 HDI asdasdasdasdasds</p>
                <p className='new-product__price text-3xl font-bold'>3899 zł</p>
                <div>
                  <p className='new-product__address'>Wrocław</p>
                  <p className='new-product__date'>10.02.2024</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
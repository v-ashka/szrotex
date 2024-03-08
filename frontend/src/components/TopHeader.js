import React from 'react'
import TopBannerImage from '../img/topheader-image.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const TopHeader = () => {
  return (
    <div className='top-header py-6 flex gap-4'>
      <div className="image-filter-overlay rounded-2xl w-full inline-block relative tracking-wider">
          <img src={TopBannerImage} className='relative -z-10 block w-full h-[450px] object-cover rounded-2xl -scale-x-100 aspect-square' />
          <div className='absolute p-4 bottom-5 block'>
            <div className='text-4xl font-normal my-4'>
              <p>Szukasz części używanych w <span className='font-bold'>Krakowie</span>?</p>
              <p>Znajdziesz je na Szrotex!</p>
            </div>
            <button onClick={null} className='btn-primary'>
            <FontAwesomeIcon icon={faSearch} className='text-blacmr-2' />  Wyświetl części z Krakowa
            </button>
          </div>
      </div>
      <div className='info-box rounded-2xl border-2 border-clr-primary-300 tracking-wider'>
        <div className='p-4'>
          <div className='info-box__header-text'>
            <p className='font-semibold text-3xl'>Szrotex - Twój partner w naprawach auta.</p>
            <p className='font-light text-base'>Oszczędzaj czas i pieniądze - kupuj używane części na Szrotex!.</p>
          </div>
          <div className='info-box__stats'>
            <div className='info-box__item'>
              <p className='text-3xl font-bold'>99999</p>
              <p className='text-xs font-light'>Nowych produktów</p>
            </div>

            <div className='info-box__item'>
              <p className='text-3xl font-bold'>23598</p>
              <p className='text-xs font-light'>Nowych produktów</p>
            </div>

            <div className='info-box__item'>
              <p className='text-3xl font-bold'>10352</p>
              <p className='text-xs font-light'>Nowych produktów</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
import React from 'react'
import DashHeader from './DashHeader'
import { Link, Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'
import TopHeader from './TopHeader'
import ContentCategories from './ContentCategories'
import ContentStations from './ContentStations'
import ImageExample from '../img/categories/auto-szrot.jpg'
import ShowSectionFade from './common/ShowSectionFade'

const Home = () => {
  return (
    <>
    <DashHeader/>
        <main className='w-full'>
            <TopHeader className="container mx-auto py-20"/>
            <ContentCategories className="pb-20"/>
            <div className='container mx-auto py-20 overflow-hidden'>
                <ShowSectionFade>
                    <ContentStations className="container mx-auto py-20"/>    
                </ShowSectionFade>
                <section className="opinions">
                    <div className='pb-8'>
                        <p className='text-2xl font-semibold md:text-4xl'>Co mówią o nas klienci?</p>
                        <ul>
                            <Link to={'#'}>
                                <li className='opinion'>
                                    <p className='opinion__item'></p>
                                    <div className='opinion__info'>
                                        <img src={ImageExample }/>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    <DashFooter/>
    </>
)
}

export default Home
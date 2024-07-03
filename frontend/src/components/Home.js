import React from 'react'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import TopHeader from './TopHeader'
import ContentCategories from './ContentCategories'
import ContentStations from './ContentStations'

import ShowSectionFade from './common/ShowSectionFade'
import UserOpinions from './UserOpinions'

const Home = () => {
  return (
    <>
    <DashHeader/>
        <main className='w-full'>
            <TopHeader className="px-4 md:px-0 md:container md:mx-auto py-20"/>
            <ContentCategories className="pb-20"/>
            <div className='px-4 md:px-0 md:container md:mx-auto py-20 overflow-hidden'>
                <ShowSectionFade>
                    <ContentStations className="py-20"/>    
                </ShowSectionFade>
                <UserOpinions/>
            </div>
        </main>
    <DashFooter/>
    </>
)
}

export default Home
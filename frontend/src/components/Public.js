import React from 'react'
import DashHeader from './DashHeader'
import { Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'
import TopHeader from './TopHeader'
import ContentCategories from './ContentCategories'
import ContentStations from './ContentStations'

const Public = () => {
  return (
    <>
    <DashHeader/>
        <main className='w-full'>
            <TopHeader className="container mx-auto "/>
            <ContentCategories className="py-10"/>
            <ContentStations className="container mx-auto py-10"/>
        </main>
    <DashFooter/>
    </>
)
}

export default Public
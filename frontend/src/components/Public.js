import React from 'react'
import DashHeader from './DashHeader'
import { Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'
import TopHeader from './TopHeader'

const Public = () => {
  return (
    <>
    <DashHeader/>
        <main className='container mx-auto w-full'>
            <TopHeader/>
        </main>
    <DashFooter/>
    </>
)
}

export default Public
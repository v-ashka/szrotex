import React from 'react'
import DashHeader from './DashHeader'
import { Outlet } from 'react-router-dom'
import DashFooter from './DashFooter'

const Public = () => {
  return (
    <>
        <DashHeader/>
        <main className='container'>
            <Outlet/>
        </main>
        <DashFooter/>
    </>
)
}

export default Public
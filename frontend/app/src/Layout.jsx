import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {

    const[toggleMenu, settoggleMenu]=React.useState(true)
  return (
    <div>

    <Navbar toggleMenu={toggleMenu} settoggleMenu={settoggleMenu}/>
    <Outlet context={{toggleMenu,settoggleMenu}} />

    </div>
  )
}

export default Layout
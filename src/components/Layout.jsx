import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="sm:container sm:mx-auto px-10 xl:px-80">
        <Outlet/>
    </div>
  )
}
export default Layout
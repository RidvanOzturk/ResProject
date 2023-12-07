import React from 'react'

function Layout({children}) {
  return (
    <div className="sm:container sm:mx-auto px-10 xl:px-96">
        {children}
    </div>
  )
}
export default Layout
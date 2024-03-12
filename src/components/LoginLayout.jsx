import React from 'react'
import loginImg from "../assets/UU_login.jpg";
import logo from "../assets/uu_logo.png";


const LoginLayout = ({children}) => {
  return (
    <div className="w-full min-h-screen bg-white absolute top-0 left-0 right-0 z-10">
      <div className="flex flex-col md:flex-row gap-y-6 min-h-screen">
          <div className='basis-5/12 relative'>
              <img src={logo} width="100" height="100" className="absolute mt-6 ml-12 z-20" />
              <div className='absolute w-full h-full bg-gradient-to-r from-cyan-800'></div>
              <img src={loginImg} className='h-full w-auto object-cover object-right-bottom'/>
              <div className="absolute inset-0 flex items-center justify-start ml-12">
        <h2 className="text-gray-50 text-2xl font-thin">Sorgu İşlemleri Ekranına Hoşgeldiniz</h2>
    </div>
          </div>
          <div className='basis-7/12 flex items-center justify-center'>
              {children}
          </div>
      </div>
    </div>
  )
}

export default LoginLayout
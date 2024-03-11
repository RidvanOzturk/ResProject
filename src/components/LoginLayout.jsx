import React from 'react'
import loginImg from "../assets/UU_login.jpg";
import logo from "../assets/uu_logo.png";
import UserLogin from '../pages/login/UserLogin';
const LoginLayout = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-6 min-h-screen">
        <div className='basis-5/12 relative'>
            <img src={logo} width="100" height="100" className="absolute mt-6 ml-12 z-10" />
            <div className='absolute w-full h-full bg-gradient-to-r from-cyan-800'></div>
            <img src={loginImg} className='h-full w-auto object-cover object-right-bottom'/>
        </div>
        <div className='basis-7/12 flex items-center justify-center'>
            
            <div className='p-4 w-full md:w-1/2 md:p-0 flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2'>
                <div className='font-bold text-3xl'>Giriş Yap</div>
                <div className='font-semibold text-md text-slate-600'>Aşağıdaki bilgileri doldurarak giriş yapabilirsiniz.</div>
            </div>
            <div className="form">
            <div className='flex flex-col gap-y-4'>
            <div className='flex flex-col gap-y-1'>
                <label htmlFor='tc' className='text-lg'>TC / Vatandaşlık Numaranız:</label>
                <input type='text' id='tc' placeholder='TC / Vatandaşlık Numaranız' className='rounded p-5 shadow drop-shadow'/>
            </div>
            <div className='flex flex-col gap-y-1'>
                <label htmlFor='password' className='text-lg'>Şifre:</label>
                <input type='text' id='password' placeholder='Şifreniz' className='rounded p-5 shadow drop-shadow'/>
            </div> 
            </div>
            </div>
            <div className='flex justify-between'>
                
                <div className="flex items-center">
                    
                <input id='kvkk' type='checkbox' className='p-2 rounded drop-shadow shadow mr-2'/>
                <label htmlFor='kvkk' className='text-lg underline'><a href="https://www.google.com" target='_blank'>KVKK Onaylıyorum</a></label>
                </div>

                <button className='text-white bg-slate-700 text-xl px-4 py-2 rounded'>Giriş Yap</button>
            </div>
                
            </div>
        </div>
    </div>
  )
}

export default LoginLayout
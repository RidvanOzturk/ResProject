import React, { useState } from "react";

import useAuthentication from "../../hooks/useAuthentication";
import LoginLayout from "../../components/LoginLayout";

function AdminLogin() {

  const { isLoading, message, adminLoginCall } = useAuthentication();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await adminLoginCall({ username, password });
  };

  return (
    <LoginLayout>
        <div className='p-4 w-full md:w-1/2 md:p-0 flex flex-col gap-y-8'>
                <div className='flex flex-col gap-y-2'>
                    <div className='font-bold text-3xl'>Giriş Yap</div>
                    <div className='font-semibold text-md text-slate-600'>Aşağıdaki bilgileri doldurarak giriş yapabilirsiniz.</div>
                </div>
                    
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='username' className='text-lg'>Username:</label>
                        <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username...' className='rounded p-5 shadow drop-shadow'/>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='password' className='text-lg'>Şifre:</label>
                        <input type='text' id='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Şifreniz...' className='rounded p-5 shadow drop-shadow'/>
                    </div> 
                </div>

                <div className='flex justify-end'>
                    <button type="button" onClick={handleSubmit} disabled={!username || !password} className='text-white bg-slate-700 text-xl px-4 py-2 rounded disabled:bg-slate-400'>Giriş Yap</button>
                </div>
            </div>
    </LoginLayout>  
  );
}

export default AdminLogin;

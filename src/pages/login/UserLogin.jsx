import React, { useState } from "react";

import useAuthentication from "../../hooks/useAuthentication";
import LoginLayout from "../../components/LoginLayout";

function UserLogin({ docTitle, docDesc }) {

  const { isLoading, message, userLoginCall } = useAuthentication();

  const [username, setUsername] = useState("");
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async () => {
    console.log(username)
    await userLoginCall({ username });
  };

  return (
    <LoginLayout>
       <div className='p-4 w-full md:w-1/2 md:p-0 flex flex-col gap-y-8'>
          <div className='flex flex-col gap-y-2'>
              <div className='font-bold text-3xl'>{docTitle}</div>
              <div className='font-semibold text-md text-slate-600'>{docDesc}</div>
          </div>

          <div className='flex flex-col gap-y-1'>
              <label htmlFor='ogrenci-no' className='text-lg'>Öğrenci Numaranız:</label>
              <input type='text' id='ogrenci-no' value={username} onChange={e => setUsername(e.target.value)} placeholder='Öğrenci Numaranız...' className='rounded p-5 shadow drop-shadow'/>
          </div> 

          <div className='flex justify-between'>
              <div className="flex items-center">   
                <input id='kvkk' type='checkbox' value={isChecked} onChange={() => setIsChecked(!isChecked)} className='p-2 rounded drop-shadow shadow mr-2'/>
                <label htmlFor='kvkk' className='text-lg underline'><a href="https://www.google.com" target='_blank'>KVKK Onaylıyorum</a></label>
              </div>
              <button type="button" onClick={handleSubmit} disabled={!isChecked || !username} className='text-white bg-slate-700 text-xl px-4 py-2 rounded disabled:bg-slate-400'>Giriş Yap</button>
          </div>
      </div>
    </LoginLayout>
  );
}

export default UserLogin;

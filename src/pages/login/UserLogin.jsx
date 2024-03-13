import React, { useState } from "react";

import useAuthentication from "../../hooks/useAuthentication";
import LoginLayout from "../../components/LoginLayout";
import Swal from "sweetalert2";

function UserLogin({ isDocAccessible, docTitle, docDesc, docStartDate, docEndDate}) {

  const { isLoading, message, userLoginCall } = useAuthentication();

  const [username, setUsername] = useState("");
  const [isChecked, setIsChecked] = useState(false)

  console.log(isDocAccessible);
  
  const handleSubmit = async () => {
    let currDate = new Date();

    console.log(username)
    console.log(currDate.toLocaleDateString('en-GB'))

    if (isDocAccessible) {
      await userLoginCall({ username });
    }
    else
    {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Eşleşen Tarihlerde Veri Olmayabilir.",
        footer: 'Danışman hocanızla iletişime geçebilirsiniz.'
      });
      return null;
    }
  };

  return (
    <LoginLayout>
       <div className='p-4 w-full md:w-1/2 md:p-0 flex flex-col gap-y-8'>
          <div className='flex flex-col gap-y-2'>
              <div className='font-bold text-3xl'>{docTitle}</div>
              <div className='font-semibold text-md text-slate-600'>{docDesc}</div>
              <div className='font-semibold text-md text-slate-600'>Bu dosya <u>{docStartDate}</u> ile <u>{docEndDate}</u> tarihleri arasında görüntülenebilir.</div>
          </div>

          <div className='flex flex-col gap-y-1'>
              <label htmlFor='ogrenci-no' className='text-lg'>Öğrenci Numaranız:</label>
              <input type='text' id='ogrenci-no' value={username} onChange={e => setUsername(e.target.value)} placeholder='Öğrenci Numaranız...' className='rounded p-5 shadow drop-shadow'/>
          </div> 

          <div className='flex justify-between'>
              <div className="flex items-center">   
                <input id='kvkk' type='checkbox' value={isChecked} onChange={() => setIsChecked(!isChecked)} className='p-2 rounded drop-shadow shadow mr-2'/>
                <label htmlFor='kvkk' className='text-lg underline'><a href="https://uskudar.edu.tr/tr/kisisel-verilerin-korunmasi" target='_blank'>KVKK Onaylıyorum</a></label>
              </div>
              <button type="button" onClick={handleSubmit} disabled={!isChecked || !username} className='text-white bg-slate-700 text-xl px-4 py-2 rounded disabled:bg-slate-400'>Giriş Yap</button>
          </div>
      </div>
    </LoginLayout>
  );
}

export default UserLogin;

import React,{ useState } from 'react'

import {useSelector} from "react-redux";

import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import { storage, firestore } from '../../firebase';
import { getDownloadURL, uploadBytesResumable, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";


function AddFile() {

  const user = useSelector(({UserSlice}) => UserSlice.user);

  const [uploadIsStarted, setUploadIsStarted] = useState(false);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [isSingle, setIsSingle] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [file, setFile] = useState(null);

  const handleTitleChange = e => { setTitle(e.target.value); }
  const handleDescriptionChange = e => { setDescription(e.target.value); }
  const handleOptionChange = e => { setIsSingle(e.target.value === "single" ? true : false); }
  const handleStartDateChange = date => { setStartDate(date); }
  const handleEndDateChange = date => { setEndDate(date); }
  const handleFileChange = e => { setFile(e.target.files[0]); }


  const handleFormSubmit = () => {

    if (title === null || file === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Lütfen tüm boşlukları doldurunuz.",
        footer: 'Alanları eksiksiz doldurunuz.'
      });
      return;
    }

    setUploadIsStarted(true);

    // Firebase Storage
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
    // Firebase Firestore
    const collectionRef = collection(firestore, "files");

    uploadTask.on('state_changed', (snapshot) => { 
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }
        }, (err) => { 
            // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
            switch (err.code) {
                case 'storage/unauthorized': setError("You don't have permission to upload!"); break;
                case 'storage/canceled': setError("Upload cancelled!"); break;
                case 'storage/unknown': setError("An unknown error occurred!"); break;
                default: setError(err); break;
            }
        }, () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
                try {
                    const docRef = await addDoc(collectionRef, {
                      owner: user.username,
                      url: downloadURL,
                      title, description, isSingle, startDate, endDate,
                      createdAt: serverTimestamp()
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setUrl(downloadURL);
                    setUploadIsStarted(false);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }                      
            });
        }
    );
    
  }

  return (
      uploadIsStarted
      ?
      <div className="py-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">Yükleniyor</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">Lütfen bekleyiniz...</p>

        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="h-6 bg-green-600 rounded-full" style={{"width": `${progress}%`}}></div>
        </div>
      </div>
      :
      <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Başlık
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Başlık girilmesi zorunludur"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Açıklama
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
            </div>

            <div className="flex items-center">
              <input 
                name="single-multiple" 
                type="radio" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                id="single-radio" 
                value="single" 
                onChange={handleOptionChange}
                checked={isSingle}
              />
              <label for="single-radio" className="ms-2 text-md">Tekli</label>
            </div>
            <div className="flex items-center">
                <input 
                  name="single-multiple" 
                  type="radio" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  id="multiple-radio" 
                  value="multiple" 
                  onChange={handleOptionChange}
                />
                <label for="multiple-radio" className="ms-2 text-md">Çoklu</label>
            </div>

            <div className="col-span-full">
              <div className="mt-2 flex items-center gap-x-3">
                <DatePicker showIcon selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date) => handleStartDateChange(date)} />
                <DatePicker showIcon selected={endDate} dateFormat="dd/MM/yyyy" onChange={(date) => handleEndDateChange(date)} />
              </div>
            </div>

            <div className="col-span-full">
              <div className="flex items-center justify-center w-full">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400">
                            {
                              file === null ? 
                              <>XLS, CSV (MAX. 50MB)</>
                              :
                              file.name
                            }
                          </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
                </label>
              </div> 
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button 
          type='button'
          onClick={handleFormSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Kaydet
        </button>
      </div>
      </form>
  )
}

export default AddFile
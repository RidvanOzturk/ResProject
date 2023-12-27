import React,{ useState, useEffect } from 'react'

import { storage, firestore } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

import { ref, getDownloadURL } from "firebase/storage";

import * as XLSX from "xlsx";

const Multiple = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
   
    const fetchData = async () => {
        
      getDownloadURL(ref(storage, 'files/Sonuç.xlsx'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            handleFileUpload(url)
            console.log(url)
        })
        .catch((error) => {
            // Handle any errors
        });
    }
    
    fetchData().catch(console.error);;


  }, []);


  const handleFileUpload = async (url) => {

    const e = await URLtoFile(url);

    const reader = new FileReader();
    reader.readAsBinaryString(e);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      
      setData(parsedData);
      console.log(Object.keys(parsedData))
      console.log(parsedData)

    };
  }

  const URLtoFile = async url => {

    const res = await fetch(url);
    const blob = await res.blob();
    // Gets URL data and read to blob
  
    console.log(url);
  
    console.log(blob);
  
    const mime = blob.type;
    const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);
    // Gets blob MIME type (e.g. image/png) and extracts extension
        
    const file = new File([blob], `filename.${ext}`, {
        type: mime,
    })
    // Creates new File object using blob data, extension and MIME type
  
    console.log(file);

    return file;

  }
  


  return (
    <div className="relative overflow-x-auto">
        {
        /*
            Teklide

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            data && Object.keys(data).map((key, index) => (
                <tr key={index}>
                    <td>{key}</td>
                    <td>{data[key]}</td>
                </tr>
                ))
        </table>
        */
        }
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Ad
                </th>
                <th scope="col" className="px-6 py-3">
                    Soyad
                </th>
                <th scope="col" className="px-6 py-3">
                    Sonuç
                </th>
            </tr>
        </thead>
        <tbody>
            {
                data && data.map(row => 

                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            { row['Ad'] }
                        </th>
                        <td className="px-6 py-4">
                            {  row['Soyad'] }
                        </td>
                        <td className="px-6 py-4">
                            { row['Sonuç'] }
                        </td>
                    </tr>
                )
            }
        </tbody>
    </table>
</div>




     /* <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        Silver
                    </td>
                    <td className="px-6 py-4">
                        Laptop
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">
                        White
                    </td>
                    <td className="px-6 py-4">
                        Laptop PC
                    </td>
                    <td className="px-6 py-4">
                        $1999
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">
                        Black
                    </td>
                    <td className="px-6 py-4">
                        Accessories
                    </td>
                    <td className="px-6 py-4">
                        $99
                    </td>
                </tr>
            </tbody>
        </table>
    </div>*/

  )
}

export default Multiple
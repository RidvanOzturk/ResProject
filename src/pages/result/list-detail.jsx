import { documentId, getDocs, collection, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as XLSX from "xlsx";
const ListDetail = () => {

  const {id} = useParams()

  const [docData, setDocData] = useState(null);

  useEffect(() => {

    const fetchDocById = async () => {
      const querySnapshot = await getDocs(query(collection(firestore, "files"), where(documentId(), "==", id)))
      handleFileUpload(querySnapshot.docs[0].data().url);
    }

    fetchDocById().then(response => setDocData(response))
    
  }, [])
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

      console.log(parsedData)
      
      setDocData(parsedData);
    }

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
    <>
      
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
                docData && docData.map((row, index) => 

                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
        
    </>
  )
}

export default ListDetail
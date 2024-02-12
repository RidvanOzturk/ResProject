import { documentId, getDocs, collection, query, where, Timestamp } from 'firebase/firestore';
import { firestore } from '../../firebase';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as XLSX from "xlsx";
import { RoleTypes } from '../../RoleTypes';
import {useSelector} from "react-redux";
import UserLogin from '../login/UserLogin';
const ListDetail = () => {

  const {id} = useParams()
  const user = useSelector(({UserSlice}) => UserSlice.user);


  const [docData, setDocData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


    const fetchDocById = async () => {

        if(!user.username) return null;

        const idQuery = where(documentId(), "==", id);
        //const ownerQuery = where("owner", "==", user.username);
        const querySnapshot = await getDocs(query(collection(firestore, "files"), idQuery ));

        if(querySnapshot.docs[0]){

            const fetchedData = querySnapshot.docs[0].data();
            const currentDateTimestamp = Timestamp.fromDate(new Date())
            
            if(currentDateTimestamp > fetchedData.startDate && currentDateTimestamp < fetchedData.endDate){
                const single = true;
                const url = querySnapshot.docs[0].data().url;
                const file = await URLtoFile(url);
                const xlsTable = await FileToXLS(file);
                
                const filteredData = user.role == RoleTypes.user ? xlsTable.filter((number) => number["Öğrenci No"] == user.username) : xlsTable;

                if(fetchedData.isSingle !=true) single=false;
                return filteredData;
            }
        }

        return null;
    }

    fetchDocById().then(response => {
        
         setIsLoading(false);
         setDocData(response)
    })
    
  }, [user])


    const URLtoFile = async url => {

        const res = await fetch(url);
        const blob = await res.blob();

        const mime = blob.type;
        const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);
            
        const file = new File([blob], `filename.${ext}`, { type: mime });

        return file;
    }
    const FileToXLS = file => {

        return new Promise((resolve, reject) => { 
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet);
                
                resolve(parsedData);
            }

        }); 
    }

  return (
    user.username
    ?
    <div className="relative overflow-x-auto">
        {
            isLoading ? "Loading..."
            :
            docData && docData.length
         ?
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
                    docData.map((row, index) => 

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
        :"Eşleşen data yok"
         
        }
    </div>   
    : 
    <UserLogin/>
  )
}
export default ListDetail
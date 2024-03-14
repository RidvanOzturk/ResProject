import {
  documentId,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoleTypes } from "../../RoleTypes";
import { useSelector } from "react-redux";
import UserLogin from "../login/UserLogin";
import ListTable from "../../components/ListTable";
import NotFound from "../../components/404";
import LoadingSpinner from "../../components/general/LoadingSpinner";
import Swal from "sweetalert2";

import useGenerateTable from "../../hooks/useGenerateTable";

const ListDetail = () => {

  const { id } = useParams();
  const user = useSelector(({ UserSlice }) => UserSlice.user);

  const [isDocLoading, setIsDocLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [docData, setDocData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [isDatePassed, setIsDatePassed] = useState(true);

  const [isDocAccessible, setIsDocAccessible] = useState(false)

  const [isLoginCall, setIsLoginCall] = useState(false)

  const {GenerateTable} = useGenerateTable()

  useEffect(() => {
    const fetchDocById = async () => {
      const idQuery = where(documentId(), "==", id);
      const querySnapshot = await getDocs(
        query(collection(firestore, "files"), idQuery)
      );

      if (querySnapshot.docs[0]) {
        const fetchedData = querySnapshot.docs[0].data();
        return fetchedData;
      }

      return null;
    };

    fetchDocById().then((response) => {
      setIsDocLoading(false);
      console.log(response);
      setDocData(response);
    });
  }, []);

  useEffect(() => {

    const fetchTableByData = async () => {
      if (!docData) return null;

      const currentDateTimestamp = Timestamp.fromDate(new Date());

      if(currentDateTimestamp > docData.startDate && currentDateTimestamp < docData.endDate){
        setIsDatePassed(false)
      }

      if (
        (currentDateTimestamp > docData.startDate &&
        currentDateTimestamp < docData.endDate) 
        || 
        user.role == RoleTypes.admin
      ) {
        
        setIsDocAccessible(true)

        let xlsTable = await GenerateTable(docData.url)

        let filteredData;
        if(user.role == RoleTypes.admin){
          filteredData = xlsTable
        }
        else if (user.role == RoleTypes.user) {
          filteredData = xlsTable.filter((number) => number["Öğrenci No"] == user.username);

          if (docData.isSingle) {
            filteredData = [filteredData[0]];
          }
        }
        console.log(filteredData)

        return filteredData;
      }
    };

    setIsTableLoading(true)
    fetchTableByData().then((response) => {
      setIsTableLoading(false);
      console.log(response);
      setTableData(response);

      if(isLoginCall && !response.length){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Kayıtlı Veri Yok!",
          footer: 'Girdiğiniz numaraya ait veri bulunamadı!'
        });
      }
    });
  }, [docData, user]);

  
  const handleLoginCall = () => setIsLoginCall(true);

  if(isDocLoading)
    return <LoadingSpinner />

  if(!docData)
    return <NotFound />

  return (
      <>
      {
        user.role == RoleTypes.admin && isDatePassed && 
        <div className="w-full text-center p-6 text-2xl font-bold">Tarihi Geçmiş Döküman!</div>
      }
      {
        isTableLoading && <LoadingSpinner isTransparent={user.role != RoleTypes.admin}/>
      }
      {
        user.username && tableData && tableData.length ?
          <ListTable tableData={tableData} />
        : 
        <UserLogin 
            handleLoginCall={handleLoginCall}
            isDocAccessible={isDocAccessible}
            docTitle={docData.title} 
            docDesc={docData.description} 
            docStartDate={docData.startDate.toDate().toLocaleDateString('en-GB')} 
            docEndDate={docData.endDate.toDate().toLocaleDateString('en-GB')}
          />
      }
      </>
  )

  /*return (
    <>
      {
      isDocLoading 
        ? <LoadingSpinner /> 
        : user.username 
          ? (isTableLoading 
            ? <LoadingSpinner /> 
            : docData && tableData && tableData.length 
              ? <ListTable tableData={tableData} />
              : "boş knk")
          :
            docData && (
              <UserLogin 
                isDocAccessible={isDocAccessible}
                docTitle={docData.title} 
                docDesc={docData.description} 
                docStartDate={docData.startDate.toDate().toLocaleDateString('en-GB')} 
                docEndDate={docData.endDate.toDate().toLocaleDateString('en-GB')}
              />
            )
      }
    </>
  );*/
};
export default ListDetail;

import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import { Card } from "flowbite-react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RoleTypes } from "../../RoleTypes";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function List() {

  const itemsPerPage = 5

  const user = useSelector(({ UserSlice }) => UserSlice.user);

  const [allData, setAllData] = useState(null);
  const [activeData, setActiveData] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {

    const fetchDocs = async () => {
      if (user.role !== RoleTypes.admin) {
        return;
      }
  
      const querySnapshot = query(
        collection(firestore, "files"),
        where("owner", "==", user.username)
      );
  
      const querySnapshotResult = await getDocs(querySnapshot)

      const querySnapshotResultSortedDocs = querySnapshotResult.docs.sort((a, b) => b.data().createdAt - a.data().createdAt)
  
      setAllData(querySnapshotResultSortedDocs)

      setActiveData(querySnapshotResultSortedDocs.slice(0, itemsPerPage))

      setPageCount(Math.ceil(querySnapshotResultSortedDocs.length / itemsPerPage))
    };

    fetchDocs();
  }, []);

  useEffect(() => {
    if(!allData)
      return

    const startIndex = (itemsPerPage*(activePage-1))
    const endIndex = startIndex + itemsPerPage

    setActiveData(allData.slice(startIndex, endIndex))
    
  }, [activePage]);

  
  const deleteById = async (id) => {

    console.log(id);
    
    Swal.fire({
      title: "Silmek istediğinize emin misiniz?",
      text: "Bu işlemi geri alamazsın!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet"
    }).then((result) => {
      if (result.isConfirmed) {

        deleteDoc(doc(firestore, "files", id))

        
        const result = allData.filter(i => i.id !== id)
      
        setAllData(result)

        const startIndex = (itemsPerPage*(activePage-1))
        const endIndex = startIndex + itemsPerPage
        setActiveData(result.slice(startIndex, endIndex))
        
        setPageCount(Math.ceil(result.length / itemsPerPage))
      }
    });
   
  };
  const handleCopy = async (copyText) => {
    try {
      await navigator.clipboard.writeText(copyText);
      console.log('Text copied to clipboard:', copyText);
    } catch (error) {
      console.log('Error copying to clipboard:', error);
    }
  };
 
  const getItemProps = (index) => ({
      variant: activePage === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActivePage(index),
  });
 
  const handleNext = () => {
    if (activePage === pageCount) return;
 
    setActivePage(activePage + 1);
  };
 
  const handlePrev = () => {
    if (activePage === 1) return;
 
    setActivePage(activePage - 1);
  };
  return (
    <>
      <h1 className="text-center text-2xl font-bold">List Page</h1>
      <br />
      <Card className="max-w">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <h3 className="text-center text-2xl font-bold">Yüklenen Dosyalar</h3>
        </h5>
        <div className="mt-4">
          {activeData &&
            activeData.map((value,key) => (
              <div key={key} className="grid grid-cols-5 gap-x-2 pt-5 items-center hover:border hover:rounded-xl hover:shadow-lg">
                <Link className="col-span-2 text-lg font-semibold text-center underline" to={value.id}>{value.data().title}</Link>
                <button className="focus:outline-none text-white bg-cyan-400 hover:bg-cyan-700 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5" onClick={() => handleCopy(window.location.href + "/" + value.id) } type="button">
                  Kopyala
                </button>
                <Link className="flex justify-center items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5" to={`/addFile/${value.id}`}>
                  Düzenle
                </Link>
                <button className="mr-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={() => deleteById(value.id) } type="button">Dosya Sil</button>
                <br />
              </div>
            ))}
        </div>
        <p className="text-center font-bold">
          Toplam dosya sayısı
          <h1>{allData && allData.length}</h1>
        </p>
        <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handlePrev}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {
          pageCount && new Array(pageCount).fill(0).map((_, index) => 
            <IconButton key={index} {...getItemProps(index+1)}>{index+1}</IconButton>)
        }
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleNext}
        disabled={activePage === pageCount}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
      </Card>
    </>
  );
}

export default List;

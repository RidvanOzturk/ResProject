import React, { useEffect, useState } from "react";
import {
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { useSelector } from "react-redux";
import { Card } from "flowbite-react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RoleTypes } from "../../RoleTypes";
import { Link, useLocation} from "react-router-dom";
import Swal from "sweetalert2";
function List() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const user = useSelector(({ UserSlice }) => UserSlice.user);
  const date = Date();
  
  useEffect(() => {

    const fetchDocs = async () => {
      if (user.role !== RoleTypes.admin) {
        return;
      }
  
      const querySnapshot = query(
        collection(firestore, "files"),
        where("owner", "==", user.username)
      );
  
      const querySnapshotResult = await getDocs(querySnapshot);
  
      console.log(querySnapshotResult.docs[0]);
      setData(querySnapshotResult.docs);
    };

    fetchDocs();
  }, []);
  
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

        deleteDoc(doc(firestore, "files", id));
      
        const result = data.filter(i => i.id !== id)
        setData(result)
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
  const [active, setActive] = useState(1);
 
  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    });
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
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
          {data &&
            data.map((value,key) => (
              <div className="grid grid-cols-5 gap-x-2 pt-5 items-center hover:border hover:rounded-xl hover:shadow-lg">
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
          <h1>{data && data.length}</h1>
        </p>
        <div className="flex items-center justify-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
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

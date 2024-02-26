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
    const deleteVal = [...data];
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
        deleteVal.splice(id,1)
        setData(deleteVal)
        Swal.fire({
          title: "Silindi!",
          text: "Dosyanız Silindi.",
          icon: "success"
        });
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

  return (
    <>
      <h1 className="text-center text-2xl font-bold">List Page</h1>
      <br />
      <Card className="max-w">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <h3 className="text-center text-2xl font-bold">Yüklenen Dosyalar</h3>
        </h5>
        <p className=" underline font-normal text-gray-700 dark:text-gray-400">
          {data &&
            data.map((value,key) => (
              <>
                <Link to={value.id}>{value.data().title}</Link>
                <button
                  onClick={() =>
                    handleCopy(window.location.href + "/" + value.id)
                  }
                  type="button"
                  className="ml-3 focus:outline-none text-white bg-cyan-400 hover:bg-cyan-700 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  Kopyala
                </button>
                <Link to={`/addFile/${value.id}`}>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                  >
                    Düzenle
                  </button>
                </Link>
                <button onClick={() =>
                    deleteById(value.id)
                  } type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Dosya Sil</button>
                <br />
              </>
            ))}
        </p>
        <p className="text-center font-bold">
          Toplam dosya sayısı
          <h1>{data && data.length}</h1>
        </p>
      </Card>
    </>
  );
}

export default List;

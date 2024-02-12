import React, { useEffect, useState } from 'react';
import { QuerySnapshot, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { firestore } from '../../firebase';
import {useSelector} from "react-redux";

import { RoleTypes } from '../../RoleTypes';
import { Link } from 'react-router-dom';

function List() {

   const [data, setData] = useState(null);
   const user = useSelector(({UserSlice}) => UserSlice.user);
  const date = Date();
  useEffect(() => {


    const fetchDocs = async() => {

      if(user.role !== RoleTypes.admin) {
        return;
      }

        const querySnapshot = query(
                                collection(firestore, "files"), 
                                  where("owner", "==", user.username));
          
        const querySnapshotResult = await getDocs(querySnapshot);

        console.log(querySnapshotResult.docs[0]);
        setData(querySnapshotResult.docs);
    }
    fetchDocs();

  }, [])

  return ( 
    <>
   <h1 className='text-center text-2xl font-bold'>List Page</h1>
   <br/>
      {
        data && data.map((value) =>
          <>
          <Link to={value.id}>{value.data().title}</Link>
          <br/>
          </>
        )
      }
    </>
  );
}

export default List;
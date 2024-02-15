import React, { useEffect, useState } from 'react';
import { QuerySnapshot, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { firestore } from '../../firebase';
import {useSelector} from "react-redux";
import { Card } from 'flowbite-react';
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
   <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
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
import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore, storage } from '../../firebase';
import {useSelector} from "react-redux";

import { RoleTypes } from '../../RoleTypes';

function List() {

  const [data, setData] = useState(null);

   const user = useSelector(({UserSlice}) => UserSlice.user);

  useEffect(() => {

    const fetchDocs = async() => {
      
        let querySnapshot = 
        user.role == RoleTypes.admin 
        ? await getDocs(collection(firestore, "files")) 
        : await getDocs(query(collection(firestore, "files"), where("owner", "==", user.username)));
        
        console.log(querySnapshot.docs);
        setData(querySnapshot.docs);
    }
    fetchDocs();

  }, [])

  return ( 
    <>
   <h5>List Page</h5>
      {
        data && data.map(e =>
          <>
          <h1>{e.data().title}</h1>
          <a href='' ></a>
          </>
        )
      }
    </>
  );
}

export default List;
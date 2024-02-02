import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../../firebase';
import {useSelector} from "react-redux";

import { RoleTypes } from '../../RoleTypes';
import { Link } from 'react-router-dom';

function List() {

   const [data, setData] = useState(null);
   const user = useSelector(({UserSlice}) => UserSlice.user);

  useEffect(() => {

    const fetchDocs = async() => {
    
      console.log(user.role)
      console.log( user.role == RoleTypes.admin )
        let querySnapshot = 
        user.role == RoleTypes.admin 
        ? await getDocs(query(collection(firestore, "files"), where("owner", "==", user.username)))
        : null;
        
        console.log(querySnapshot.docs[0]);
        setData(querySnapshot.docs);
    }
    fetchDocs();
  }, [])

  return ( 
    <>
   <h5>List Page</h5>
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
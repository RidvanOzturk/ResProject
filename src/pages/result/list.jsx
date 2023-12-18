import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";

function List() {

  const [data, setData] = useState(null);

  useEffect(async () => {

    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

  }, [])

  return (
    <>

    </>
  );
}

export default List;
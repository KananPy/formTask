import React, { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { formDataCollection } from '../firebase/firestore';
import Table from '../components/Table/index';




export default function TablePage() {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(formDataCollection);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setData(documents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  


  console.log("my data", data);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      
      if (data.length === 0) {
        await fetchData();
      }
    };

    fetchDataAndSetData();
  }, [data])

  

  return (
    <div>
      <Table data={data}/>
    </div>
  );
}

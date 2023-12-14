import React, { useEffect, useState } from 'react';
import { getDocs, onSnapshot } from 'firebase/firestore';
import { formDataCollection } from '../firebase/firestore';
import Table from '../components/Table/index';
import { debounce } from 'lodash';

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

  const debouncedFetchData = debounce(fetchData, 1000); // Adjust the delay as needed

  useEffect(() => {
    const fetchDataAndSetData = async () => {
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

    fetchDataAndSetData();

    const unsubscribe = onSnapshot(formDataCollection, (querySnapshot) => {
      debouncedFetchData();
    });

    return () => {
      unsubscribe();
    };
  }, []); // Removed 'data' from the dependency array

  return (
    <div>
      <Table data={data} />
    </div>
  );
}

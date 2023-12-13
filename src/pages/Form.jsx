
import React, { useState } from 'react';
import sectorData from '../utils/data.json';
import { formDataCollection } from '../firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
  const [name, setName] = useState('');

  const renderOptions = (options, level = 0) =>
    options.map((sector) => (
      <React.Fragment key={sector.value}>
        <option value={sector.value}>
          {Array(level).fill('\u00a0\u00a0\u00a0\u00a0')}
          {sector.label}
        </option>
        {sector.children && renderOptions(sector.children, level + 1)}
      </React.Fragment>
    ));

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            
            toast.error('Please fill in all required fields');
            return;
          }

        if ( !event.target.elements.agreedToTerms.checked){
            toast.error('Please check the agreement');
            return;
        }
      
        const selectedOptions = [...event.target.elements.sectors.options].filter((opt) => opt.selected);
        const selectedLabels = selectedOptions.map((opt) => opt.label);

        if (selectedOptions.length === 0) {
           
            toast.error('Please select at least one sector');
            return;
          }
      
        const formData = {
          name: event.target.elements.name.value,
          sectors: selectedLabels,
          agreedToTerms: event.target.elements.agreedToTerms.checked,
        };
      
        try {
          const docRef = await addDoc(formDataCollection, formData);
          console.log('Document written with ID: ', docRef.id);
      
          toast.success('Form submitted successfully!', { position: 'top-center', autoClose: 3000 });
          setName('');
          selectedOptions.forEach((opt) => (opt.selected = false));
          
          event.target.elements.agreedToTerms.checked = false;
        } catch (e) {
          console.error('Error adding document: ', e);
          toast.error('Error submitting form. Please try again.', { position: 'top-center', autoClose: 3000 });
        }
      };
      
      

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Sectors:
          <select multiple
            size="5"
            name="sectors"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {renderOptions(sectorData)}
          </select>
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="agreedToTerms" /> Agree to terms
        </label>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Save
        </button>
      </div>
      <ToastContainer/>
    </form>
  );
}

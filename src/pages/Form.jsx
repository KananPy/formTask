import React, { useState } from "react";
import sectorData from "../utils/data.json";
import { formDataCollection } from "../firebase/firestore";
import { addDoc } from "firebase/firestore";
import { toast} from "react-toastify";


export default function Form() {
  const [name, setName] = useState("");

  const renderOptions = (options, level = 0) =>
  options.map((sector) => (
    <React.Fragment key={sector.value}>
      <option value={sector.label}>
        {Array(level).fill("\u00a0\u00a0\u00a0\u00a0")}
        {sector.label}
      </option>
      {sector.children && renderOptions(sector.children, level + 1)}
    </React.Fragment>
  ));
    
    

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!event.target.elements.agreedToTerms.checked) {
      toast.error("Please check the agreement");
      return;
    }

    const selectedOptions = [...event.target.elements.sector.options].filter(
      (opt) => opt.selected
    );
    const selectedValues = selectedOptions.map((opt) => opt.value); 

    console.log("value", selectedValues[0]);

    if (selectedOptions.length === 0 || selectedValues[0] === '') {
      toast.error("Please select at least one sector");
      return;
    }

    const formData = {
      name: event.target.elements.name.value,
      sector: selectedValues,
      agreedToTerms: event.target.elements.agreedToTerms.checked,
    };

    try {
      const docRef = await addDoc(formDataCollection, formData);
      console.log("Document written with ID: ", docRef.id);

      toast.success("Form submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setName("");
      selectedOptions.forEach((opt) => (opt.selected = false));

      event.target.elements.agreedToTerms.checked = false;
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error submitting form. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col m-10">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Name:
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </label>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Sector:
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="sector"
      >
        <option value="">Choose sector</option>
        {renderOptions(sectorData)}
      </select>
    </label>
  </div>

  <div className="mb-4">
    <label className="flex items-center text-gray-700 text-sm font-bold">
      <input className="mr-2 leading-tight" type="checkbox" name="agreedToTerms" />
      <span className="text-sm">Agree to terms</span>
    </label>
  </div>

  <div>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Save
    </button>
  </div>
</form>

  );
}

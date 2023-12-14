import React, { useState } from "react";
import EditModal from "../EditModal/EditModal";
import { doc, deleteDoc } from 'firebase/firestore';
import { formDataCollection } from "../../firebase/firestore";
import { toast} from "react-toastify";
import deleteIcon from "../../icons/delete.svg"
import editBtn from "../../icons/edit.svg"

function Table({ data }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const handleEdit = (item) => {
    setSelectedData(item);
    setShowEditModal(true);
  };

  
  const handleDelete = async (itemId) => {
    try {
      const docRef = doc(formDataCollection, itemId);
      await deleteDoc(docRef);

      toast.success("Data has been deleted succesfully", {
        position: "top-center",
        autoClose: 3000,
      });
      
    } catch (error) {
      toast.error("Please try again!");
      console.error('Error deleting data:', error);
    }
  };

  console.log("what is it?", selectedData);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="relative overflow-x-auto max-h-[600px] overflow-y-scroll shadow-md sm:rounded-lg h-[500px]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Sector
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">
                {item.sector}
              </td>
              <td className="px-6 py-4 space-x-2 flex">
                <img
                  src={editBtn}
                  alt="Edit"
                  onClick={() => handleEdit(item)}
                  className="cursor-pointer h-5 w-5"
                />
                <img
                  src={deleteIcon}
                  alt="Delete"
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer h-5 w-5"
                />
                <EditModal
                  isOpen={showEditModal}
                  isClosed={handleCloseEditModal}
                  data={selectedData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateDoc, doc } from 'firebase/firestore';
import { formDataCollection } from '../../firebase/firestore';
import sectorData from '../../utils/data.json';
import { toast } from "react-toastify";


const EditModal = ({ isOpen, isClosed, data }) => {
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    setEditedData(data);
  }, [isOpen, data]);

  const renderOptions = (options, level = 0) =>
    options.map((sector) => (
      <React.Fragment key={sector.value}>
        <option value={sector.label}>
          {Array(level).fill('\u00a0\u00a0\u00a0\u00a0')}
          {sector.label}
        </option>
        {sector.children && renderOptions(sector.children, level + 1)}
      </React.Fragment>
    ));

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const docRef = doc(formDataCollection, data.id);
    await updateDoc(docRef, editedData);
    toast.success("Data has been updated successfully!", {
      position: "top-center",
      autoClose: 3000,
    });

    isClosed();
  };

  return (
    <Modal show={isOpen} onHide={isClosed} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedData.name || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sector:
          <select
            name="sector"
            value={editedData.sector || ''}
            onChange={handleInputChange}
          >
            {renderOptions(sectorData)}
          </select>
        </label>
        {/* Add more input fields for other properties */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={isClosed}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
       
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;

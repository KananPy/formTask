import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateDoc, doc } from 'firebase/firestore';
import { formDataCollection } from '../../firebase/firestore';


const EditModal = ({ isOpen, isClosed, data }) => {
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    setEditedData(data);
  }, [isOpen, data]);

  const handleInputChange = (e) => {
    
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    
    const docRef = doc(formDataCollection, data.id);
    await updateDoc(docRef, editedData);

    
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

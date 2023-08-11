import { useState } from 'react';
import '../styles/EditModal.scss';

const EditModal = ({ setToggleEdit }) => {

  return (
    <div className="edit-modal-container">
      <button className='edit-modal-close-button' onClick={() => setToggleEdit(false)}> X </button>

      <h3>hello</h3>
    </div>
  );
};

export default EditModal;
import React from 'react';

const DeleteConfirmation = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className="delete-confirmation">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete this item?</p>
      <button onClick={confirmDelete}>Yes</button>
      <button onClick={cancelDelete}>No</button>
    </div>
  );
};

export default DeleteConfirmation;

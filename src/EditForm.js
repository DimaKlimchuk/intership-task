import React, { useState } from 'react';

function EditForm({
  handleSave,
  editFormData,
  handleEditFormChange,
  cancelEdit,
}) {
  return (
    <form onSubmit={handleSave}>
      <input
        type="text"
        name="car"
        disabled={true}
        value={editFormData.car}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="car_model"
        disabled={true}
        value={editFormData.car_model}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="car_vin"
        disabled={true}
        value={editFormData.car_vin}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="car_color"
        value={editFormData.car_color}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="car_model_year"
        disabled={true}
        value={editFormData.car_model_year}
        onChange={handleEditFormChange}
      />
      <input
        type="text"
        name="price"
        value={editFormData.price}
        onChange={handleEditFormChange}
      />
      <input
        type="radio"
        name="availability"
        value="True"
        checked={editFormData.availability}
        onChange={handleEditFormChange}
      />
      <input
        type="radio"
        name="availability"
        value=""
        checked={!editFormData.availability}
        onChange={handleEditFormChange}
      />

      <button type="submit">Save</button>
      <button type="button" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
}

export default EditForm;

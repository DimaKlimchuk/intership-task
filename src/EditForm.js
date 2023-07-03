import React, { useState } from 'react';

function EditForm({
  handleSave,
  editFormData,
  handleEditFormChange,
  cancelEdit,
}) {
  return (
    <form className="edit-car-element" onSubmit={handleSave}>
      <div className="container-form">
        <h2>Edit Car</h2>
        <div className="add-car-item">
          <label>Company:</label>
          <input
            type="text"
            name="car"
            disabled={true}
            value={editFormData.car}
            onChange={handleEditFormChange}
          />
        </div>
        <div className="add-car-item">
          <label>Model:</label>
          <input
            type="text"
            name="car_model"
            disabled={true}
            value={editFormData.car_model}
            onChange={handleEditFormChange}
          />
        </div>
        <div className="add-car-item">
          <label>VIN:</label>
          <input
            type="text"
            name="car_vin"
            disabled={true}
            value={editFormData.car_vin}
            onChange={handleEditFormChange}
          />
        </div>
        <div className="add-car-item">
          <label>Color:</label>
          <input
            type="text"
            name="car_color"
            value={editFormData.car_color}
            onChange={handleEditFormChange}
          />
        </div>
        <div className="add-car-item">
          <label>Year:</label>
          <input
            type="text"
            name="car_model_year"
            disabled={true}
            value={editFormData.car_model_year}
            onChange={handleEditFormChange}
          />
        </div>
        <div className="add-car-item">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={editFormData.price}
            onChange={handleEditFormChange}
          />
        </div>
        <span className="radio-input">
          <label>Availability:</label>
          <div className="options">
            <input
              type="radio"
              name="availability"
              value="True"
              checked={editFormData.availability}
              onChange={handleEditFormChange}
            />
            Yes
            <input
              type="radio"
              name="availability"
              value=""
              checked={!editFormData.availability}
              onChange={handleEditFormChange}
            />
            No
          </div>
        </span>
        <div class="add-car-btn">
          <button className="btn-add" type="submit">
            Save
          </button>
          <button className="btn-cancel" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditForm;

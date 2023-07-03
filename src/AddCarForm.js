import React, { useState } from 'react';

const AddCarForm = ({
  addCarSubmit,
  addFormData,
  inputChangeHandler,
  cancelHandler,
}) => {
  return (
    <form
      className="add-car-element"
      id="add-car-element"
      onSubmit={addCarSubmit}
    >
      <input
        type="text"
        name="car"
        placeholder="Company"
        value={addFormData.car}
        onChange={inputChangeHandler}
        required
      />
      <input
        type="text"
        name="car_model"
        placeholder="Model"
        value={addFormData.car_model}
        onChange={inputChangeHandler}
        required
      />
      <input
        type="text"
        name="car_vin"
        placeholder="VIN"
        value={addFormData.car_vin}
        onChange={inputChangeHandler}
        required
      />
      <input
        type="text"
        name="car_color"
        placeholder="Color"
        value={addFormData.car_color}
        onChange={inputChangeHandler}
        required
      />
      <input
        type="text"
        name="car_model_year"
        placeholder="Year"
        value={addFormData.car_model_year}
        onChange={inputChangeHandler}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={addFormData.price}
        onChange={inputChangeHandler}
        required
      />
      <span className="radio-input">
        <input
          type="radio"
          name="availability"
          value="True"
          onChange={inputChangeHandler}
          required
        />
        Yes
        <input
          type="radio"
          name="availability"
          value="False"
          onChange={inputChangeHandler}
          required
        />
        No
      </span>

      <button type="submit">Add</button>
      <button type="button" onClick={cancelHandler}>
        Cancel
      </button>
    </form>
  );
};

export default AddCarForm;

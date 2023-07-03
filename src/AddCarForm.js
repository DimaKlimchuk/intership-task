import React from 'react';

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
      <div className="container-form">
        <h2>Add New Car</h2>
        <div className="add-car-item">
          <label>Company:</label>
          <input
            type="text"
            name="car"
            placeholder="Subaru"
            value={addFormData.car}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="add-car-item">
          <label>Model:</label>
          <input
            type="text"
            name="car_model"
            placeholder="Impreza"
            value={addFormData.car_model}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="add-car-item">
          <label>VIN:</label>
          <input
            type="text"
            name="car_vin"
            placeholder="2V4RW3D17AR344433"
            value={addFormData.car_vin}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="add-car-item">
          <label>Color:</label>
          <input
            type="text"
            name="car_color"
            placeholder="Aquamarine"
            value={addFormData.car_color}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="add-car-item">
          <label>Year:</label>
          <input
            type="text"
            name="car_model_year"
            placeholder="2004"
            value={addFormData.car_model_year}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="add-car-item">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            placeholder="1889.43"
            value={addFormData.price}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <span className="radio-input">
          <label>Availability:</label>
          <div className="options">
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
          </div>
        </span>
        <div class="add-car-btn">
          <button className="btn-add" type="submit">
            Add
          </button>
          <button className="btn-cancel" type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCarForm;

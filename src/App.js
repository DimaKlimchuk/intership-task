import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const URL = 'https://myfakeapi.com/api/cars/';

const getDataFromLS = () => {
  const data = localStorage.getItem('cars');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const backdrop = document.getElementById('backdrop');
  const addCarForm = document.getElementById('add-car-element');
  const uniqueId = useId();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [addFormData, setAddFormData] = useState({
    id: 0,
    car: '',
    car_model: '',
    car_vin: '',
    car_color: '',
    car_model_year: '',
    price: '',
    availability: false,
  });
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: 0,
    car: '',
    car_model: '',
    car_vin: '',
    car_color: '',
    car_model_year: '',
    price: '',
    availability: false,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('cars'));
    if (storedData) {
      setData(storedData);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = () => {
    axios.get(URL).then((response) => {
      setData(response.data.cars);
      localStorage.setItem('cars', JSON.stringify(response.data.cars));
    });
  };

  if (!data) return null;

  getDataFromLS();
  const cars = [...data].filter((item) => {
    return search.toLowerCase() === ''
      ? item
      : item.car_model.toLowerCase().includes(search);
  });
  const addNewElement = (newData) => {
    setData([...data, newData]);
    const updatedData = [...data, newData];
    localStorage.setItem('cars', JSON.stringify(updatedData));
  };

  const cancelHandler = () => {
    const backdrop = document.getElementById('backdrop');
    const addCarForm = document.getElementById('add-car-element');
    const availabilityRadioButtons = document.getElementsByName('availability');

    availabilityRadioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
    setAddFormData({
      id: 0,
      car: '',
      car_model: '',
      car_vin: '',
      car_color: '',
      car_model_year: '',
      price: '',
      availability: '',
    });
    addCarForm.style.display = 'none';
    backdrop.style.display = 'none';
  };

  const addCarHandler = () => {
    const addCarForm = document.getElementById('add-car-element');
    const backdrop = document.getElementById('backdrop');
    console.log(addCarForm);
    addCarForm.style.display = 'block';
    backdrop.style.display = 'block';
    backdrop.addEventListener('click', () => cancelHandler());
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const fieldValue = capitalizeFirstLetter(e.target.value);

    const newFormData = { ...addFormData };
    newFormData['id'] = uniqueId;

    if (fieldName === 'availability') {
      newFormData[fieldName] = fieldValue === 'True';
    } else {
      newFormData[fieldName] = fieldValue;
    }
    setAddFormData(newFormData);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const addCarSubmit = (e) => {
    e.preventDefault();

    const newCar = {
      id: addFormData.id,
      car: addFormData.car,
      car_model: addFormData.car_model,
      car_vin: addFormData.car_vin.toUpperCase(),
      car_color: addFormData.car_color,
      car_model_year: +addFormData.car_model_year,
      price: `$${addFormData.price}`,
      availability: addFormData.availability,
    };
    addNewElement(newCar);
    setAddFormData({
      id: 0,
      car: '',
      car_model: '',
      car_vin: '',
      car_color: '',
      car_model_year: '',
      price: '',
      availability: false,
    });
    e.target.reset();
    addCarForm.style.display = 'none';
    backdrop.style.display = 'none';
  };

  const recordsPerPage = 50;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = cars.slice(firstIndex, lastIndex);
  const npage = Math.ceil(cars.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMenuToggle = (itemId) => {
    setShowMenu((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId], // Змінюємо стан меню для конкретного елемента
    }));
  };

  const handleDelete = (itemId) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(itemId);
  };

  const confirmDelete = () => {
    setData((prevData) => prevData.filter((item) => item.id !== itemToDelete));
    setShowDeleteConfirmation(false);
    const updatedData = data.filter((item) => item.id !== itemToDelete);
    localStorage.setItem('cars', JSON.stringify(updatedData));
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (itemId) => {
    setItemToEdit(itemId);
    const item = data.find((item) => item.id === itemId);
    setEditFormData(item);
  };

  const handleEditFormChange = (e) => {
    if (e.target.name === 'availability') {
      console.log({ [e.target.name]: Boolean(e.target.value) });
      setEditFormData((prevState) => ({
        ...prevState,
        [e.target.name]: Boolean(e.target.value),
      }));
    }

    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedData = data.map((item) => {
      if (item.id === editFormData.id) {
        return editFormData;
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem('cars', JSON.stringify(updatedData));
    setItemToEdit(null);
    setEditFormData({
      id: 0,
      car: '',
      car_model: '',
      car_vin: '',
      car_color: '',
      car_model_year: '',
      price: '',
      availability: false,
    });
  };

  const cancelEdit = () => {
    setItemToEdit(null);
    setEditFormData({
      id: 0,
      car: '',
      car_model: '',
      car_vin: '',
      car_color: '',
      car_model_year: '',
      price: '',
      availability: false,
    });
  };

  return (
    <div className="App">
      <div className="backdrop" id="backdrop"></div>
      <div className="header">
        <div className="search">
          <input
            type="text"
            placeholder="Search model"
            onChange={handleSearchChange}
          />
        </div>
        <button type="button" onClick={addCarHandler}>
          Add Car
        </button>
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
      </div>
      <table>
        <thead>
          <th>Company</th>
          <th>Model</th>
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Price</th>
          <th>Availability</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item.id}>
              <td>{item.car}</td>
              <td>{item.car_model}</td>
              <td>{item.car_vin}</td>
              <td>{item.car_color}</td>
              <td>{item.car_model_year}</td>
              <td>{item.price}</td>
              <td className="availability">
                {item.availability ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                ) : (
                  <FontAwesomeIcon icon={faXmark} style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <button type="button" onClick={() => handleMenuToggle(item.id)}>
                  <span className="dropdown">
                    Choose an Action
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ color: 'blue', marginLeft: '0.2rem' }}
                    />
                  </span>
                </button>
                {showMenu[item.id] && (
                  <div>
                    <div className="menu">
                      <ul>
                        <li onClick={() => handleEdit(item.id)}>Edit</li>
                        <li onClick={() => handleDelete(item.id)}>Delete</li>
                      </ul>
                    </div>
                    {item.id === itemToEdit && (
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
                        {/* ... */}
                        <button type="submit">Save</button>
                        <button type="button" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </form>
                    )}
                    <div className="delete-container">
                      {showDeleteConfirmation && (
                        <div className="delete-confirmation">
                          <h3>Підтвердіть видалення</h3>
                          <p>Ви впевнені, що хочете видалити цей елемент?</p>
                          <button onClick={confirmDelete}>Так</button>
                          <button onClick={cancelDelete}>Ні</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pages">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((number, index) => (
            <li
              className={`page-item ${currentPage === number ? 'active' : ''}`}
              key={index}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => changeCurrentPage(number)}
              >
                {number}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

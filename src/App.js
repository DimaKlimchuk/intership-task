import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import CarTable from './CarTable';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import AddCarForm from './AddCarForm';

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

  const uniqueId = uuid();
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
  const [isEditing, setIsEditing] = useState(false);
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
      : item.car_model.toLowerCase().includes(search.toLowerCase());
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
      [itemId]: !prevState[itemId],
    }));
  };

  const cancelDelete = () => {
    setShowMenu(false);
    setShowDeleteConfirmation(false);
    backdrop.style.display = 'none';
  };

  const handleDelete = (itemId) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(itemId);
    backdrop.style.display = 'block';
    backdrop.addEventListener('click', () => cancelDelete(itemId));
  };

  const confirmDelete = () => {
    setData((prevData) => prevData.filter((item) => item.id !== itemToDelete));
    setShowDeleteConfirmation(false);
    const updatedData = data.filter((item) => item.id !== itemToDelete);
    localStorage.setItem('cars', JSON.stringify(updatedData));
    backdrop.style.display = 'none';
  };

  const cancelEdit = () => {
    setShowMenu(false);
    backdrop.style.display = 'none';
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

  const handleEdit = (itemId) => {
    setIsEditing(true);
    setItemToEdit(itemId);
    const item = data.find((item) => item.id === itemId);
    setEditFormData(item);
    console.log(isEditing);
    backdrop.style.display = 'block';
    backdrop.addEventListener('click', () => cancelEdit());
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
    setShowMenu(false);
    backdrop.style.display = 'none';
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

  return (
    <div className="App">
      <div className="backdrop" id="backdrop"></div>
      <div className="header">
        <SearchBar handleSearchChange={handleSearchChange} />
        <button type="button" className="button" onClick={addCarHandler}>
          Add Car
        </button>
        <AddCarForm
          addCarSubmit={addCarSubmit}
          addFormData={addFormData}
          inputChangeHandler={inputChangeHandler}
          cancelHandler={cancelHandler}
        />
      </div>
      <CarTable
        records={records}
        showMenu={showMenu}
        handleDelete={handleDelete}
        handleMenuToggle={handleMenuToggle}
        handleEdit={handleEdit}
        itemToEdit={itemToEdit}
        showDeleteConfirmation={showDeleteConfirmation}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
        handleSave={handleSave}
        editFormData={editFormData}
        handleEditFormChange={handleEditFormChange}
        cancelEdit={cancelEdit}
        isEditing={isEditing}
      />
      <Pagination
        numbers={numbers}
        currentPage={currentPage}
        prePage={prePage}
        changeCurrentPage={changeCurrentPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default App;

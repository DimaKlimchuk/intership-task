import axios from 'axios';
import React from 'react';
import { useState } from 'react';
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

function App() {
  const backdrop = document.getElementById('backdrop');
  const addCarForm = document.getElementById('add-car-element');
  const [data, setData] = useState(null);
  const [upData, setUpData] = useState([]);
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

  React.useEffect(() => {
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
    // Оновлюємо стан компонента, додаючи новий елемент до існуючих даних
    setData([...data, newData]);
    // Зберігаємо оновлені дані у Local Storage
    const updatedData = [...data, newData];
    localStorage.setItem('cars', JSON.stringify(updatedData));
  };

  const EditHandler = () => {
    console.log('edit');
  };

  const DeleteHandler = () => {
    console.log('delete');
  };

  const DropdownHandler = () => {
    const dropdownList = document.getElementById('dropdown-list');
    dropdownList.classList.toggle('visible');
  };

  const cancelHandler = () => {
    addCarForm.style.display = 'none';
    backdrop.style.display = 'none';
  };

  const addCarHandler = () => {
    const addCarForm = document.getElementById('add-car-element');
    console.log(addCarForm);
    addCarForm.style.display = 'block';
    backdrop.style.display = 'block';
    backdrop.addEventListener('click', () => cancelHandler());
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData['id'] = data.length + 1;
    if (fieldName === 'availability') {
    }
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
    console.log(fieldName);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Скидаємо поточну сторінку до першої при зміні пошуку
  };

  const addCarSubmit = (e) => {
    e.preventDefault();

    const newCar = {
      id: addFormData.id,
      car: addFormData.car,
      car_model: addFormData.car_model,
      car_vin: addFormData.car_vin,
      car_color: addFormData.car_color,
      car_model_year: +addFormData.car_model_year,
      price: `$${addFormData.price}`,
      availability: false,
    };
    addNewElement(newCar);
    console.log(cars);
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
            onChange={inputChangeHandler}
          />
          <input
            type="text"
            name="car_model"
            placeholder="Model"
            onChange={inputChangeHandler}
          />
          <input
            type="text"
            name="car_vin"
            placeholder="VIN"
            onChange={inputChangeHandler}
          />
          <input
            type="text"
            name="car_color"
            placeholder="Color"
            onChange={inputChangeHandler}
          />
          <input
            type="text"
            name="car_model_year"
            placeholder="Year"
            onChange={inputChangeHandler}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            onChange={inputChangeHandler}
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability(Yes/No)"
          />
          <button type="submit">Add</button>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
      </div>
      <table>
        <thead>
          <th>ID</th>
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
              <td>{item.id}</td>
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
                <button type="button" onClick={DropdownHandler}>
                  <span className="dropdown">
                    Choose an Action
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ color: 'blue', marginLeft: '0.2rem' }}
                    />
                  </span>
                </button>
                <div className="dropdown-list" id="dropdown-list">
                  <button type="button" onClick={EditHandler}>
                    Edit
                  </button>

                  <button type="button" onClick={DeleteHandler}>
                    Delete
                  </button>
                </div>
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

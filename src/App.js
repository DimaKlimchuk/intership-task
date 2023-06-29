import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const URL = 'https://myfakeapi.com/api/cars/';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(URL).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) return null;
  const cars = [...data.cars];

  console.log(cars);
  return (
    <div className="App">
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
          {cars.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.car}</td>
              <td>{item.car_model}</td>
              <td>{item.car_color}</td>
              <td>{item.car_model_year}</td>
              <td>{item.car_vin}</td>
              <td>{item.price}</td>
              <td className="availability">
                {item.availability ? (
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                ) : (
                  <FontAwesomeIcon icon={faXmark} style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <select>
                  <option>--Please choose an action--</option>
                  <option>Edit</option>
                  <option>Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

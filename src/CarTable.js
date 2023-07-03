import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EditForm from './EditForm';

function CarTable({
  records,
  showMenu,
  handleDelete,
  handleMenuToggle,
  handleEdit,
  itemToEdit,
  showDeleteConfirmation,
  confirmDelete,
  cancelDelete,
  handleSave,
  editFormData,
  handleEditFormChange,
  cancelEdit,
}) {
  return (
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
                    <EditForm
                      handleSave={handleSave}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      cancelEdit={cancelEdit}
                    />
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
  );
}

export default CarTable;

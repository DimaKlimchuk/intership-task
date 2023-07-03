import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronDown,
  faXmark,
  faTrash,
  faPen,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

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
  isEditing,
}) {
  return (
    <table class="styled-table">
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
              <button
                type="button"
                className="button-action"
                onClick={() => handleMenuToggle(item.id)}
              >
                <span className="dropdown">
                  Choose an Action
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ color: 'blue', marginLeft: '0.4rem' }}
                  />
                </span>
              </button>
              {showMenu[item.id] && (
                <div>
                  <div className="menu">
                    <ul>
                      <li
                        className="action-btn"
                        onClick={() => handleEdit(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ color: '#009879', marginRight: '0.3rem' }}
                        />
                        Edit
                      </li>
                      <li
                        className="action-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        {' '}
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: 'red', marginRight: '0.3rem' }}
                        />
                        Delete
                      </li>
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
                        <h3>Confirm the deletion</h3>
                        <p>Are you sure you want to delete this item?</p>
                        <div class="add-car-btn">
                          <button className="btn-add" onClick={confirmDelete}>
                            Yes
                          </button>
                          <button className="btn-cancel" onClick={cancelDelete}>
                            No
                          </button>
                        </div>
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

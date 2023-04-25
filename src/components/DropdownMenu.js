import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from '../styles/DropdownMenu.module.css'

import { useHistory } from "react-router";

// Changes the icon for the dropdown
const editIcon = React.forwardRef(({ onClick }, ref) => (
  <i
    className={`${styles.DropdownIcon} fa-regular fa-pen-to-square`}
    ref={ref}
    aria-label="dropdown image"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// Dropdown for handeling edit and delete of posts, passed down as props
export const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={editIcon} aria-label="toggle dropdown" />

      <Dropdown.Menu className={`text-center ${styles.Dropdown}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          aria-label="edit"
          onClick={handleEdit}>Edit</Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          aria-label="delete"
          onClick={handleDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Dropdown for handeling edit of profile
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className='ml-auto' drop="down">
      <Dropdown.Toggle as={editIcon} aria-label="toggle dropdown" />
      <Dropdown.Menu className={`text-center ${styles.Dropdown}`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" />
          Edit profile
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          Update name
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from '../styles/DropdownMenu.module.css'
import { useHistory } from "react-router";

// Changes the icon to be 3 dots
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className={`${styles.DropdownIcon} fas fa-ellipsis-v`}
        ref={ref}
        aria-label="dropdown image"
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

// Dropdown for handeling edit and delete of posts, passed down as props
export const DropdownMenu = ( { handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} aria-label="toggle dropdown" />

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
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={ThreeDots} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" /> edit profile
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" />
            change username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
            change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
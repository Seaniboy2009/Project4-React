import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from '../styles/DropdownMenu.module.css'

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

// Dropdown for handeling edit and delete, passed down as props
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
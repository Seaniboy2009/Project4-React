import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from '../styles/DropdownMenu.module.css'


const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <a
        className={`${styles.DropdownIcon} fas fa-ellipsis-v`}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const DropdownMenu = () => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu className={`text-center ${styles.Dropdown}`}>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="edit"
                    onClick={() => { }}>Edit</Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    aria-label="delete"
                    onClick={() => { }}>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
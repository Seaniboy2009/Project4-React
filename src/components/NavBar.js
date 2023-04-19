import React from 'react';
import styles from '../styles/NavBar.module.css';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import useClickOutsideArea from '../hooks/useClickOutsideArea';
import axios from 'axios';

import { NavLink } from 'react-router-dom';
import { useSetCurrentUser, useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    // Custom hook to get the signed in user
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()

    // Custom hook to detect if the navbar has been clicked off or
    // a navlink has been clicked, this will then close/hide
    const { expanded, setExpanded, ref } = useClickOutsideArea();

    const handleSignOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (error) {

        }
    };

    const loggedIn = (
        <>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="users page"
                to='/users'>
                <i className="fa-solid fa-person-walking" /> Users
            </NavLink>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="liked posts page"
                name="dropdown"
                to='/liked'>
                <i className="fa-solid fa-star" /> Liked posts
            </NavLink>
            <NavDropdown
                className={styles.NavDropdown}
                name="dropdown"
                title={`Logged in as: ${currentUser?.username}`}
                id="dropdown"
            >
                <NavDropdown.Item className={styles.NavDropdownItem}>
                    <NavLink
                        className={styles.Link}
                        activeClassName={styles.Active}
                        aria-label="create a post"
                        to='/posts/create'>
                        <i className="fa-solid fa-plus" /> Create Post
                    </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item className={styles.NavDropdownItem}>
                    <NavLink
                        className={styles.Link}
                        activeClassName={styles.Active}
                        aria-label="my posts page"
                        to={`/profiles/${currentUser?.profile_id}`}>
                        <i className="fa-solid fa-plus" /> Account
                    </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item className={styles.NavDropdownItem}>
                    <NavLink
                        className={styles.Link}
                        onClick={handleSignOut}
                        aria-label="sign out page"
                        to='/'>
                        <i className="fa-solid fa-arrow-right-from-bracket" /> Sign out
                    </NavLink>
                </NavDropdown.Item>
            </NavDropdown>
        </>
    )

    const loggedOut = (
        <>
            <NavLink
                className={styles.Link}
                aria-label="sign up page"
                activeClassName={styles.Active} to='/signup'>
                <i className="fa-solid fa-user-plus" /> Sign up
            </NavLink>
            <NavLink
                className={styles.Link}
                aria-label="sign in page"
                activeClassName={styles.Active} to='/signin'>
                <i className="fa-solid fa-arrow-right-to-bracket" /> Sign in
            </NavLink>
        </>
    )

    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top' expanded={expanded}>
            <Container>
                <NavLink exact className={styles.Brand} to='/'>As Advertised</NavLink>
                <Navbar.Toggle
                    className={styles.Toggle}
                    aria-controls="basic-navbar-nav"
                    aria-label="navbar toggle for mobile"
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink exact className={styles.Link} activeClassName={styles.Active} to='/'><i className="fa-brands fa-wpexplorer fa-lg"></i> Explore</NavLink>
                        {currentUser ? loggedIn : loggedOut}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
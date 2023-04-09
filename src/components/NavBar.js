import React from 'react';
import styles from '../styles/NavBar.module.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSetCurrentUser, useCurrentUser } from '../contexts/CurrentUserContext';
import useClickOutsideArea from '../hooks/useClickOutsideArea';
import axios from 'axios';

const NavBar = () => {
    // Custom hook to get the signed in user
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()

    // Custom hook to detect if the navbar has been clicked off or
    // a navlink has been clicked, this will then close/hide
    const { expanded, setExpanded, ref } = useClickOutsideArea();

    const handleSignOut = async () => {
        try {
            await axios.post("https://project-5-api.herokuapp.com/dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (error) {
            console.log(error);
            console.log(error.response?.data)
        }
    };

    const loggedIn = (
        <>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="followed page"
                to='/followed'>
                <i class="fa-solid fa-person-walking" /> Followed
            </NavLink>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="liked posts page"
                to='/liked'>
                <i class="fa-solid fa-star" /> Liked posts
            </NavLink>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="create a post"
                to='/post/create'>
                <i className="fa-solid fa-plus" /> Create Post
            </NavLink>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="my posts page"
                to='/myposts'>
                <i className="fa-solid fa-plus" /> My posts
            </NavLink>
            <NavLink
                className={styles.Link}
                activeClassName={styles.Active}
                aria-label="account page"
                to='/account'>
                <i className="fa-solid fa-user" /> Account: {currentUser?.username}
            </NavLink>
            <NavLink
                className={styles.Link}
                onClick={handleSignOut}
                aria-label="sign out page"
                activeClassName={styles.Active}
                to='/signout'>
                <i className="fa-solid fa-arrow-right-from-bracket" /> Sign out
            </NavLink>
        </>
    )

    const loggedOut = (
        <>
            <NavLink
                className={styles.Link}
                aria-label="sign up page"
                activeClassName={styles.Active} to='/signup'>
                <i className="fa-solid fa-user-plus"></i> Sign up
            </NavLink>
            <NavLink
                className={styles.Link}
                aria-label="sign in page"
                activeClassName={styles.Active} to='/signin'>
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in
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
                        <NavLink exact className={styles.Link} activeClassName={styles.Active} to='/'><i class="fa-brands fa-wpexplorer fa-lg"></i> Explore</NavLink>
                        {currentUser ? loggedIn : loggedOut}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
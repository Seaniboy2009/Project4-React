import React from 'react';
import styles from '../styles/NavBar.module.css';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSignedInUser } from '../contexts/SignedInUserContext';

const NavBar = () => {
    // Custom hook to get the signed in user
    const signedInUser = useSignedInUser()

    return (
        <Navbar className={styles.NavBar} bg="light" expand="lg" fixed='top'>
            <Navbar.Brand href="#home">As Advertised</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink exact className={styles.Link} activeClassName={styles.Active} to='/'><i className="fa-solid fa-house"></i> Home</NavLink>
                    {/* Check if the user is signed in, if so display signout and account, if not signed in, display sign up and sign in  */}
                    {signedInUser ?
                        (
                            <>
                            <NavLink className={styles.Link} activeClassName={styles.Active} to='/signout'><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out</NavLink>
                            <NavLink className={styles.Link} activeClassName={styles.Active} to='/account'><i className="fa-solid fa-user"></i> Account: {signedInUser.username}</NavLink>
                            </>
                        ) :
                        (
                            <>
                            <NavLink className={styles.Link} activeClassName={styles.Active} to='/signup'><i className="fa-solid fa-user-plus"></i> Sign up</NavLink>
                            <NavLink className={styles.Link} activeClassName={styles.Active} to='/signin'><i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in</NavLink>
                            </>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
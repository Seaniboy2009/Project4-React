import React from 'react';
import styles from '../styles/NavBar.module.css';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSignedInUser } from '../contexts/SignedInUserContext';
import useClickOutsideArea from '../hooks/useClickOutsideArea';

const NavBar = () => {
    // Custom hook to get the signed in user
    const signedInUser = useSignedInUser()
    const { expanded, setExpanded, ref } = useClickOutsideArea();

    return (
        <Navbar className={styles.NavBar} bg="light" expand="lg" fixed='top' expanded={expanded}>
            <Navbar.Brand className={styles.Brand} href="#home">As Advertised</Navbar.Brand>
            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                ref={ref}
                onClick={() => setExpanded(!expanded)}
            />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink exact className={styles.Link} activeClassName={styles.Active} to='/'><i className="fa-solid fa-house"></i> Home</NavLink>
                    <NavLink exact className={styles.Link} activeClassName={styles.Active} to='/posts'><i class="fa-brands fa-wpexplorer fa-lg"></i> Explore</NavLink>
                    {/* Check if the user is signed in, if so display signout and account, if not signed in, display sign up and sign in  */}
                    {signedInUser ?
                        (
                            <>
                                <NavLink
                                    className={styles.Link}
                                    activeClassName={styles.Active} to='/post/create'>
                                    <i className="fa-solid fa-plus"></i> Create Post
                                </NavLink>
                                <NavLink
                                    className={styles.Link}
                                    activeClassName={styles.Active} to='/account'>
                                    <i className="fa-solid fa-user"></i> Account: {signedInUser.username}
                                </NavLink>
                                <NavLink
                                    className={styles.Link}
                                    activeClassName={styles.Active} to='/signout'>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out
                                </NavLink>
                            </>
                        ) :
                        (
                            <>
                                <NavLink
                                    className={styles.Link}
                                    activeClassName={styles.Active} to='/signup'>
                                    <i className="fa-solid fa-user-plus"></i> Sign up
                                </NavLink>
                                <NavLink
                                    className={styles.Link}
                                    activeClassName={styles.Active} to='/signin'>
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in
                                </NavLink>
                            </>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
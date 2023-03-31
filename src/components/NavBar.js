import React from 'react'
import styles from '../styles/NavBar.module.css'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} bg="light" expand="lg" fixed='top'>
            <Navbar.Brand href="#home">As Advertised</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink className={styles.Link} to='/'>Home</NavLink>
                    <NavLink className={styles.Link} to='/signin'>Sign in</NavLink>
                    <NavLink className={styles.Link} to='/signup'>Sign up</NavLink>
                    <NavLink className={styles.Link} to='/signout'>Sign out</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
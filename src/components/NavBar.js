import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" fixed='top'>
            <Navbar.Brand href="#home">As Advertised</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My posts</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Account settings</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#home">Liked</Nav.Link>
                    <Nav.Link href="#home">Followed</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
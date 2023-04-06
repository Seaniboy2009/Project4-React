import React from 'react'
import styles from '../styles/Footer.module.css'
import { Navbar, Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar className={styles.Footer} expand="lg" fixed='bottom'>
            <Container>
                <p className='text-center'>Copyright</p>
            </Container>
        </Navbar>
    )
}

export default Footer
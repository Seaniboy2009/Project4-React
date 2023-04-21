import React from 'react'
import styles from '../styles/Footer.module.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const Footer = () => {
    return (
        <Navbar className={styles.Footer} expand="lg" fixed='bottom'>
            <Container>
                <p className='text-center'>Copyright: As advertised</p>
            </Container>
        </Navbar>
    )
}

export default Footer
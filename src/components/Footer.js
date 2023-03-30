import React from 'react'
import styles from '../styles/Footer.module.css'
import { Navbar } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar className={styles.Footer} bg="light" expand="lg" fixed='bottom'>
            <p className='text-center'>Copyright</p>
        </Navbar>
    )
}

export default Footer
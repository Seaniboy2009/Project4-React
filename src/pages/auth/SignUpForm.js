import React, { useState } from 'react'
import btnstyles from '../../styles/Button.module.css'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import styles from '../../styles/SignInUp.module.css'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SignUpForm = () => {
    const [formData, setFormData] = useState({ username: '', password1: '', password2: '' });
    const { username, password1, password2 } = formData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://project-5-api.herokuapp.com/dj-rest-auth/registration/", formData);
            history.push("/signin");
        } catch (errors) {
            setErrors(errors.response?.data)
        }
    }

    return (
        <>
            <Row className={`${styles.Welcome} justify-content-md-center`}>
                <Col xs={8}>
                    <span>Welcome to as advertised. <br /> Where we compare advertised products to the actual product</span>
                    <br />
                </Col>
            </Row>
            <Row className={`${styles.Container} justify-content-md-center`}>
                <Col xs={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name='username'
                                value={username}
                                onChange={handleChange}
                            />
                            {errors.name?.map((message, index) =>
                                <Alert key={index}>{message}</Alert>
                            )}
                        </Form.Group>
                        <Form.Group controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name='password1'
                                value={password1}
                                onChange={handleChange}
                            />
                            {errors.password1?.map((message, index) =>
                                <Alert key={index}>{message}</Alert>
                            )}
                        </Form.Group>
                        <Form.Group controlId="password2">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name='password2'
                                value={password2}
                                onChange={handleChange}
                            />
                            {errors.password2?.map((message, index) =>
                                <Alert key={index}>{message}</Alert>
                            )}
                        </Form.Group>
                        <Button className={`${btnstyles.Full} ${btnstyles.Main}`} type="submit">
                            Sign up
                        </Button>
                        {errors.non_field_errors?.map((message, index) =>
                            <Alert key={index}>{message}</Alert>
                        )}
                    </Form>
                </Col>
            </Row>
        </>

    )
}

export default SignUpForm
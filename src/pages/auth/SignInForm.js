import React, { useState } from 'react'
import btnStyles from '../../styles/Button.module.css'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import styles from '../../styles/SignInUp.module.css'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

const SignInForm = () => {
    // Custom hook to set the signed in user
    const setCurrentUser = useSetCurrentUser()

    // Data that will be sent to the API
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const { username, password } = formData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('Default message')

    // Handle the changes made on the form
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    // Send the formdata to the API and send user to homepage
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('https://project-5-api.herokuapp.com/dj-rest-auth/login/', formData)
            setCurrentUser(data.user)
            history.push("/");
        } catch (errors) {
            setErrors(errors.response?.data)
            setMessage(errors.response?.data.non_field_errors)
            setShow(true)
        }
    }
    return (
        <>
            <Row className="justify-content-md-center">
                {show ? (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <span>
                            {message}
                        </span>
                    </Alert>
                ) : (null)}
            </Row>
            <Row className={`${styles.Welcome} justify-content-md-center`}>
                <Col xs={8}>
                <span>Welcome to as advertised. <br /> Where we compare advertised products to the actual product</span>
                <br />
                </Col>
            </Row>
            <Row className={`${styles.Container} justify-content-md-center`}>
                <Col xs={5}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Name (Case sensitive)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name='username'
                                value={username}
                                onChange={handleChange}
                            />
                            {errors.username?.map((message, index) =>
                                <Alert key={index}>{message}</Alert>
                            )}
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={password}
                                onChange={handleChange}
                            />
                            {errors.password?.map((message, index) =>
                                <Alert key={index}>{message}</Alert>
                            )}
                        </Form.Group>
                        <Button className={`${btnStyles.Full} ${btnStyles.Main}`} type="submit">
                            Sign in
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

export default SignInForm
import React, { useState } from 'react'
import btnStyles from '../../styles/Button.module.css'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSetSignedInUser } from '../../contexts/SignedInUserContext';

const SignInForm = () => {
    // Custom hook to set the signed in user
    const setSignedInUser = useSetSignedInUser()

    // Data that will be sent to the API
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const {username, password} = formData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

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
            setSignedInUser(data.user)
            history.push("/");
        } catch (errors) {
            setErrors(errors.response?.data)
        }
    }
    return (
        <Row className="justify-content-md-center">
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
    )
}

export default SignInForm
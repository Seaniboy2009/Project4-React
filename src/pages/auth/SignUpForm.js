import React from 'react'
import btnstyles from '../../styles/Button.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'

const SignUpForm = () => {
    return (
        <Row className="justify-content-md-center">
            <Col xs={6}>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name='name'
                        />
                    </Form.Group>
                    <Form.Group controlId="password1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name='password1'
                        />
                    </Form.Group>
                    <Form.Group controlId="password2">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name='password2'
                        />
                    </Form.Group>
                    <Button className={`${btnstyles.Full} ${btnstyles.Main}`} type="submit">
                        Sign up
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default SignUpForm
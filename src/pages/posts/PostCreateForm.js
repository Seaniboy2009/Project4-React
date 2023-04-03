import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";

function PostCreateForm() {

    const [errors, setErrors] = useState({});
    const postURL = 'https://res.cloudinary.com/dgj9rjuka/image/upload/v1678359959/media/images/default_post_fr07hq.jpg'

    const textFields = (
        <div className="text-center">
            <Button
                className={`${btnStyles.Full} ${btnStyles.Main}`}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Full} ${btnStyles.Main}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">

                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload"
                            >
                                <Asset
                                    srcAlike={postURL}
                                    srcNotAlike={postURL}
                                    messageAlike='Advert image'
                                    messageNotAlike='Actual product'
                                />
                            </Form.Label>

                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Container}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;
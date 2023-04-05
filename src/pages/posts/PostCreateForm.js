import React, { useState } from "react";
import { Button, Form, Row, Col, Container, Alert, Image } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function PostCreateForm() {

    const postURL = 'https://res.cloudinary.com/dgj9rjuka/image/upload/v1678359959/media/images/default_post_fr07hq.jpg'

    // Data that will be sent to the API
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        franchisor: '',
        content: '',
        advert_image: '',
        reality_image: '',
    });
    const { title, location, franchisor, content, advert_image, reality_image } = formData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    // Handle the changes made on the form
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const handleChangeImageAdvert = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(advert_image);
            setFormData({
                ...formData,
                advert_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleChangeImageReality = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(reality_image);
            setFormData({
                ...formData,
                reality_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group controlId="title">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    name='title'
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="location">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Location"
                    name='location'
                    value={location}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="franchisor">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Franchise"
                    name='franchisor'
                    value={franchisor}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Content"
                    name='content'
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>
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
                    <Container className={`${appStyles.Container} d-flex flex-column justify-content-center`}>
                        <Row>
                            <Col>
                                <Form.Group className="text-center">
                                    {advert_image ? (
                                        <>
                                            <figure>
                                                <Image className={appStyles.Image} src={advert_image} rounded />
                                            </figure>
                                            <div>
                                                <Form.Label
                                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                                    htmlFor="image-upload-advert"
                                                >
                                                    Change the image
                                                </Form.Label>
                                            </div>
                                        </>
                                    ) : (
                                        <Form.Label
                                            className="d-flex justify-content-center"
                                            htmlFor="image-upload-advert"
                                        >
                                            <Asset
                                                src={postURL}
                                                message="Click or tap to upload an image"
                                                alike='true'
                                            />
                                        </Form.Label>
                                    )}

                                    <Form.File
                                        id="image-upload-advert"
                                        accept="image/*"
                                        onChange={handleChangeImageAdvert}
                                    />
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group className="text-center">
                                    {reality_image ? (
                                        <>
                                            <figure>
                                                <Image className={appStyles.Image} src={reality_image} rounded />
                                            </figure>
                                            <div>
                                                <Form.Label
                                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                                    htmlFor="image-upload-reality"
                                                >
                                                    Change the image
                                                </Form.Label>
                                            </div>
                                        </>
                                    ) : (
                                        <Form.Label
                                            className="d-flex justify-content-center"
                                            htmlFor="image-upload-reality"
                                        >
                                            <Asset
                                                src={postURL}
                                                message="Click or tap to upload an image"
                                                style={appStyles.Alike}
                                                notAlike='True'
                                            />
                                        </Form.Label>
                                    )}

                                    <Form.File
                                        id="image-upload-reality"
                                        accept="image/*"
                                        onChange={handleChangeImageReality}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
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
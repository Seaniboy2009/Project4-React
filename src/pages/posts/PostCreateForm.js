import React, { useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from "../../styles/PostCreateEdit.module.css";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {

    const postURL = 'https://res.cloudinary.com/dgj9rjuka/image/upload/v1678359959/media/images/default_post_fr07hq.jpg'
    const advertImageInput = useRef(null)
    const realityImageInput = useRef(null)

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('Default message')

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

    // handle the image change for advert image
    const handleChangeImageAdvert = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(advert_image);
            setFormData({
                ...formData,
                advert_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    // handle the image change for reality image
    const handleChangeImageReality = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(reality_image);
            setFormData({
                ...formData,
                reality_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title)
        formData.append('location', location)
        formData.append('franchisor', franchisor)
        formData.append('content', content)
        formData.append('advert_image', advertImageInput.current.files[0])
        formData.append('reality_image', realityImageInput.current.files[0])
        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch (errors) {
            setErrors(errors.response?.data)
            setMessage('Failed to submit form, please try again')
            setShow(true)
        }
    }

    const formFields = (
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
                {errors.title?.map((message, index) =>
                    <Alert key={index}>{message}</Alert>
                )}
            </Form.Group>
            <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Location"
                    name='location'
                    value={location}
                    onChange={handleChange}
                />
                {errors.location?.map((message, index) =>
                    <Alert key={index}>{message}</Alert>
                )}
            </Form.Group>
            <Form.Group controlId="franchisor">
                <Form.Label>Franchise</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Franchise"
                    name='franchisor'
                    value={franchisor}
                    onChange={handleChange}
                />
                {errors.franchisor?.map((message, index) =>
                    <Alert key={index}>{message}</Alert>
                )}
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
                {errors.content?.map((message, index) =>
                    <Alert key={index}>{message}</Alert>
                )}
            </Form.Group>
            <Button
                className={`${btnStyles.Full} ${btnStyles.Main}`}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button className={`${btnStyles.Full} ${btnStyles.Main}`} type="submit">
                Create
            </Button>
            {errors.advert_image?.map((message, index) =>
                <Alert key={index}>{message}</Alert>
            )}
        </div>
    );

    const imageFields = (
        <>
            <Row>
                <Col>
                    <Form.Group className="text-center">
                        {advert_image ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={advert_image} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Full} ${btnStyles.Main} btn`}
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
                            ref={advertImageInput}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="text-center">
                        {reality_image ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={reality_image} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Full} ${btnStyles.Main} btn`}
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
                                    style={styles.Alike}
                                    notAlike='True'
                                />
                            </Form.Label>
                        )}
                        <Form.File
                            id="image-upload-reality"
                            accept="image/*"
                            onChange={handleChangeImageReality}
                            ref={realityImageInput}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    {show ? (
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <span>
                                {message}
                            </span>
                        </Alert>
                    ) : (null)}
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${styles.Container} d-flex flex-column justify-content-center`}>
                        {imageFields}
                        <div className="d-md-none">{formFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={styles.Container}>
                        {formFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import styles from '../../styles/Post.module.css'

const Post = (props) => {
    const {
        id,
        owner,
        title,
        profile_id,
        profile_image,
        advert_image,
        reality_image,
        location,
        franchisor,
        created_at,
        content, 
    } = props;

    return (
        <div>
            <Card className={styles.Card}>
                <Card.Header>Title: {title}</Card.Header>
                <Row>
                    <Col><Card.Img className={styles.Alike} src={advert_image}></Card.Img></Col>
                    <Col><Card.Img className={styles.NotAlike} src={reality_image}></Card.Img></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col><Card.Text className={styles.AlikeText}>Advert</Card.Text></Col>
                    <Col><Card.Text className={styles.NotAlikeText}>Reality</Card.Text></Col>
                </Row>
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    <Card.Text><p>Content: {content}</p></Card.Text>
                    <Card.Text><p>Location: {location}</p></Card.Text>
                    <Card.Text><p>Franchisor : {franchisor}</p></Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Created: {created_at} : Created by: {owner}</small>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Post
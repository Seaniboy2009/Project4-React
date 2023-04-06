import React from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import styles from '../../styles/Post.module.css';
import { useSignedInUser } from '../../contexts/SignedInUserContext';
import { Link } from 'react-router-dom';

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
        postDetail,
        like_id,
        likes_count,
        comments_count,
    } = props;

    // get the current sign in user
    const signedInUser = useSignedInUser()
    // check if the signed in user is the owner of this post
    const is_owner = signedInUser?.username === owner;

    return (
        <div>
            <Card className={styles.Card}>
                <Card.Header>
                    Title: {title}
                    {is_owner ? (
                        // If the owner is viewing this display the tooltop
                        <OverlayTrigger placement='top' overlay={<Tooltip> You cant like your own post</Tooltip>}>
                            <i class="fa-regular fa-star"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                        // if the user is not the owner allow them to like it
                        <span onClick={() => { }}><i class="fa-regular fa-star"></i> </span>
                    ) : signedInUser ? (
                        <span onClick={() => { }}><i class="fa-regular fa-star"></i> </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                            <i class="fa-regular fa-star"></i>
                        </OverlayTrigger>
                    )}
                    {is_owner && postDetail && '...'}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i class="fa-regular fa-comments"></i>
                    </Link>
                    {comments_count}
                </Card.Header>
                <Row className={styles.Row}>
                    <Col><Card.Img className={styles.Alike} src={advert_image} alt={title}></Card.Img></Col>
                    <Col><Card.Img className={styles.NotAlike} src={reality_image} alt={title}></Card.Img></Col>
                </Row>
                <Row className={styles.Row}>
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
                    <Link to={`/profiles/${profile_id}`}>
                        <small className="text-muted">Created: {created_at} : Created by:  {owner}</small>
                    </Link>
                </Card.Footer>
            </Card>
            <br />
        </div>
    )
}

export default Post
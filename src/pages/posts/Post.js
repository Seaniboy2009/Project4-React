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
        alikes_count,
        not_alikes_count,
    } = props;

    // get the current sign in user
    const signedInUser = useSignedInUser()
    // check if the signed in user is the owner of this post
    const is_owner = signedInUser?.username === owner;
    // compare the alike and not alike votes
    const alike = alikes_count > not_alikes_count;

    return (
        <div>
            <Card className={styles.Card}>
                <Card.Header>
                    <Col>
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

                    </Col>
                    <Col>
                        {/* if this belongs to the sign in user and the post detail page exists then can edit */}
                        {is_owner && postDetail && '...'}
                        {' '}
                        {likes_count}
                        {' '}
                        <Link to={`/posts/${id}`}>
                            <i class="fa-regular fa-comments"></i>
                        </Link>
                        {' '}
                        {comments_count}
                        {' '}
                        {/* display if this is like the add or not */}
                        {alike ? ('alike') : ('not alike')}
                    </Col>

                </Card.Header>
                <Row className={styles.Row}>
                    <Col><Card.Img className={styles.Alike} src={advert_image} alt={title}></Card.Img></Col>
                    <Col><Card.Img className={styles.NotAlike} src={reality_image} alt={title}></Card.Img></Col>
                </Row>
                <Row className={styles.Row}>
                    <Col><Card.Text className={styles.AlikeText}>
                        Advert, Vote alike:
                        {is_owner ? (
                            // If the owner is viewing this display the tooltop
                            <OverlayTrigger placement='top' overlay={<Tooltip> You cant vote on your own post</Tooltip>}>
                                <i class="fa-regular fa-star"></i>
                            </OverlayTrigger>
                        ) : like_id ? (
                            // if the user is not the owner allow them to Vote
                            <span onClick={() => { }}><i class="fa-regular fa-star"></i> </span>
                        ) : signedInUser ? (
                            <span onClick={() => { }}><i class="fa-regular fa-star"></i> </span>
                        ) : (
                            <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                                <i class="fa-regular fa-star"></i>
                            </OverlayTrigger>
                        )}
                    </Card.Text></Col>
                    <Col><Card.Text className={styles.NotAlikeText}>
                        Reality, Vote not alike:
                        {is_owner ? (
                            // If the owner is viewing this display the tooltop
                            <OverlayTrigger placement='top' overlay={<Tooltip> You cant vote on your own post</Tooltip>}>
                                <i class="fa-regular fa-star"></i>
                            </OverlayTrigger>
                        ) : like_id ? (
                            // if the user is not the owner allow them to Vote
                            <span onClick={() => { }}><i class="fa-regular fa-star"></i> </span>
                        ) : signedInUser ? (
                            <span onClick={() => { }}><i class="fa-regular fa-star"></i> </span>
                        ) : (
                            <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                                <i class="fa-regular fa-star"></i>
                            </OverlayTrigger>
                        )}
                    </Card.Text></Col>
                </Row>
                <Card.Body>
                    {content ? (
                        <Card.Text><p>Content: {content}</p></Card.Text>
                    ) : location ? (
                        <Card.Text><p>Location: {location}</p></Card.Text>
                    ) : franchisor ? (
                        <Card.Text><p>Franchisor : {franchisor}</p></Card.Text>
                    ) : (
                        <Card.Text><p>No content</p></Card.Text>
                    )}
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
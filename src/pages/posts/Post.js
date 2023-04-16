import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from '../../styles/Post.module.css';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { DropdownMenu } from '../../components/DropdownMenu'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Post = (props) => {
    const {
        id,
        owner,
        title,
        profile_id,
        advert_image,
        reality_image,
        location,
        franchisor,
        created_at,
        content,
        postDetail,
        likes_count,
        like_id,
        comments_count,
        alikes_count,
        not_alikes_count,
        setPosts,
        alike_id,
        not_alike_id,
        ProfileDetail,
        preview,
    } = props;

    // get the current user
    const currentUser = useCurrentUser();
    // check if the current user is the owner of this post
    const is_owner = currentUser?.username === owner;
    const history = useHistory()

    // handles the edit function
    const handleEdit = () => {
        history.push(`/posts/${id}/edit`)
    }

    // handles the delete function
    const handleDelete = async () => {
        try {
            await axiosReq.delete(`/posts/${id}`)
            history.goBack()
        } catch (error) {
        }
    }

    // handle inital click to like, alike or not alike, takes in the url to create
    // a bool if its the like button, alike button or not alike button
    const handleLikeClick = async ({ url, like, alike, notAlike }) => {
        console.log(url, like, alike, notAlike)
        try {
            const { data } = await axiosRes.post(`/${url}/`, { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? (like ?
                            { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                            : alike ?
                                { ...post, alikes_count: post.alikes_count + 1, alike_id: data.id }
                                : notAlike ?
                                    { ...post, not_alikes_count: post.not_alikes_count + 1, not_alike_id: data.id }
                                    : null
                        )
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    // handle untick click to like, alike or not alike, takes in the url
    // and ID to delete the object from the db
    // a bool if its the like button, alike button or not alike button
    const handleUnlikeClick = async ({ url, urlId, like, alike, notAlike }) => {
        console.log(url, urlId, like, alike, notAlike)
        try {
            await axiosRes.delete(`/${url}/${urlId}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? (like ?
                            { ...post, likes_count: post.likes_count - 1, like_id: null }
                            : alike ?
                                { ...post, alikes_count: post.alikes_count - 1, alike_id: null }
                                : notAlike ?
                                    { ...post, not_alikes_count: post.not_alikes_count - 1, not_alike_id: null }
                                    : null
                        )
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    //  Like button logic
    const likeDetails = (
        <>
            <Link className={styles.Title} to={`/posts/${id}`}>
                Title:&nbsp;{title}&nbsp;
            </Link>
            {is_owner ? (
                // If the owner is viewing this display the tooltop
                <OverlayTrigger placement='top' overlay={<Tooltip> You cant like your own post</Tooltip>}>
                    <i className="fa-regular fa-star"></i>
                </OverlayTrigger>
            ) : like_id ? (
                // The user has already liked and can unlike
                <OverlayTrigger placement='top' overlay={<Tooltip>UnLike</Tooltip>}>
                    <span onClick={() => handleUnlikeClick({ url: 'likes', urlId: like_id, like: true })}>
                        <i className={`${styles.Icon} fa-solid fa-star`} />
                    </span>
                </OverlayTrigger>
            ) : currentUser ? (
                // User has not liked and can like
                <OverlayTrigger placement='top' overlay={<Tooltip>Like</Tooltip>}>
                    <span onClick={() => handleLikeClick({ url: 'likes', like: true })}>
                        <i className="fa-regular fa-star" />
                    </span>
                </OverlayTrigger>
            ) : (
                <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                    <i className="fa-regular fa-star"></i>
                </OverlayTrigger>
            )}
        </>
    );

    //  Alike button logic
    const alikeDetails = (
        <>
            <span>Advert image</span>
            <br />
            <span>Is this like the advert? : </span>
            <br />
            <span>
                {is_owner ? (
                    // The user is the owner so cant vote
                    <OverlayTrigger placement='top' overlay={<Tooltip> You cant vote on your own post</Tooltip>}>
                        <i className="fa-regular fa-thumbs-up" />
                    </OverlayTrigger>
                ) : alike_id ? (
                    // The user has already voted and can unvote
                    <span onClick={() => handleUnlikeClick({ url: 'votealike', urlId: alike_id, alike: true })}>
                        <i className={`${styles.Icon} fa-solid fa-thumbs-up`} />
                        {alikes_count}
                    </span>
                ) : not_alike_id ? (
                    <>
                        <span onClick={() => {
                            handleUnlikeClick({ url: 'votenotalike', urlId: not_alike_id, notAlike: true });
                            handleLikeClick({ url: 'votealike', alike: true });
                        }}>
                            <i className={`${styles.Icon} fa-regular fa-thumbs-up`} />
                            {alikes_count}
                        </span>
                    </>
                ) : currentUser ? (
                    <>
                        <span onClick={() => handleLikeClick({ url: 'votealike', alike: true })}>
                            <i className={`${styles.Icon} fa-regular fa-thumbs-up`} />
                            {alikes_count}
                        </span>
                    </>
                ) : (
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                        <i className="fa-regular fa-thumbs-up" />
                    </OverlayTrigger>
                )}
            </span>
        </>
    );

    // Not Alike button logic
    const notAlikeDetails = (
        <>
            <span>Actual image</span>
            <br />
            <span>Is this not like the advert? : </span>
            <br />
            <span>
                {is_owner ? (
                    // The user is the owner so cant vote
                    <OverlayTrigger placement='top' overlay={<Tooltip> You cant vote on your own post</Tooltip>}>
                        <i className="fa-regular fa-thumbs-down" />
                    </OverlayTrigger>
                ) : not_alike_id ? (
                    // The user has already voted and can unvote
                    <OverlayTrigger placement='top' overlay={<Tooltip>UnVote</Tooltip>}>
                        <span onClick={() => handleUnlikeClick({ url: 'votenotalike', urlId: not_alike_id, notAlike: true })}>
                            <i className={`${styles.Icon} fa-solid fa-thumbs-down`} />
                            {not_alikes_count}
                        </span>
                    </OverlayTrigger>

                ) : alike_id ? (
                    <>
                        <span onClick={() => {
                            handleUnlikeClick({ url: 'votealike', urlId: alike_id, alike: true });
                            handleLikeClick({ url: 'votenotalike', notAlike: true });
                        }}>
                            <i className={`${styles.Icon} fa-regular fa-thumbs-down`} />
                            {not_alikes_count}
                        </span>
                    </>
                ) : currentUser ? (
                    <>
                        <span onClick={() => handleLikeClick({ url: 'votealike', alike: true })}>
                            <i className={`${styles.Icon} fa-regular fa-thumbs-down`} />
                            {not_alikes_count}
                        </span>
                    </>
                ) : (
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                        <i className="fa-regular fa-thumbs-down" />
                    </OverlayTrigger>
                )}
            </span>
        </>
    );

    return (
        <div>
            <Container>
                {preview ? (
                    <Card className={styles.CardPrev}>
                        <Link className={styles.Title} to={`/posts/${id}`}>
                            <Card.Img variant="top" src={advert_image} className={styles.Alike} />
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                ) : (
                    <Card className={styles.Card}>
                        <Card.Header>
                            <Row>
                                <Col>
                                    {likeDetails}
                                    {likes_count}
                                </Col>
                                <Col>
                                    <span>
                                        Comments:&nbsp;
                                        <i className="fa-regular fa-comments" />&nbsp;
                                        {comments_count}
                                    </span>
                                </Col>

                                <div className='d-flex align-items-center'>
                                    {is_owner &&
                                        postDetail &&
                                        (<DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />)}
                                    {is_owner &&
                                        ProfileDetail &&
                                        (<DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />)}
                                </div>
                            </Row>
                        </Card.Header>
                        <Row className={styles.Row}>
                            <Col><Card.Img className={styles.Alike} src={advert_image} alt={title}></Card.Img></Col>
                            <Col><Card.Img className={styles.NotAlike} src={reality_image} alt={title}></Card.Img></Col>
                        </Row>
                        <Row className={styles.Row}>
                            <Col>
                                <Card.Text className={styles.AlikeText}>
                                    {alikeDetails}
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text className={styles.NotAlikeText}>
                                    {notAlikeDetails}
                                </Card.Text>
                            </Col>
                        </Row>
                        <Card.Body>
                            {postDetail ? (
                                <>
                                    <Card.Text><span>Content: {content ? content : 'No details given'}</span></Card.Text>
                                    <Card.Text><span>Location: {location ? location : 'No details given'}</span></Card.Text>
                                    <Card.Text><span>Franchisor : {franchisor ? franchisor : 'No details given'}</span></Card.Text>
                                </>
                            ) : (
                                <Card.Text>
                                    <Link className={styles.Title} to={`/posts/${id}`}>
                                        Open post for details and comments
                                    </Link>
                                </Card.Text>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <Link to={`/profiles/${profile_id}`}>
                                <small className="text-muted">Created on: {created_at}<br />Created by: {owner}</small>
                            </Link>
                        </Card.Footer>
                    </Card>
                )}

            </Container>
            <br />
        </div>
    )
}

export default Post
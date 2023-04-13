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
        // profile_image,
        advert_image,
        reality_image,
        location,
        franchisor,
        created_at,
        content,
        postDetail,
        like_id,
        // likes_count,
        comments_count,
        alikes_count,
        not_alikes_count,
        setPosts,
        alike_id,
        not_alike_id,
        ProfileDetail,
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

    // User can like the post
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    // User can Unlike the post
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    // User can vote on alike
    const handleVoteALike = async () => {
        try {
            const { data } = await axiosRes.post("/votealike/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, alikes_count: post.alikes_count + 1, alike_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    // User can Unvote on alike
    const handleVoteUnAlike = async () => {
        try {
            await axiosRes.delete(`/votealike/${alike_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, alikes_count: post.alikes_count - 1, alike_id: null }
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    // User can vote on NOt alike
    const handleVoteNotALike = async () => {
        try {
            const { data } = await axiosRes.post("/votenotalike/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, not_alikes_count: post.not_alikes_count + 1, not_alike_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

    // User can Unvote on Not alike
    const handleVoteUnNotAlike = async () => {
        try {
            await axiosRes.delete(`/votenotalike/${not_alike_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, not_alikes_count: post.not_alikes_count - 1, not_alike_id: null }
                        : post;
                }),
            }));
        } catch (err) {
        }
    };

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
                    <span onClick={handleUnlike}>
                        <i className={`${styles.Icon} fa-solid fa-star`} />
                    </span>
                </OverlayTrigger>
            ) : currentUser ? (
                // User has not liked and can like
                <OverlayTrigger placement='top' overlay={<Tooltip>Like</Tooltip>}>
                    <span onClick={handleLike}>
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
                    <OverlayTrigger placement='top' overlay={<Tooltip>UnVote</Tooltip>}>
                        <span onClick={handleVoteUnAlike}>
                            <i className={`${styles.Icon} fa-solid fa-thumbs-up`} />
                            {alikes_count}
                        </span>
                    </OverlayTrigger>

                ) : currentUser ? (
                    <>
                        {not_alike_id ? (
                            // user has already voted not alike
                            <OverlayTrigger placement='top' overlay={<Tooltip>You have already voted</Tooltip>}>
                                <i className="fa-regular fa-thumbs-up" />
                            </OverlayTrigger>
                        ) : (
                            // user has not voted yet so can vote on this
                            <OverlayTrigger placement='top' overlay={<Tooltip>Vote alike</Tooltip>}>
                                <span onClick={handleVoteALike}>
                                    <i className={`${styles.Icon} fa-regular fa-thumbs-up`} />
                                    {alikes_count}
                                </span>
                            </OverlayTrigger>
                        )}
                    </>
                ) : (
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                        <i className="fa-regular fa-thumbs-up" />
                    </OverlayTrigger>
                )}
            </span>
        </>
    );

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
                        <span onClick={handleVoteUnNotAlike}>
                            <i className={`${styles.Icon} fa-solid fa-thumbs-down`} />
                            {not_alikes_count}
                        </span>
                    </OverlayTrigger>

                ) : currentUser ? (
                    <>
                        {alike_id ? (
                            // User has already voted alike
                            <OverlayTrigger placement='top' overlay={<Tooltip>You have already voted</Tooltip>}>
                                <i className="fa-regular fa-thumbs-down" />
                            </OverlayTrigger>
                        ) : (
                            // User has not voted so can vote
                            <OverlayTrigger placement='top' overlay={<Tooltip>Vote not alike</Tooltip>}>
                                <span onClick={handleVoteNotALike}>
                                    <i className={`${styles.Icon} fa-regular fa-thumbs-down`} />
                                    {not_alikes_count}
                                </span>
                            </OverlayTrigger>

                        )}
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
                <Card className={styles.Card}>
                    <Card.Header>
                        <Row>
                            <Col>
                                {likeDetails}
                            </Col>
                            <Col>
                                <span>
                                    Comments:&nbsp;
                                    <i className="fa-regular fa-comments" />&nbsp;
                                    {comments_count}
                                </span>
                            </Col>

                            <div className='d-flex align-items-center'>
                                {is_owner && postDetail && (<DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />)}
                                {is_owner && ProfileDetail && (<DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />)}
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
                                <Card.Text><p>Content: {content ? content : 'No details given'}</p></Card.Text>
                                <Card.Text><p>Location: {location ? location : 'No details given'}</p></Card.Text>
                                <Card.Text><p>Franchisor : {franchisor ? franchisor : 'No details given'}</p></Card.Text>
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
            </Container>
            <br />
        </div>
    )
}

export default Post
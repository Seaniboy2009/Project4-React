import React from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

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
        setPosts,
        alike_id,
        not_alike_id,
    } = props;

    // get the current user
    const currentUser = useCurrentUser();
    // check if the current user is the owner of this post
    const is_owner = currentUser?.username === owner;

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
            console.log(err);
        }
    };

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
            console.log(err);
        }
    };

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
            console.log(err);
        }
    };

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
            console.log(err);
        }
    };

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
            console.log(err);
        }
    };

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
            console.log(err);
        }
    };

    return (
        <div>
            <Container>
                <Card className={styles.Card}>
                    <Card.Header>
                        <Row>
                            <Col>
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
                                    <span onClick={handleUnlike}>
                                        <i className={`${styles.Icon} fa-solid fa-star`} />
                                    </span>
                                ) : currentUser ? (
                                    // User has not liked and can like
                                    <span onClick={handleLike}><i className="fa-regular fa-star"></i></span>
                                ) : (
                                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                                        <i className="fa-regular fa-star"></i>
                                    </OverlayTrigger>
                                )}
                            </Col>
                            <Col>
                                {/* if this belongs to the sign in user and the post detail page exists then can edit */}
                                {is_owner && postDetail && '...'}
                                <span>Likes:&nbsp;</span>{likes_count}
                                <br />
                                <span>
                                    Comments:&nbsp;
                                    <i className="fa-regular fa-comments" />&nbsp;
                                    {comments_count}
                                </span>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Row className={styles.Row}>
                        <Col><Card.Img className={styles.Alike} src={advert_image} alt={title}></Card.Img></Col>
                        <Col><Card.Img className={styles.NotAlike} src={reality_image} alt={title}></Card.Img></Col>
                    </Row>
                    <Row className={styles.Row}>
                        <Col>
                            <Card.Text className={styles.AlikeText}>
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
                                        <span onClick={handleVoteUnAlike}>
                                            <i className={`${styles.Icon} fa-solid fa-thumbs-up`} />
                                            {alikes_count}
                                        </span>
                                    ) : currentUser ? (
                                        <>
                                            {not_alike_id ? (
                                                // user has already voted not alike
                                                <OverlayTrigger placement='top' overlay={<Tooltip>You have already voted</Tooltip>}>
                                                    <i className="fa-regular fa-thumbs-up" />
                                                </OverlayTrigger>
                                            ) : (
                                                // user has not voted yet so can vote on this
                                                <span onClick={handleVoteALike}>
                                                    <i className={`${styles.Icon} fa-regular fa-thumbs-up`} />
                                                    {alikes_count}
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                                            <i className="fa-regular fa-thumbs-up" />
                                        </OverlayTrigger>
                                    )}
                                </span>
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className={styles.NotAlikeText}>
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
                                        <span onClick={handleVoteUnNotAlike}>
                                            <i className={`${styles.Icon} fa-solid fa-thumbs-down`} />
                                            {not_alikes_count}
                                        </span>
                                    ) : currentUser ? (
                                        <>
                                            {alike_id ? (
                                                // User has already voted alike
                                                <OverlayTrigger placement='top' overlay={<Tooltip>You have already voted</Tooltip>}>
                                                    <i className="fa-regular fa-thumbs-down" />
                                                </OverlayTrigger>
                                            ) : (
                                                // User has not voted so can vote
                                                <span onClick={handleVoteNotALike}>
                                                    <i className={`${styles.Icon} fa-regular fa-thumbs-down`} />
                                                    {not_alikes_count}
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like</Tooltip>}>
                                            <i className="fa-regular fa-thumbs-down" />
                                        </OverlayTrigger>
                                    )}

                                </span>
                            </Card.Text>
                        </Col>
                    </Row>
                    <Card.Body>
                        {postDetail ? (
                            <>
                                <Card.Text><p>Content: {content}</p></Card.Text>
                                <Card.Text><p>Location: {location}</p></Card.Text>
                                <Card.Text><p>Franchisor : {franchisor}</p></Card.Text>
                            </>
                        ) : (
                            <Card.Text><p>Open post for details and comments</p></Card.Text>
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
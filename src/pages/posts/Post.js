import React from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import styles from '../../styles/Post.module.css';
import { useSignedInUser } from '../../contexts/SignedInUserContext';
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

    // get the current sign in user
    const signedInUser = useSignedInUser()
    // check if the signed in user is the owner of this post
    const is_owner = signedInUser?.username === owner;
    // compare the alike and not alike votes
    const alike = alikes_count > not_alikes_count;

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
                            <span onClick={handleUnlike}>
                                <i class="fa-regular fa-star" />
                            </span>
                        ) : signedInUser ? (
                            <span onClick={handleLike}><i class="fa-regular fa-star"></i></span>
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
                        ) : alike_id ? (
                            // if the user is not the owner allow them to Vote
                            <span onClick={handleVoteUnAlike}><i class="fa-regular fa-thumbs-up"></i>{alikes_count}</span>
                        ) : signedInUser ? (
                            <span onClick={handleVoteALike}><i class="fa-regular fa-thumbs-up"></i>{alikes_count}</span>
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
                        ) : not_alike_id ? (
                            // if the user is not the owner allow them to Vote
                            <span onClick={handleVoteUnNotAlike}><i class="fa-regular fa-thumbs-down"></i>{not_alikes_count} </span>
                        ) : signedInUser ? (
                            <span onClick={handleVoteNotALike}><i class="fa-regular fa-thumbs-down"></i>{not_alikes_count} </span>
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
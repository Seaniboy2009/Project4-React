import React, { useEffect, useState } from "react";
import { Col, Container, Row, } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from '../../utils/utils'

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    // Get all of the posts and the comments with the post id
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`)
                ]);
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {

            }
        };

        handleMount();
    }, [id]);

    return (
        <>
            <Row>
                <Col>
                    <Post {...post.results[0]} setPosts={setPost} postDetail />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Container>
                        {currentUser ? (
                            <CommentCreateForm
                                profile_id={currentUser.profile_id}
                                profileImage={profile_image}
                                post={id}
                                setPost={setPost}
                                setComments={setComments}
                            />
                        ) : comments.results.length ? (
                            "Comments"
                        ) : null}
                        {comments.results.length ? (
                            <InfiniteScroll
                                children={comments.results.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        {...comment}
                                        setPost={setPost}
                                        setComments={setComments}
                                    />
                                ))}
                                dataLength={comments.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!comments.next}
                                next={() => fetchMoreData(comments, setComments)}
                            />
                        ) : currentUser ? (
                            <span>No comments yet, be the first to comment!</span>
                        ) : (
                            <span>No comments... yet</span>
                        )}
                    </Container>
                </Col>
            </Row>
        </>
    );
}

export default PostDetail;
import React, { useEffect, useState } from "react";
import { Col, Row, } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });
    console.log(PostDetail)
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                ]);
                setPost({ results: [post] });
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row>
            <Col>
                <Post {...post.results[0]} setPosts={setPost} postDetail />
            </Col>
        </Row>
    );
}

export default PostDetail;
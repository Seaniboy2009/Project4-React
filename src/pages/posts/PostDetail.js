import React, { useEffect, useState } from "react";
import { Col, Row, } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostDetail() {
    const { id } = useParams();
    const [post, setPosts] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                ])
                setPosts({ results: [post] })
                console.log(post)
            } catch (error) {

            }
        }
        handleMount()
    }, [id])

    return (
        <Row>
            <Col>
                <Post {...post.results[0]} setPosts={setPosts} postDetail />
            </Col>
        </Row>
    );
}

export default PostDetail;
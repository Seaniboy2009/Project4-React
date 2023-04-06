import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function PostDetail() {
    const { id } = useParams();
    const [post, setPosts] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                ])
                setPosts({results: [post]})
                console.log(post)
            } catch (error) {
                
            }
        }
        handleMount()
    }, [id])


  return (
    <Row>
      <Col>
        <Container className={appStyles.Container}>
          Comments
        </Container>
      </Col>
    </Row>
  );
}

export default PostDetail;
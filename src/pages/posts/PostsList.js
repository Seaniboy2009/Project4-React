import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useLocation } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import styles from '../../styles/Post.module.css'

const PostsList = ({ message, filter = "" }) => {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  // This will get all posts, or get the filtered posts and 
  // set posts state
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    // has loaded is used to display the spinner until the posts
    // have been returned
    setHasLoaded(false);
    const timer = setTimeout(() => {
      getPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <div>
      <p>Posts</p>
      {posts.results.map(post => (
        <>
          <Card className={styles.Card}>
            <Card.Header>Title: {post.title}</Card.Header>
            <Row>
              <Col><Card.Img className={styles.Alike} src={post.advert_image}></Card.Img></Col>
              <Col><Card.Img className={styles.NotAlike} src={post.reality_image}></Card.Img></Col>
            </Row>
            <Row className="justify-content-center">
              <Col><Card.Text className={styles.AlikeText}>Advert</Card.Text></Col>
              <Col><Card.Text className={styles.NotAlikeText}>Reality</Card.Text></Col>
            </Row>
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
              </Card.Text>
              <Card.Text><p>Content: {post.content}</p></Card.Text>
              <Card.Text><p>Location: {post.location}</p></Card.Text>
              <Card.Text><p>Franchisor : {post.franchisor}</p></Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Created: {post.created_at} : Created by: {post.owner}</small>
            </Card.Footer>
          </Card>
          <br />
        </>
      ))}</div>
  )
}

export default PostsList
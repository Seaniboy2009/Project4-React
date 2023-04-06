import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { useLocation } from 'react-router-dom';
import Post from './Post';
import { Container, Row, Spinner } from "react-bootstrap";

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
      <Container>
        <Row className="justify-content-md-center">
          {hasLoaded ? (
            <>
              {posts.results.map(post => (
                <Post {...post} setPosts={setPosts} />
              ))}
            </>
          ) : (
            <>
              {Spinner && <Spinner animation="border" />}
            </>
          )}
          <br />
        </Row>
      </Container>
    </div>
  )
}

export default PostsList
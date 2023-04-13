import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Asset from '../../components/Asset';
import styles from '../../styles/PostList.module.css'
import Post from './Post';
import { Form } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import ProfileList from '../profiles/ProfileList';


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
      } catch (error) {]
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
        <Row className="h-150">
          <Col className='py-2 p-0 p-lg-2' lg={8}>
            <Container>
              <ProfileList mobile />
              <i className={`${styles.SearchIcon} fas fa-search`} />
              <Form className={styles.SearchBar}
                onSubmit={(event) => event.preventDefault()}
              >
                <Form.Control
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type='text'
                  className='mr-sm-2'
                  placeholder='Search Posts'
                >
                </Form.Control>
              </Form>
            </Container>
            {hasLoaded ? (
              <>
                {/* check if there are posts with length if there are map and then display */}
                {posts.results.length ? (
                  <InfiniteScroll
                    children={posts.results.map((post) => (
                      <Post key={post.id} {...post} setPosts={setPosts} />
                    ))}
                    dataLength={posts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!posts.next}
                    next={() => fetchMoreData(posts, setPosts)}
                  />
                ) : (
                  <Asset message={message} />
                )}
              </>
            ) : (
              <>
                <Asset spinner />
              </>
            )}
            <br />
          </Col>
          <Col md={4} className='d-none d-lg-block'>
            <ProfileList />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PostsList
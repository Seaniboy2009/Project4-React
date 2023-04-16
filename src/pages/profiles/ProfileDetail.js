import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CardColumns from 'react-bootstrap/CardColumns';
import Asset from "../../components/Asset";
import Post from '../posts/Post';
import styles from "../../styles/ProfileDetail.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import { ProfileEditDropdown } from "../../components/DropdownMenu";

function ProfileDetail() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [posts, setPosts] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnFollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: posts }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/posts/?owner__profile=${id}`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));

                setPosts(posts)
                setHasLoaded(true);
            } catch (err) {
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">Name: {profile?.owner} {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.posts_count}</div>
                            <div>Posts</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>Followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>Following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Full} ${btnStyles.Main}`}
                                onClick={() => handleUnFollow(profile)}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Full} ${btnStyles.Main}`}
                                onClick={() => handleFollow(profile)}
                            >
                                Follow
                            </Button>
                        ))}
                </Col>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            {is_owner ? (
                <p className="text-center">Your Posts</p>
            ) : (
                <p className="text-center">{profile?.owner}'s Posts</p>
            )}
            <hr />

            {posts.results.length ? (
                <CardColumns>
                    {posts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setPosts} ProfileDetail preview />
                    ))}
                </CardColumns>
            ) : (
                'No results'
            )}
        </>
    );

    return (

        <Container className={appStyles.Content}>
            {hasLoaded ? (
                <>
                    {mainProfile}
                    {mainProfilePosts}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
}

export default ProfileDetail;

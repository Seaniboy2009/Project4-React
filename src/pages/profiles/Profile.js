
import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
    const { profile, mobile, page } = props;
    const { id, following_id, image, owner, posts_count, created_at, followers_count } = profile;
    const { handleFollow, handleUnFollow } = useSetProfileData()

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"} ${page && styles.Page}`}>
            {page ? (
                <div>
                    <div>
                        <Link className="align-self-center" to={`/profiles/${id}`}>
                            <Avatar src={image} height={88} />
                            <strong>{owner}</strong>
                        </Link>
                    </div>
                    <div className={`d-block ${styles.Text}`}>
                        <span>Posts: {posts_count}</span>&nbsp;
                    </div>
                    <div>
                        <span>Followers: {followers_count}</span>&nbsp;
                    </div>
                    <div>
                        <span>Member since: {created_at}</span>&nbsp;
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <Link className="align-self-center" to={`/profiles/${id}`}>
                            <Avatar src={image} height={55} />
                        </Link>
                    </div>
                    <div className={`mx-2 ${styles.WordBreak}`}>
                        <strong>{owner}</strong>
                    </div>
                </>
            )}
            <div className={`text-right ${!mobile && "ml-auto"}`}>
                {!mobile &&
                    currentUser &&
                    !is_owner &&
                    (following_id ? (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Main}`}
                            onClick={() => handleUnFollow(profile)}
                        >
                            unfollow
                        </Button>
                    ) : (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Main}`}
                            onClick={() => handleFollow(profile)}
                        >
                            follow
                        </Button>
                    ))}
            </div>
        </div>
    );
};

export default Profile;
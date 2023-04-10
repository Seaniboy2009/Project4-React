import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <span className={styles.Owner}>{owner}</span>
        </Link>
        <Media.Body className={`${styles.Container} align-self-center ml-2`}>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
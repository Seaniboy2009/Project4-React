import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";

import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content, id, setPost, setComments, } = props;
  // get the current user
  const currentUser = useCurrentUser()
  // check if the current user is the owner of this post
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);
  const [errors, setErrors] = useState({});

  // handles the delete function
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`)
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count - 1
        }]
      }))

      setComments(prevCommnets => ({
        ...prevCommnets,
        results: prevCommnets.results.filter(comment => comment.id !== id)
      }))
    } catch (errors) {
      setErrors(errors.response?.data)
    }
  }

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          {/* <Avatar src={profile_image} /> */}
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <DropdownMenu
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;
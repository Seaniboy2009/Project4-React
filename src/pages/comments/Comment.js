import React, { useState } from "react";
import { Media } from "react-bootstrap";
import CommentEditForm from "./CommentEditForm";
import { Link } from "react-router-dom";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content, id, setPost, setComments, } = props;
  // get the current user
  const currentUser = useCurrentUser()
  // check if the current user is the owner of this post
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);
  const history = useHistory()

  // handles the edit function
  const handleEdit = () => {
    history.push(`/comment/${id}/edit`)
  }

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
    } catch (error) {
      console.log(error)
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
import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content, id, setPost, setComments, } = props;
  // get the current user
  const currentUser = useCurrentUser()
  // check if the current user is the owner of this post
  const is_owner = currentUser?.username === owner;
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
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <span className={styles.Owner}>{owner}</span>
        </Link>
        <Media.Body className={`${styles.Container} align-self-center ml-2`}>
          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
          {is_owner ? (
            <span><DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} /></span>
          ) : (
            <span>Not owner</span>
          )}
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../context/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    useEffect(() => {
      if (showComments) {
        fetch('/api/comments' + eventId)
          .then((response) => response.json())
          .then((data) => {
            setComments(data.comments);
            setIsFetchingComments(false)
          });
      }
    }, [showComments]);
  }

  function addCommentHandler(commentData) {
    // send data to API
    notificationCtx.showNotification({
      title: 'Sending Comment...',
      message: 'Your comment is currently being stored into a database',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message) || 'Something went wrong!';
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Sending Comment...',
          message: 'Your comment was saved',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error.',
          message: error.message || 'Failed to submit a comment',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading ...</p> />}
    </section>
  );
}

export default Comments;
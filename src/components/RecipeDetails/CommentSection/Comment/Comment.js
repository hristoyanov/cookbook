import { Link } from 'react-router-dom';

import './Comment.css';


const Comment = ({
    editCommentHandler,
    deleteCommentHandler,
    user,
    createdAt,
    content,
    author,
    id
}) => {
    return (
        <article className="comment">
            <p className="comment-date">
                Posted on: {createdAt.toDate().toLocaleDateString()}
            </p>
            <p className="comment-content">
                {content}
            </p>
            {user && user.uid === author.userId
                ?
                <div className="comment-owner-control">
                    <button className="comment-owner-control-edit-btn" onClick={() => editCommentHandler(id)}>Edit</button>
                    <button className="comment-owner-control-delete-btn" onClick={() => deleteCommentHandler(id)}>Delete</button>
                </div>
                : null}
            <p className="comment-author">
                Posted by: <Link to={`/users/${author.userId}/recipes`} className="comment-author-link">{author.displayName}</Link>
            </p>
        </article>
    );
}

export default Comment;

import { Link } from 'react-router-dom';

const Comment = ({
    createdAt,
    content,
    author
}) => {
    return (
        <article className="comment">
            <p className="comment-date">
                {createdAt.toDate().toString()}
            </p>
            <p className="comment-content">
                {content}
            </p>
            <Link to={`/users/${author.userId}/recipes`} className="comment-author">{author.displayName}</Link>
        </article>
    );
}

export default Comment;

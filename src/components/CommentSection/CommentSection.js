import { useState, useEffect, createRef } from 'react';

import Comment from '../Comment/Comment';
import { getRecipe, addRecipeComment, modifyRecipeComment } from '../../services/services';

import './CommentSection.css';


const CommentSection = ({
    user,
    recipe,
    recipeId
}) => {
    const [recipeComments, setRecipeComments] = useState(recipe.comments);
    const [commentToEdit, setCommentToEdit] = useState({});
    const [commentCounter, setCommentCounter] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            getRecipe(recipeId)
                .then(res => {
                    setRecipeComments([...res.comments]);
                })
                .catch(error => console.log(error))
        }, 500);
    }, [recipeId, commentCounter]);

    const commentTextAreaRef = createRef();

    const commentHandler = () => {
        const content = commentTextAreaRef.current.value;

        if (!commentToEdit.id) {
            addRecipeComment(recipeId, user.uid, user.displayName, content)
                .catch(error => console.log(error));
        } else {
            modifyRecipeComment(recipeId, user, content, commentToEdit)
                .catch(error => console.log(error));
        }

        commentTextAreaRef.current.value = '';

        setCommentCounter(commentCounter + 1);
    }

    const editCommentClickHandler = (commentId) => {
        const oldComment = recipeComments.find(x => x.id === commentId);

        setCommentToEdit(oldComment);

        commentTextAreaRef.current.focus();
        commentTextAreaRef.current.value = oldComment.content;
    }

    const deleteCommentClickHandler = (commentId) => {
        if (window.confirm('Delete comment?')) {
            const comment = recipeComments.find(x => x.id === commentId);

            modifyRecipeComment(recipeId, user, null, comment)
                .then(() => {
                    commentTextAreaRef.current.value = '';

                    setCommentCounter(commentCounter + 1);
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <div className="comment-section">
            {user ?
                <div className="comment-section-add-comment">
                    <textarea ref={commentTextAreaRef} name="comment-area" id="comment-area" cols="30" rows="10" placeholder="Leave a comment."></textarea>
                    <button className="add-comment-btn" onClick={commentHandler}>Submit comment</button>
                </div>
                : null}
            <div className="comment-section-comments">
                <h2 className="comment-section-comments-heading">
                    Comments
                </h2>
                {recipeComments.length > 0
                    ?
                    recipeComments.sort((a, b) => b.createdAt - a.createdAt).map(x =>
                        <Comment key={x.id} user={user} editCommentHandler={editCommentClickHandler} deleteCommentHandler={deleteCommentClickHandler} {...x} />
                    )
                    : <p>No comments yet.</p>}
            </div>
        </div>
    );
}

export default CommentSection;
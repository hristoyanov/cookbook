import { useState, useEffect, createRef } from 'react';

import Comment from '../Comment/Comment';
import { getRecipe, addRecipeComment, modifyRecipeComment } from '../../services/services';


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
                .catch(error => console.log(error));

            setCommentCounter(commentCounter + 1);
        }
    }

    return (
        <div className="comments-section">
            {user ?
                <div className="comments-section-add-comment">
                    <textarea ref={commentTextAreaRef} name="comment-area" id="comment-area" cols="30" rows="10"></textarea>
                    <button className="add-comment-btn" onClick={commentHandler}>Submit</button>
                </div>
                : null}
            <div className="comments-section-comments">
                {recipeComments.sort((a, b) => b.createdAt - a.createdAt).map(x =>
                    <Comment key={x.id} user={user} editCommentHandler={editCommentClickHandler} deleteCommentHandler={deleteCommentClickHandler} {...x} />
                )}
            </div>
        </div>
    );
}

export default CommentSection;

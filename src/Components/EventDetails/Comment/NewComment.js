import './newComment.css';
import { useState } from 'react';

const NewComment = ({
    addNewComment,
    currentUser
}) => {
    const [newComment, setNewComment] = useState('');
    const handleSendClick = () => {
        addNewComment(newComment);
        setNewComment(''); // Reset the input field after sending the comment
    };
    return (
        <div className='newComment'>
            <div className='avatarColumn'>
                <img className='avatarReply' src={currentUser.image.png} alt='current user avatar'/>
            </div>
            
            <div className='inputColumn'>
                <textarea 
                className='replyInput'
                placeholder='ثبت دیدگاه ...'
                onChange={(e) => {setNewComment(e.target.value);}}
                value={newComment}
                ></textarea>
            </div>
            
            <div className='sendColumn'>
                <button className='sendButton' onClick={handleSendClick}>ارسال</button>
            </div>
        </div>
    )
}
export default NewComment
import { useEffect, useState } from 'react';
import NewReply from './NewReply';
import './comment.css';
import upVote from '../../../assets/images/icon-plus.svg'
import disabledDownVote from '../../../assets/images/icon-minus.svg'
import deleteIcon from '../../../assets/images/icon-delete.svg'
import editIcon from '../../../assets/images/icon-edit.svg'
import replyIcon from '../../../assets/images/icon-reply.svg'
import liked from '../../../assets/liked.png'
import unliked from '../../../assets/unliked.png'

const Comment = ({
    id,
    currentUser,
    parent,
    comment,
    image,
    username,
    timeSince,
    score,
    replies,
    updateScore,
    updateComment,
    setDeleteComment,
    addNewReply,
    hasLiked
}) => {
    const [newReply, setNewReply] = useState(false);
    const [vote, setVote] = useState();
    const [edit, setEdit] = useState(false);
    const [current, setCurrent] = useState(false);
    let userData = JSON.parse(localStorage.getItem("userData"));

    // Evaluate to true or false and then render HTML accordingly
    useEffect(() => {
        const curr = username === currentUser;
        setCurrent(curr);
    }, [currentUser, username]);
    
    return (
        <>
        { 
            <div className='comment mr-3'>
                <div className='scoreColumn'>
                    {
                        // disable voting function for user's own comments
                        current 
                        ?
                        <>
                         <img className="flex-item upvote disabled-upvote" src={unliked} alt="upvote" />
                         <span className="flex-item">{score}</span>
                         {/* <img className="flex-item downvote disabled-upvote" src={disabledDownVote} alt="downvote" /> */}
                        </>
                        :
                        <>
                        <img className="flex-item upvote" src={hasLiked ? liked : unliked} alt="upvote" onClick={() => {
                        if (vote !== "upvote" && !hasLiked) {
                            updateScore(id, 'upvote');
                            setVote("upvote");
                            console.log(score);
                        }
                        else {
                            updateScore(id, 'downvote');
                            setVote("downvote");
                            console.log(score);
                        }
                    }}
                        />
                        <span className="flex-item">{score}</span>
                        </>
                    }

                </div>

                <div className='contentColumn text-right'>
                    <div className='commentHeader'>
                        <div className='row justify-content-center align-items-center pb-3'>
                        <img className='avatar' src={image} alt='avatar'/>
                        <div className='username'>{username}</div>
                        { current ? <div className='youTag'>شما</div> : ""}
                        <div className='timestamp'>{timeSince}</div>
                        </div>
                        { current 
                            ? 
                            edit !== false 
                                ?
                                <>
                                <div className='deleteButton disabled'>
                                    <img src={deleteIcon} alt='delete'/>
                                    <span> حذف</span>
                                </div>
                                <div className='editButton disabled'>
                                    <img src={editIcon} alt='edit'/>
                                    <span> ویرایش</span>
                                </div>
                                </>
                                :
                                <>
                                <div className='deleteButton' onClick={() => setDeleteComment(id)}>
                                    <img src={deleteIcon} alt='delete'/>
                                    <span> حذف</span>
                                </div>
                                <div className='editButton' onClick={() => setEdit(comment)}>
                                    <img src={editIcon} alt='edit'/>
                                    <span> ویرایش</span>
                                </div>
                                </>
                            :
                            <div className='replyButton' onClick={() => {setNewReply(true)}}>
                                <img src={replyIcon} alt='reply'/>
                                <span> پاسخ دادن</span> 
                            </div>
                        }
                    </div>
                    
                    {
                        edit !== false 
                        ?
                        <>
                        <div className='updateInput'>
                            <textarea 
                                defaultValue={edit}
                                onChange={(e) => {setEdit(e.target.value)}}
                                className='replyInput'
                                placeholder='ثبت دیدگاه ...'
                            />
                        </div>

                        <div className='updateRow'>
                            <button className='updateButton' onClick={() => {
                                updateComment(edit, id);
                                setEdit(false);
                                }
                            }>تایید</button>
                        </div>
                        </>
                        :
                        <div className='commentContent'>
                            {parent > 0 ? <span className='reply-username'>@{parent} </span> : ''}
                            {comment}
                        </div>
                    }

                </div> {/* contentColumn*/}
            {/* comment*/}
            </div> 
        }
        {   newReply !== false &&
                <NewReply
                    parentId={id}
                    parent={username}
                    setNewReply={setNewReply}
                    addNewReply={addNewReply}
                    currentUser={currentUser}
                />
        }
        {replies?.length > 0 && 
            replies.map((reply) => {
                return (
                        <div className='commentReplies'>
                            <div className='verticalLine'></div>
                            <Comment
                                parent={reply.parent}
                                addNewReply={addNewReply}
                                updateComment={updateComment}
                                setDeleteComment={setDeleteComment}
                                updateScore={updateScore}
                                key={reply.id}
                                currentUser={userData ? userData.user.username : ""}
                                comment={reply.text}
                                image={reply.user_photo}
                                username={reply.username}
                                timeSince={reply.created_at}
                                score={reply.score}
                                replies={reply.replies}
                                id={reply.id}
                                hasLiked={reply.has_liked}
                            />
                        </div>
                )
            })
        }
    </>
    )
}
export default Comment
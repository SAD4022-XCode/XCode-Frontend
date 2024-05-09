import './deleteModal.css';

const DeleteModal = ({
    id,
    setDeleteComment,
    setData,
    data
}) => {
    const deleteComment = () => {
            for (let comment of data.comments) {
                if (comment.id === id) {
                    const updatedComments = data.comments.filter(
                        (comment) => comment.id !== id
                    );
                    setData(data => ({
                        'currentUser': {...data.currentUser},
                        'comments': updatedComments
                    }));
                    break;
                }
                if (comment.replies.length > 0) {
                    for (let reply of comment.replies) {
                        if (reply.id === id) {
                            const updatedReplies = comment.replies.filter((reply) => reply.id !== id);

                            comment.replies = updatedReplies;

                            setData(data => ({
                                'currentUser': {...data.currentUser},
                                'comments': data.comments
                            }));
                            break;
                        };
                    }
                }
            }
            setDeleteComment(false);
        }
    
    return (
        <div className='modalBackground'>
            <div className='modal text-right'>
                <div className='modalTitle'>حذف دیدگاه</div>
                <div>آیا مطمئنید که می خواهید این دیدگاه را حذف کنید؟ با این کار دیدگاه حذف می شود و قابل بازگشت نیست.</div>
                <div className='buttonsRow'>
                    <span id="cancel" onClick={() => setDeleteComment(false)}>نه، لغو</span>
                    <span id="confirm" onClick={() => deleteComment()}>بله، حذف</span>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal
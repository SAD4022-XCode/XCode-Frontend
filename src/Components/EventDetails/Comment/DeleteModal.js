import './deleteModal.css';

const DeleteModal = ({
    id,
    setDeleteComment,
    setData,
    data
}) => {
    const deleteComment = () => {
            for (let comment of data) {
                if (comment.id === id) {
                    const updatedComments = data.filter(
                        (comment) => comment.id !== id
                    );
                    setData(updatedComments);
                    break;
                }
                if (comment.replies.length > 0) {
                    for (let reply of comment.replies) {
                        if (reply.parent === id) {
                            const updatedReplies = comment.replies.filter((reply) => reply.parent !== id);

                            comment.replies = updatedReplies;
                            setData(data);
                            break;
                        };
                    }
                }
            }
            setDeleteComment(false);
        }
    
    return (
        <div className='modalBackground'>
            <div className='deleteModal text-right'>
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
import './deleteModal.css';
import axios from "axios";
import { useAuth } from "../../Authentication/authProvider";
const DeleteModal = ({
    id,
    setDeleteComment,
    setData,
    data
}) => {
    const auth = useAuth();
    // const deleteComment = async (id) => {
    //     const baseUrl = `https://eventify.liara.run/comments/${id}/`;
    //     console.log(auth.token);
    //     await axios.delete(baseUrl, {headers: {
    //       Authorization: `JWT ${auth.token}`,
    //     }})
    //   };
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
                        if (reply.id === id) {
                            const updatedReplies = comment.replies.filter((reply) => reply.id !== id);

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
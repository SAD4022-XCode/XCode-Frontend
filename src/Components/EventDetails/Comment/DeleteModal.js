import "./deleteModal.css";
import axios from "axios";
import { useAuth } from "../../Authentication/authProvider";
const DeleteModal = ({
  id,
  setDeleteComment,
  setData,
  data,
  setInitialFetchDone,
}) => {
  const auth = useAuth();
  axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
  const deleteComment = async (id) => {
    const baseUrl = `https://eventify.liara.run/comments/${id}/`;
   
    await axios.delete(baseUrl).then(() => {
      setDeleteComment(false);
      setData(data);
      setInitialFetchDone(false);
      setTimeout(() => {
        setInitialFetchDone(true);
      }, 2000);
    });
    // setTimeout(() => {
    //   setDeleteComment(false);
    // }, 1000);
    // setData(data);
    // setTimeout(() => {
    //   setInitialFetchDone(false);
    //   setInitialFetchDone(true);
    // }, 3000);
  };
  // const deleteComment = () => {
  //         for (let comment of data) {
  //             if (comment.id === id) {
  //                 const updatedComments = data.filter(
  //                     (comment) => comment.id !== id
  //                 );
  //                 setData(updatedComments);
  //                 break;
  //             }
  //             if (comment.replies.length > 0) {
  //                 for (let reply of comment.replies) {
  //                     if (reply.id === id) {
  //                         const updatedReplies = comment.replies.filter((reply) => reply.id !== id);

  //                         comment.replies = updatedReplies;
  //                         setData(data);
  //                         break;
  //                     };
  //                 }
  //             }
  //         }
  //         setDeleteComment(false);
  //     }

  return (
    <div className="modalBackground">
      <div className="deleteModal text-right">
        <div className="modalTitle">حذف دیدگاه</div>
        <div>
          آیا مطمئنید که می خواهید این دیدگاه را حذف کنید؟ با این کار دیدگاه حذف
          می شود و قابل بازگشت نیست.
        </div>
        <div className="buttonsRow">
          <span id="cancel" onClick={() => setDeleteComment(false)}>
            نه، لغو
          </span>
          <span id="confirm" onClick={() => deleteComment(id)}>
            بله، حذف
          </span>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;

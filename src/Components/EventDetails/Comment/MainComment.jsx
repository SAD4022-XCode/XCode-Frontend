import React from "react";
import "./MainComment.css";
import JSONdata from "./data.json";
import { useState, useEffect } from "react";
import axios from "axios";

import Comment from "./Comment";
import NewComment from "./NewComment";
import DeleteModal from "./DeleteModal";
let currentId = 5;
const MainComment = (id) => {
  const [data, setData] = useState([]);
  const [deleteComment, setDeleteComment] = useState(false);
  let userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    const fetchComments = async () => {
      const baseUrl = `https://eventify.liara.run/events/${id.id}/comments/`;
      const response = await axios.get(baseUrl);
      // console.log(response)
      const comments = response.data.comments;
      // console.log(comments);
      setData(comments);
      console.log(comments);
      console.log(userData)
    };
    fetchComments();
  }, []);
  const addNewReply = (id, content) => {
    if (!/\S/.test(content)) return; // to avoid posting empty comments (only whitespaces)
    let temp = data;
    currentId += 1;
  
    const addReplyToComments = (comments) => {
      for (let comment of comments) {
        if (comment.id === id) {
          comment.replies.push({
            id: currentId + 1,
            text: content,
            createdAt: "Just now",
            score: 0,
            username: userData.user.username,
            replies: [],
            user_photo: userData.profile_picture,
            user: userData.user.id,
            liked_by: [],
            has_liked: false,
            event: id.id,
          });
          return true;
        }
        if (comment.replies.length > 0) {
          if (addReplyToComments(comment.replies)) return true;
        }
      }
      return false;
    };
  
    addReplyToComments(temp);
    setData([...temp]);
    console.log(data);
  };
  
  // const addNewReply = (id, content) => {
  //   if (!/\S/.test(content)) return; // to avoid posting empty comments (only whitespaces)
  //   let temp = data;
  //   currentId += 1;
  //   for (let comment of temp.comments) {
  //     if (comment.id === id) {
  //       comment.replies.push({
  //         id: currentId + 1,
  //         text: comment.text,
  //         createdAt: "Just now",
  //         score: 0,
  //         replyingTo: comment.user.username,
  //         user: { ...data.currentUser },
  //       });
  //       console.log(comment);
  //       break;
  //     }
  //     if (comment.replies.length > 0) {
  //       for (let reply of comment.replies) {
  //         if (reply.id === id) {
  //           comment.replies.push({
  //             id: currentId + 1,
  //             content: content,
  //             createdAt: "Just now",
  //             score: 0,
  //             replyingTo: reply.user.username,
  //             user: { ...data.currentUser },
  //           });
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   setData({ ...temp });
  // };

  const updateScore = (id, action) => {
    let temp = [...data];
    for (let comment of temp) {
      if (comment.id === id) {
        action == "upvote" ? (comment.score += 1) : (comment.score -= 1);
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            action == "upvote" ? (reply.score += 1) : (reply.score -= 1);
            break;
          }
        }
      }
    }
    setData(temp);
  };

  const updateComment = (updatedContent, id) => {
    let temp = [...data];
    for (let comment of temp) {
      if (comment.id === id) {
        comment.text = updatedContent;
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.parent === id) {
            reply.text = updatedContent;
            break;
          }
        }
      }
    }
      
    setData(temp);
  };

  const addNewComment = (content) => {
    if (!/\S/.test(content)) return;
    currentId += 1;
    
    const newComment = {
      parent:"",
      id: currentId + 1,
      text: content,
      createdAt: "Just now",
      score: 0,
      username: userData.user.username,
      replies: [],
      user_photo: userData.profile_picture,
      user: userData.user.id,
      liked_by: [],
      has_liked: false,
      event: id.id,
    };
    
    const updatedData = [...data, newComment];
    setData(updatedData);
    
  };

  return (
    <div className="container-fluid mb-5 pb-5">
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="comment-section-title  text-center">
            <h1>نظرات </h1>
          </div>
        </div>
      </div>
      {deleteComment !== false && (
        <DeleteModal
          id={deleteComment}
          setDeleteComment={setDeleteComment}
          setData={setData}
          data={data}
        />
      )}

      <main className="comments-column">
        {data.length > 0 && data.map((comment) => {
          return (
            <Comment
              replyingTo=""
              addNewReply={addNewReply}
              updateComment={updateComment}
              setDeleteComment={setDeleteComment}
              updateScore={updateScore}
              key={comment.id}
              currentUser={userData.user.username}
              comment={comment.text}
              image={comment.user_photo}
              username={comment.username}
              timeSince={comment.created_at}
              score={comment.score}
              replies={comment.replies}
              id={comment.id}
              hasLiked={comment.has_liked}
            />
          );
        })}
        <NewComment addNewComment={addNewComment} currentUser={userData} />
      </main>
    </div>
  );
};

export default MainComment;

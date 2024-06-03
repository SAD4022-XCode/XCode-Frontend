import React from "react";
import "./MainComment.css";
import JSONdata from "./data.json";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment-timezone";

import Comment from "./Comment";
import NewComment from "./NewComment";
import DeleteModal from "./DeleteModal";
import { useAuth } from "../../Authentication/authProvider";
import profile from "../../../assets/profile.png";
let currentId = 5;
const MainComment = (id) => {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const [deleteComment, setDeleteComment] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const initialDataLength = useRef(null);
  if (auth.token)
    axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
  let userData = JSON.parse(localStorage.getItem("userData"));
  let ID = id.id;
  useEffect(() => {
    const fetchComments = async () => {
      if (!initialFetchDone && auth.token) {
        axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
        const baseUrl = `https://eventify.liara.run/events/${id.id}/comments/`;
        const response = await axios.get(baseUrl);
        // console.log(response)
        const comments = response.data.comments;
        initialDataLength.current = comments.length; // set initial data length
        // console.log(comments);
        setData(comments);
        const timeZoneOffset = "+3:30"; // Change this to your timezone offset
        setInitialFetchDone(true);
        console.log(comments);
        const translateTime = (time) => {
          let translatedTime = moment.utc(time).local().fromNow();
          const translations = {
            ago: "قبل",
            "a few seconds": "لحظاتی",
            days: "روز",
            a: "یک",
            day: "روز",
            month: "ماه",
            months: "ماه",
            year: "سال",
            years: "سال",
            week: "هفته",
            weeks: "هفته",
            minutes: "دقیقه",
            minute: "دقیقه",
            hours: "ساعت",
            hour: "ساعت",
            seconds: "ثانیه",
            few: "چند",
          };

          for (let key in translations) {
            if (translatedTime.includes(key)) {
              translatedTime = translatedTime.replace(key, translations[key]);
            }
          }

          return translatedTime;
        };

        for (let comment of comments) {
          comment.created_at = translateTime(comment.created_at);
          if (comment.replies.length > 0) {
            for (let reply of comment.replies) {
              reply.created_at = translateTime(reply.created_at);
            }
          }
        }
      }
    };
    fetchComments();
  }, [id, initialFetchDone]);

  // const addNewReply = (id, content) => {
  //   if (!/\S/.test(content)) return; // to avoid posting empty comments (only whitespaces)
  //   let temp = data;
  //   currentId += 1;

  //   const addReplyToComments = (comments) => {
  //     for (let comment of comments) {
  //       if (comment.id === id) {
  //         comment.replies.push({
  //           id: currentId + 1,
  //           text: content,
  //           createdAt: "Just now",
  //           score: 0,
  //           username: userData.user.username,
  //           replies: [],
  //           user_photo: userData.profile_picture,
  //           user: userData.user.id,
  //           liked_by: [],
  //           has_liked: false,
  //           event: id.id,
  //         });
  //         return true;
  //       }
  //       if (comment.replies.length > 0) {
  //         if (addReplyToComments(comment.replies)) return true;
  //       }
  //     }
  //     return false;
  //   };

  //   addReplyToComments(temp);
  //   setData([...temp]);
  //   console.log(data);
  // };
  const addNewCommentBack = async (newData) => {
    axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
    const baseUrl = `https://eventify.liara.run/comments/`;

    await axios.post(baseUrl, newData).then(() => {
      // setTimeout(() => {
        setInitialFetchDone(false);
        setInitialFetchDone(true);
      // }, 3000);
    });
  };
  const updateCommentBack = async (id, newData) => {
    axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
    const baseUrl = `https://eventify.liara.run/comments/${id}/`;

    await axios
      .patch(baseUrl, newData, {
        headers: {
          Authorization: `JWT ${auth.token}`,
        },
      })
      .then(() => {
        // setTimeout(() => {
          setInitialFetchDone(false);
          setInitialFetchDone(true);
        // }, 3000);
      });
  };
  const updateScoreBack = async (id) => {
    axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
    const baseUrl = `https://eventify.liara.run/comments/${id}/like/`;

    await axios.post(baseUrl).then(() => {
      // setTimeout(() => {
        setInitialFetchDone(false);
        setInitialFetchDone(true);
      // }, 3000);
    });
  };

  const addNewReplyBack = async (id, newData) => {
    axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
    const baseUrl = `https://eventify.liara.run/comments/${id}/reply/`;

    await axios.post(baseUrl, newData).then(() => {
      // setTimeout(() => {
        setInitialFetchDone(false);
        setInitialFetchDone(true);
      // }, 3000);
    });
  };

  const addNewReply = (id, content) => {
    if (!/\S/.test(content)) return; // to avoid posting empty comments (only whitespaces)
    let temp = [...data];
    currentId += 1;
    for (let comment of temp) {
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
          event: ID,
          parent: id,
        });
        addNewReplyBack(id, { event: ID, text: content });
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
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
              event: ID,
              parent: id,
            });
            addNewReplyBack(id, { event: ID, text: content });
            break;
          }
        }
      }
    }
    setData(temp);
    console.log(temp);
  };

  const updateScore = (id, action) => {
    let temp = [...data];
    for (let comment of temp) {
      if (comment.id === id) {
        if (action == "upvote") {
          comment.score += 1;
          comment.has_liked = true;
          // comment.liked_by.push(userData.user.id)
        } else {
          comment.score -= 1;
          comment.has_liked = false;
          // comment.liked_by = comment.liked_by.filter(id => id !== userData.user.id)
        }
        // action == "upvote" ? (comment.score += 1) : (comment.score -= 1);  //liked by add
        updateScoreBack(id);
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            if (action == "upvote") {
              reply.score += 1;
              reply.has_liked = true;
              // comment.liked_by.push(userData.user.id)
            } else {
              reply.score -= 1;
              reply.has_liked = false;
              // comment.liked_by = comment.liked_by.filter(id => id !== userData.user.id)
            }
            updateScoreBack(id);
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
          if (reply.id === id) {
            reply.text = updatedContent;
            break;
          }
        }
      }
    }

    setData(temp);
    updateCommentBack(id, { event: id.event, text: updatedContent });
  };

  const addNewComment = (content) => {
    if (!/\S/.test(content)) return;
    currentId += 1;

    const newComment = {
      parent: "",
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
    if (updatedData.length > initialDataLength.current) {
      addNewCommentBack({
        event: updatedData[updatedData.length - 1].event,
        text: updatedData[updatedData.length - 1].text,
      });
    }
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
          setInitialFetchDone={setInitialFetchDone}
        />
      )}

      <main className="comments-column">
        {data.length > 0 &&
          data.map((comment) => {
            return (
              <Comment
                replyingTo=""
                addNewReply={addNewReply}
                updateComment={updateComment}
                setDeleteComment={setDeleteComment}
                updateScore={updateScore}
                key={comment.id}
                currentUser={userData ? userData.user.username : ""}
                comment={comment.text}
                image={comment.user_photo ? comment.user_photo : profile}
                username={comment.username}
                timeSince={comment.created_at}
                score={comment.score}
                replies={comment.replies}
                id={comment.id}
                hasLiked={comment.has_liked}
              />
            );
          })}
        {userData && (
          <NewComment addNewComment={addNewComment} currentUser={userData} />
        )}
        {!userData && (
          <div className="row">
            <div className="col-7 mx-auto">
              <h2 id="login-comment" className="text-center mt-5">
                جهت ارسال نظر، ابتدا <a href="/login">وارد شوید.</a>
              </h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainComment;

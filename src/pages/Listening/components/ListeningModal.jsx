import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  changeListeningModalStatus,
  setListeningVideoDetails,
} from "../../../utils/redux/otherSlice";
import Avatar from "../../../assets/svg/avatar.svg";
import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdThumbDown,
  MdOutlineThumbDown,
} from "react-icons/md";
import { LiaCommentSolid } from "react-icons/lia";
import { FiSend } from "react-icons/fi";
import ReactPlayer from "react-player/lazy";
import { toast } from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { createJwt, formatDate } from "../../../utils/helpers";
import {
  addCommentInListeningTest,
  addCommentReplyInListeningTest,
  dislikeCommentReplyInListeningTest,
  dislikeListeningUserComment,
  getListeningComments,
  getListeningUserCommentReplies,
  likeCommentReplyInListeningTest,
  likeListeningUserComment,
} from "../../../api/apiCall";
import { UserAuth } from "../../../context/AuthContext";
import { TiArrowBack } from "react-icons/ti";
import Notiflix from "notiflix";
import CheckBandPopupForm from "./CheckBandPopupForm";

const ListeningModal = () => {
  const dispatch = useDispatch();
  const { listeningVideoDetails } = useSelector((state) => state.other);
  const { errorLogout } = UserAuth();
  const [showCommentReplies, setShowCommentReplies] = useState(false);
  const [commentIdToFetchReplies, setCommentIdToFetchReplies] = useState("");
  const [testNumberToFetchReplies, setTestNumberToFetchReplies] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    playing: true,
    controls: true,
  });
  const [comments, setComments] = useState([]);
  const effectRan = useRef(true);
  const [comment, setComment] = useState("");
  const [commentReply, setCommentReply] = useState("");
  const [commentReplies, setCommentReplies] = useState([]);
  const scrollToTopRef = useRef(null);
  const [showCheckBandModal, setShowCheckBandModal] = useState(false);
  
  const closeModal = () => {
    dispatch(changeListeningModalStatus(false));
    dispatch(setListeningVideoDetails({}));
  };

  const handleRestart = () => {
    playerRef.current?.seekTo(0);
    setPlayerState({
      playing: true,
      ...playerState,
    });
  };

  const getComments = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: listeningVideoDetails.uniqueTestNumber,
        testFile: listeningVideoDetails.testFile,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await getListeningComments(formData);
      if (!response.data.failure) {
        setComments(response.data.data.commentList);
      } else {
        dispatch(changeListeningModalStatus(false));
        dispatch(setListeningVideoDetails({}));
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      getComments();
      effectRan.current = false;
    }
  }, [listeningVideoDetails]);

  // add comment
  const handleAddCommentClick = async () => {
    const commentString = comment.trim();
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: listeningVideoDetails.uniqueTestNumber,
        testFile: listeningVideoDetails.testFile,
        userName: user.fullName,
        comment: commentString,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);
      const response = await addCommentInListeningTest(formData);
      if (!response.data.failure) {
        setComment("");
        setComments(response.data.data.commentList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // add comment
  const handleAddCommentReplyClick = async () => {
    const commentReplyString = commentReply.trim();
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: listeningVideoDetails.uniqueTestNumber,
        testFile: listeningVideoDetails.testFile,
        userName: user.fullName,
        commentId: commentIdToFetchReplies,
        commentReply: commentReplyString,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);
      const response = await addCommentReplyInListeningTest(formData);
      if (!response.data.failure) {
        setCommentReply("");
        setCommentReplies(response.data.data.commentRepliesList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    // Scroll to the top of the target div
    if (scrollToTopRef.current) {
      scrollToTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showCommentReplies]);

  // handle check band button click
  const handleCheckBandClick = () => {
    setShowCheckBandModal(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      className="relative bg-white rounded-lg flex flex-col z-20 w-[100%] md:w-[45vw] max-h-[90vh] overflow-scroll mx-auto items-center"
    >
      {showCommentReplies ? (
        <div className="flex z-10 fixed w-[93%] md:w-[45vw] rounded-t-xl left-1/2 -translate-x-1/2 -top-[2.5rem] pt-4 md:pt-8 px-4 md:px-8 bg-white items-center justify-start border-b border-black/20 pb-2">
          <button
            onClick={() => {
              setShowCommentReplies(false);
              getComments();
            }}
            className="flex items-center gap-2"
          >
            <TiArrowBack className="text-2xl" />
            <h3 className="font-medium">Back to test</h3>
          </button>
        </div>
      ) : (
        <div className="flex sticky top-0 pt-4 md:pt-8 px-4 md:px-8 bg-white w-full items-center justify-between border-b border-black/20 pb-2">
          <h3 className="font-medium">Listening Practice</h3>
          <button onClick={closeModal} className="text-2xl">
            <IoMdClose />
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="h-[90vh] md:h-[80vh] px-4 md:px-8 my-3 w-[100%] md:w-[45vw] flex justify-center items-center">
          <ImSpinner9 className="text-4xl md:text-6xl text-primary-100 animate-spin" />
        </div>
      ) : (
        <>
          {showCommentReplies ? (
            <div ref={scrollToTopRef} className="relative w-full pt-[4rem]">
              <div className="min-h-[90vh] max-h-[90vh] w-full py-3 px-4 md:px-8 bg-white">
                <CommentReplies
                  commentIdToFetchReplies={commentIdToFetchReplies}
                  testNumberToFetchReplies={testNumberToFetchReplies}
                  errorLogout={errorLogout}
                  commentReplies={commentReplies}
                  setCommentReplies={setCommentReplies}
                />
                <div className="fixed w-[93%] md:w-[45vw] h-fit shadow-top z-20 pb-4 px-3 -bottom-[2.5rem] rounded-b-lg left-1/2 -translate-x-1/2 bg-white flex gap-4 items-center justify-between pt-3">
                  <img
                    src={Avatar}
                    className="w-8 h-8 object-contain rounded-full"
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={commentReply}
                    onChange={(e) => setCommentReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddCommentReplyClick();
                      }
                    }}
                    className="rounded-lg text-sm outline-none border border-black/30 p-2 w-full"
                  />
                  <button
                    className="text-2xl text-primary-500 cursor-pointer"
                    onClick={handleAddCommentReplyClick}
                    disabled={!commentReply}
                  >
                    <FiSend />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="h-[35vh] my-3 w-full px-4 md:px-8">
                <ReactPlayer
                  onStart={handleRestart}
                  ref={playerRef}
                  url={`https://www.youtube.com/watch?v=${listeningVideoDetails?.testFile}`}
                  height="35vh"
                  width="100%"
                  playing={playerState.playing}
                  controls={playerState.controls}
                />
              </div>

              <div className="flex flex-col gap-2 px-4 md:px-8">
                <div className="border-b-2 border-black/20 pb-2 flex justify-between items-center">
                  <h3 className="font-medium text-lg">
                    Listening Practice Test | Ep: {listeningVideoDetails?.id}
                  </h3>
                  {!listeningVideoDetails.isImproveListeningData && (
                    <button
                      onClick={handleCheckBandClick}
                      className="bg-primary-500 text-white hover:bg-primary-100 transition-colors duration-300 py-2 px-3 rounded-full text-sm"
                    >
                      Check Band
                    </button>
                  )}
                </div>
                <h4 className="font-medium">
                  Comments {comments.length > 0 && `(${comments.length})`}
                </h4>
                <div className="bg-[#F2F2F2] p-2 text-sm">
                  Remember to keep comments respectful and to follow our
                  community guidelines
                </div>
                <div>
                  <div>
                    {comments.length > 0 &&
                      comments.map((comment, idx) => (
                        <Comment
                          comment={comment}
                          key={comment.id}
                          test={listeningVideoDetails}
                          setShowCommentReplies={setShowCommentReplies}
                          dispatch={dispatch}
                          errorLogout={errorLogout}
                          setComments={setComments}
                          setCommentIdToFetchReplies={
                            setCommentIdToFetchReplies
                          }
                          setTestNumberToFetchReplies={
                            setTestNumberToFetchReplies
                          }
                        />
                      ))}
                  </div>
                  <div className="sticky shadow-top z-20 pb-4 px-3 -bottom-0 left-0 w-full bg-white flex gap-4 items-center justify-between pt-3">
                    <img
                      src={Avatar}
                      className="w-8 h-8 object-contain rounded-full"
                      alt=""
                    />
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={comment}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddCommentClick();
                        }
                      }}
                      onChange={(e) => setComment(e.target.value)}
                      className="rounded-lg text-sm outline-none border border-black/30 p-2 w-full"
                    />
                    <button
                      className="text-2xl text-primary-500 cursor-pointer"
                      onClick={handleAddCommentClick}
                      disabled={!comment}
                    >
                      <FiSend />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {showCheckBandModal && (
            <CheckBandPopupForm
              changeModalStatus={setShowCheckBandModal}
              selectedTest={listeningVideoDetails}
              setComments={setComments}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default ListeningModal;

// comment item
const Comment = ({
  comment,
  test,
  setShowCommentReplies,
  errorLogout,
  setComments,
  setCommentIdToFetchReplies,
  setTestNumberToFetchReplies,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLiked, setIsLiked] = useState(
    comment.whoLikeTheComment?.includes(userData.uid)
  );
  const [isDisliked, setIsDisliked] = useState(
    comment.whoDislikeTheComment?.includes(userData.uid)
  );

  // handle like change
  const changeLikeStatus = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: test.uniqueTestNumber,
        commentId: comment.uniqueCommentId,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await likeListeningUserComment(formData);
      if (!response.data.failure) {
        setIsLiked(!isLiked);
        setIsDisliked(false);
        setComments(response.data.data.commentList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handle dislike change
  const changeDislikeStatus = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: test.uniqueTestNumber,
        commentId: comment.uniqueCommentId,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await dislikeListeningUserComment(formData);
      if (!response.data.failure) {
        setIsDisliked(!isDisliked);
        setIsLiked(false);
        setComments(response.data.data.commentList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handle click to view comment replies
  const handleRepliesClick = () => {
    setTestNumberToFetchReplies(test.uniqueTestNumber);
    setCommentIdToFetchReplies(comment.uniqueCommentId);
    setShowCommentReplies(true);
  };
  return (
    <div className="flex flex-col p-2 border-b border-black/20 text-sm">
      <div className="flex gap-2 items-center">
        <img
          src={Avatar}
          className="w-6 h-6 object-contain rounded-full"
          alt=""
        />
        <span className="text-defaultGray">
          @{comment.userName} - {formatDate(comment.created_at)}
        </span>
      </div>
      <div className="px-10">
        <p className="">{comment.comment}</p>
        <div className="flex gap-4 my-4">
          <div className="flex gap-1">
            {isLiked ? (
              <button onClick={changeLikeStatus}>
                <MdThumbUp className="text-xl" />
              </button>
            ) : (
              <button onClick={changeLikeStatus}>
                <MdOutlineThumbUp className="text-xl" />
              </button>
            )}
            {comment.commentLike > 0 && <span>{comment.commentLike}</span>}
          </div>
          {isDisliked ? (
            <button onClick={changeDislikeStatus}>
              <MdThumbDown className="text-xl" />
            </button>
          ) : (
            <button onClick={changeDislikeStatus}>
              <MdOutlineThumbDown className="text-xl" />
            </button>
          )}
          <button onClick={handleRepliesClick}>
            <LiaCommentSolid className="text-xl" />
          </button>
        </div>
        {comment.commentReply > 0 && (
          <div
            className="cursor-pointer text-primary-500"
            onClick={handleRepliesClick}
          >
            <span>{comment.commentReply} replies</span>
          </div>
        )}
      </div>
    </div>
  );
};

// comment replies
const CommentReplies = ({
  commentIdToFetchReplies,
  testNumberToFetchReplies,
  errorLogout,
  commentReplies,
  setCommentReplies,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const effectRan = useRef(true);

  const getListeningCommentReplies = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: testNumberToFetchReplies,
        commentId: commentIdToFetchReplies,
      };
      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await getListeningUserCommentReplies(formData);
      console.log(response);
      if (!response.data.failure) {
        setCommentReplies(response.data.data.commentRepliesList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      getListeningCommentReplies();
      effectRan.current = false;
    }
  }, []);
  return (
    <div className="flex flex-col pt-3 pb-[4.5rem]">
      {commentReplies.map((comment, idx) => (
        <ReplyComment
          comment={comment}
          key={idx}
          idx={idx}
          errorLogout={errorLogout}
          setCommentReplies={setCommentReplies}
          testNumberToFetchReplies={testNumberToFetchReplies}
        />
      ))}
    </div>
  );
};

// reply comment item
const ReplyComment = ({
  comment,
  idx,
  setCommentReplies,
  errorLogout,
  testNumberToFetchReplies,
}) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLiked, setIsLiked] = useState(
    comment.whoLikeTheComment?.includes(userData.uid)
  );
  const [isDisliked, setIsDisliked] = useState(
    comment.whoDislikeTheComment?.includes(userData.uid)
  );

  // handle like change
  const changeLikeStatus = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: testNumberToFetchReplies,
        commentId:
          idx === 0 ? comment.uniqueCommentId : comment.replyToThisCommentId,
        replyId: comment.replyId,
        userLikeCommentOrReply: idx === 0 ? "0" : "1",
      };
      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await likeCommentReplyInListeningTest(formData);
      if (!response.data.failure) {
        setIsLiked(!isLiked);
        setIsDisliked(false);
        setCommentReplies(response.data.data.commentRepliesList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handle dislike change
  const changeDislikeStatus = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
        uniqueTestNumber: testNumberToFetchReplies,
        commentId:
          idx === 0 ? comment.uniqueCommentId : comment.replyToThisCommentId,
        replyId: comment.replyId,
        userLikeCommentOrReply: idx === 0 ? 0 : "1",
      };
      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await dislikeCommentReplyInListeningTest(formData);
      if (!response.data.failure) {
        setIsDisliked(!isDisliked);
        setIsLiked(false);
        setCommentReplies(response.data.data.commentRepliesList);
      } else {
        if (response.data.logout) {
          errorLogout(response.data.errorMessage);
        } else if (response.data.tokenInvalid) {
          toast.error(response.data.errorMessage);
        } else {
          toast.error(response.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className={`${idx !== 0 && "ml-10"} mb-5`}>
      <div className="flex gap-2 items-center">
        <img
          src={Avatar}
          className="w-6 h-6 object-contain rounded-full"
          alt=""
        />
        <span className="text-defaultGray">
          @{comment.userName} - {formatDate(comment.created_at)}
        </span>
      </div>
      <div className="px-10">
        <p className="">{comment.comment}</p>
        <div className="flex gap-4 my-2">
          <div className="flex gap-1">
            {isLiked ? (
              <button onClick={changeLikeStatus}>
                <MdThumbUp className="text-xl" />
              </button>
            ) : (
              <button onClick={changeLikeStatus}>
                <MdOutlineThumbUp className="text-xl" />
              </button>
            )}
            {comment.commentLike > 0 && <span>{comment.commentLike}</span>}
          </div>
          {isDisliked ? (
            <button onClick={changeDislikeStatus}>
              <MdThumbDown className="text-xl" />
            </button>
          ) : (
            <button onClick={changeDislikeStatus}>
              <MdOutlineThumbDown className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

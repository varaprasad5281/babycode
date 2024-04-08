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
  dislikeUserComment,
  getListeningComments,
  likeUserComment,
} from "../../../api/apiCall";
import { UserAuth } from "../../../context/AuthContext";

const ListeningModal = () => {
  const dispatch = useDispatch();
  const { listeningVideoDetails } = useSelector((state) => state.other);
  const { errorLogout } = UserAuth();
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    playing: true,
    controls: true,
  });
  const [comments, setComments] = useState([]);
  const effectRan = useRef(true);

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
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId"),
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      className="relative bg-white rounded-lg flex flex-col z-20 w-[100%] md:w-[45vw] max-h-[90vh] overflow-scroll mx-auto items-center"
    >
      <div className="flex sticky top-0 pt-4 md:pt-8 px-4 md:px-8 bg-white w-full items-center justify-between border-b border-black/20 pb-2">
        <h3 className="font-medium">Listening Practice</h3>
        <button onClick={closeModal} className="text-2xl">
          <IoMdClose />
        </button>
      </div>

      {isLoading ? (
        <div className="h-[90vh] md:h-[80vh] px-4 md:px-8 my-3 w-[100%] md:w-[45vw] flex justify-center items-center">
          <ImSpinner9 className="text-4xl md:text-6xl text-primary-100 animate-spin" />
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
              <button className="bg-primary-500 text-white hover:bg-primary-100 transition-colors duration-300 py-2 px-3 rounded-full text-sm">
                Check Band
              </button>
            </div>
            <h4 className="font-medium">
              Comments {comments.length > 0 && `(${comments.length})`}
            </h4>
            <div className="bg-[#F2F2F2] p-2 text-sm">
              Remember to keep comments respectful and to follow our community
              guidelines
            </div>
            <div>
              <div>
                {comments.length > 0 &&
                  comments.map((comment, idx) => (
                    <Comment
                      comment={comment}
                      key={comment.id}
                      test={listeningVideoDetails}
                      dispatch={dispatch}
                      errorLogout={errorLogout}
                      setComments={setComments}
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
                  className="rounded-lg text-sm outline-none border border-black/30 p-2 w-full"
                />
                <button className="text-2xl text-primary-500">
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ListeningModal;

const Comment = ({ comment, test, dispatch, errorLogout, setComments }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLiked, setIsLiked] = useState(
    comment.whoLikeTheComment?.includes(userData.uid)
  );
  const [isDisliked, setIsDisliked] = useState(
    comment.whoDislikeTheComment?.includes(userData.uid)
  );

  const changeLikeStatus = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId"),
        uniqueTestNumber: test.uniqueTestNumber,
        commentId: comment.uniqueCommentId,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await likeUserComment(formData);
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

  const dislikeTheComment = async () => {
    try {
      const data = {
        uid: userData.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId"),
        uniqueTestNumber: test.uniqueTestNumber,
        commentId: comment.uniqueCommentId,
      };

      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const response = await dislikeUserComment(formData);
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
            <button onClick={dislikeTheComment}>
              <MdThumbDown className="text-xl" />
            </button>
          ) : (
            <button onClick={dislikeTheComment}>
              <MdOutlineThumbDown className="text-xl" />
            </button>
          )}
          <button>
            <LiaCommentSolid className="text-xl" />
          </button>
        </div>
        {comment.commentReply > 0 && (
          <div className="cursor-pointer text-primary-500">
            <span>{comment.commentReply} replies</span>
          </div>
        )}
      </div>
    </div>
  );
};

import { TbExternalLink } from "react-icons/tb";
import { createJwt, formatDate } from "../../../utils/helpers";
import showRetakeTestAlert from "./RetakeTestAlertToast";
import {
  changeListeningModalStatus,
  setListeningVideoDetails,
  setLoading,
} from "../../../utils/redux/otherSlice";
import { startListeningTest } from "../../../api/apiCall";
import { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const ListeningTestItem = ({
  test,
  attendedTests,
  lastAttendedTest,
  getData,
}) => {
  const { errorLogout } = UserAuth();
  const dispatch = useDispatch();
  const [testStatus, setTestStatus] = useState("");

  const isOldTest = Boolean(lastAttendedTest?.id > test.id);
  const [attended, setAttended] = useState(
    attendedTests.includes(test.uniqueTestNumber)
  );

  // Check if the test is "Latest", "Pending", or "Completed"
  useEffect(() => {
    if (attended) {
      setTestStatus("Completed");
    } else if (isOldTest && !attended) {
      setTestStatus("Pending");
    } else if (!isOldTest) {
      setTestStatus("Latest");
    }
  }, [attended, isOldTest]);

  // start listening test
  const startTest = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    try {
      dispatch(setLoading(true));
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId: localStorage.getItem("uniqueDeviceId"),
        uniqueTestNumber: test.uniqueTestNumber,
        testFile: test.testFile,
        testNumber: test.id,
      };
      const encryptedData = createJwt(data);
      const formData = new FormData();
      formData.append("encrptData", encryptedData);
      const response = await startListeningTest(formData);
      console.log(response.data);
      if (!response.data.failure) {
        getData()
        setTestStatus("Completed");
        setAttended(true);
        dispatch(setListeningVideoDetails(test));
        dispatch(changeListeningModalStatus(true));
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleStartClick = () => {
    if (attended) {
      showRetakeTestAlert(test);
      return;
    }
    startTest();
  };
  return (
    <div className="w-full shadow-sm cursor-pointer" onClick={handleStartClick}>
      <div className="relative bg-white px-5 gap-2 py-3 flex items-center justify-between">
        {testStatus === "Latest" && !attended ? (
          <div className="absolute py-[.3rem] px-6 flex gap-1 items-center left-0 top-0 rounded-ee-2xl bg-[#135ADE] text-white">
            <span className="text-sm">Latest</span>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col gap-2 w-full lg:w-fit">
          <div className="flex gap-4 lg:gap-2 items-center">
            <img
              src={test.thumbnail}
              className="w-40 lg:aspect-video object-cover"
              alt=""
              loading="lazy"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium text-wrap">
                IELTS Listening practice test | Ep: {test.id}
              </h3>
              {testStatus === "Pending" && !attended ? (
                <div className="hidden lg:flex bg-[#f9dc5c2d] p-1 rounded-sm w-fit">
                  <span className="text-[#BB9B0B] text-sm">
                    You haven’t taken the test yet.
                  </span>
                </div>
              ) : (
                ""
              )}
              <span className="lg:hidden text-[#AAAAAA]">
                {formatDate(test.created_at)}
              </span>
            </div>
          </div>
        </div>
        <span className="hidden lg:flex text-[#AAAAAA] text-sm">
          {formatDate(test.created_at)}
        </span>
        <button
          onClick={handleStartClick}
          className="hidden lg:flex bg-primary-50 text-primary-500 hover:bg-primary-100 hover:text-primary-50 transition-colors duration-300 py-2 px-3 rounded-full font-medium"
        >
          Start Test
        </button>
        {attended && (
          <div className="absolute p-[0.3rem] flex gap-1 items-center right-0 bottom-0 rounded-ss-2xl bg-[#008A64] text-white">
            <div className="p-1 w-[1rem] h-[1rem] flex items-center text-sm justify-center rounded-full bg-white text-[#008A64]">
              ✔
            </div>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      {testStatus === "Pending" && !attended ? (
        <div className="lg:hidden bg-[#F9DC5C30] p-2 w-full">
          <div className="flex justify-between">
            <small className="text-sm">You haven’t taken this test yet.</small>
            <div
              className="text-primary-500 flex items-center gap-1 cursor-pointer"
              onClick={handleStartClick}
            >
              <span>Start Test</span>
              <TbExternalLink />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListeningTestItem;

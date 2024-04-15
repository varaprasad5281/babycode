import { useLayoutEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { createJwt, formatDate } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { startReadingTest } from "../../../api/apiCall";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setLoading } from "../../../utils/redux/otherSlice";
import showRetakeReadingTestAlert from "./RetakeReadingTestAlert";

const ReadingTestCard = ({
  test,
  attendedTests,
  lastAttendedTest,
  getData,
  number
}) => {
  const { errorLogout } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [testStatus, setTestStatus] = useState("");
  const { category } = useParams();
  const isOldTest = Boolean(lastAttendedTest?.id > test.id);
  const [attended, setAttended] = useState(
    attendedTests.includes(test.uniqueTestNumber)
  );
  const user = JSON.parse(localStorage.getItem("userData"));
  const uniqueDeviceId = localStorage.getItem("uniqueDeviceId");

  // Check if the test is "Latest", "Pending", or "Completed"
  useLayoutEffect(() => {
    if (attended) {
      setTestStatus("Completed");
    } else if (isOldTest && !attended) {
      setTestStatus("Pending");
    } else if (!isOldTest) {
      setTestStatus("Latest");
    }
  }, [attended, isOldTest]);

  const attendTest = async () => {
    try {
      dispatch(setLoading(true));
      // uid,platform,uniqueDeviceId,uniqueTestNumber,testFile,testNumber
      const data = {
        uid: user.uid,
        platform: "web",
        uniqueDeviceId,
        uniqueTestNumber: test.uniqueTestNumber,
        testFile: test.testFile,
        testNumber: test.testNumber,
      };
      const encryptedData = createJwt(data);

      const formData = new FormData();
      formData.append("encrptData", encryptedData);

      const res = await startReadingTest(formData);
      if (!res.data.failure) {
        setAttended(true);
        navigate(`/reading/${category}/material`, { state: { item: test } });
      } else {
        if (res.data.logout) {
          errorLogout(res.data.errorMessage);
        } else if (res.data.tokenInvalid) {
          toast.error(res.data.errorMessage);
        } else {
          toast.error(res.data.errorMessage);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleStartTestClick = () => {
    if (!attended) {
      attendTest();
    } else {
      showRetakeReadingTestAlert({ test, category });
    }
  };

  return (
    <div
      // to={`/reading/${category}/material`}
      // state={{ item: test }}
      className="test-card relative cursor-pointer"
      onClick={handleStartTestClick}
    >
      <div className="flex gap-2">
        <img
          className="md:aspect-[2/1] aspect-[1.5/1]  h-[70px]"
          src={test.thumbnail}
          alt="."
        />
        <div className="w-full flex flex-col justify-center overflow-hidden">
          <h2 className="font-[500]  text-[13px] lg:text-[14px]   ">
            IELTS Reading practice test | Ep: {number}
          </h2>
          <>
            {testStatus === "Pending" && (
              <p className={`status todo`}>You haven't taken test yet</p>
            )}
            {/* {testStatus === "Completed" && (
              <p className={`status completed`}>Completed</p>
            )} */}
            {testStatus === "Completed" && (
              <p className="absolute py-[.2rem] text-[10px] px-2 flex gap-1 items-center right-0 bottom-0 rounded-ss-2xl bg-[#008A64] text-white">
                Completed{" "}
              </p>
            )}
            {testStatus === "Latest" && (
              <p className="absolute py-[.2rem] text-[10px] px-2 flex gap-1 items-center left-0 top-0 rounded-ee-2xl bg-[#135ADE] text-white">
                Latest{" "}
              </p>
            )}{" "}
          </>
        </div>
      </div>

      <div>
        <p className="text-defaultGray hidden text-[11px] lg:flex">
          {formatDate(test.created_at)}
        </p>
      </div>
      <div className=" hidden md:flex">
        <button
          onClick={attendTest}
          className="p-2 px-3 bg-[#eaf0fc] text-[12px] rounded-full font-[600] text-[#135ade]"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default ReadingTestCard;

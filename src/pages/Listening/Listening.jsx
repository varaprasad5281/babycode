import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../assets/images/profile-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi";
import ListeningTests from "./components/ListeningTests";
import ImproveListening from "./components/ImproveListening";
import { ImHeadphones } from "react-icons/im";
import { getListeningPractiseData } from "../../api/apiCall";
import { checkAuth, createJwt } from "../../utils/helpers";
import { toast } from "react-hot-toast";
import { setLoading } from "../../utils/redux/otherSlice";
import { useDispatch } from "react-redux";
import { UserAuth } from "../../context/AuthContext";

const components = [
  { title: "Listening Tests" },
  { title: "Improve Listening", icon: <ImHeadphones /> },
];
const Listening = () => {
  const navigate = useNavigate();
  const { errorLogout } = UserAuth();
  const [componentToShow, setComponentToShow] = useState(0);
  const user = JSON.parse(localStorage.getItem("userData"));
  const uniqueDeviceId = localStorage.getItem("uniqueDeviceId") || "";
  const dispatch = useDispatch();
  const [testList, setTestList] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [attendedTests, setAttendedTests] = useState([]);
  const effectRan = useRef(true);

  // get listening tests
  const getData = async () => {
    if (checkAuth()) {
      try {
        dispatch(setLoading(true));
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId,
        };

        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);

        const response = await getListeningPractiseData(formData);
        if (!response.data.failure) {
          const listeningTestList = response.data.data?.listeningTestList;
          const materialsList = response.data.data?.materials;
          const attendedList = response.data.data?.userAttendedTest;
          setTestList(listeningTestList);
          setMaterials(materialsList);
          setAttendedTests(attendedList);
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
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      getData();
      effectRan.current = false;
    }
  }, []);
  return (
    <div className="w-full lg:max-h-screen bg-background overflow-scroll pb-5">
      <div className="sticky z-10 left-0 top-0 hidden lg:flex justify-end items-center py-[0.4rem] w-full bg-white">
        <div className="items-center gap-6 px-[3rem]">
          <div className="p-[.2rem] rounded-full cursor-pointer">
            <Link to="/profile">
              <img
                src={ProfileIcon}
                alt=""
                className="w-8 h-8 object-contain rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden fixed z-10 w-full px-6 py-3 border-b border-black/10 bg-white">
        <div
          className="flex text-xl items-center gap-2 w-fit cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <PiCaretLeftBold />
          <h5 className="">Listening Practice</h5>
        </div>
      </div>

      <div className="w-full lg:py-[2.2rem] overflow-scroll">
        <div className="hidden lg:flex items-center gap-1 px-6 lg:px-[3rem]">
          <Link to="/">Home</Link>
          <PiCaretRightBold />
          <Link to="/listening" className="text-primary-500">
            Listening
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-6 pt-11 lg:pt-0">
          <div className="grid grid-cols-2 sm:flex gap-4 px-6 lg:px-[3rem]">
            {components.map(({ title, icon }, idx) => (
              <div
                className={`${
                  componentToShow === idx
                    ? "border-b pb-1 border-primary-500 text-primary-500"
                    : "text-defaultGray"
                } cursor-pointer`}
                onClick={() => setComponentToShow(idx)}
                key={idx}
              >
                <div className="flex justify-center sm:justify-start items-center gap-2">
                  <div className="sm:hidden">{icon && icon}</div>
                  <span>{title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 w-full">
            {componentToShow === 0 ? (
              <ListeningTests
                tests={testList}
                attendedTests={attendedTests}
                getData={getData}
              />
            ) : (
              <ImproveListening materials={materials} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listening;

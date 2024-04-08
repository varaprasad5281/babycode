import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../assets/images/profile-icon.png";
import {
  PiCaretDownBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import OffcanvasData from "./components/OffcanvasData";
import { checkAuth, createJwt } from "../../utils/helpers";
import {
  setLoading,
  setVocabularyOffcanvasContent,
} from "../../utils/redux/otherSlice";
import { useDispatch } from "react-redux";
import { getVocabularyData, vocabularySearch } from "../../api/apiCall";
import { UserAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import VocabularyListItem from "./components/VocabularyListItem";
import OtherContentListItem from "./components/OtherContentListItem";
import VocabularyCategoryData from "./components/VocabularyCategoryData";
import { useDebouncedCallback } from "use-debounce";

const optionsList = [
  { id: 0, label: "Vocabulary" },
  { id: 1, label: "Idioms" },
  { id: 2, label: "Phrasal Verbs" },
  { id: 3, label: "Irregular Verbs" },
];

const Vocabulary = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const { errorLogout } = UserAuth();
  const dispatch = useDispatch();
  const effectRan = useRef(true);
  const uniqueDeviceId = localStorage.getItem("uniqueDeviceId");
  const [vocabularies, setVocabularies] = useState([]);
  const [otherResources, setOtherResources] = useState([]);
  const [showVocabularyCategoryData, setShowVocabularyCategoryData] =
    useState(false);
  const [selectedVocabularyCategory, setSelectedVocabularyCategory] = useState(
    {}
  );

  // get vocabulary data
  const getData = async () => {
    if (checkAuth()) {
      try {
        dispatch(setLoading(true));
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId,
          category: String(selectedOption),
        };
        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);

        const response = await getVocabularyData(formData);
        if (!response.data.failure) {
          if (selectedOption === 0) {
            setVocabularies(response.data.data.resourceList);
            setOtherResources([]);
          } else {
            setVocabularies([]);
            setOtherResources(response.data.data.resourceList);
          }
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

  // fixed the execution of the function running twice on mount
  useEffect(() => {
    if (!effectRan.current) {
      getData();
    } else {
      effectRan.current = false;
    }
  }, [selectedOption]);

  // search vocabularies
  const searchVocabulary = useDebouncedCallback(
    // function
    async (e) => {
      try {
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
          resourceName: e.target.value,
        };

        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);
        const response = await vocabularySearch(formData);
        console.log(response);
        if (!response.data.failure) {
          if (response.data.data.dataFromDb) {
            setVocabularies([]);
            setOtherResources(response.data.data.resourceList);
            setShowOffcanvas(false);
          } else {
            dispatch(
              setVocabularyOffcanvasContent({
                resourceName: e.target.value,
                resourceMeaning: response.data.data.resourceMeaning,
              })
            );
            setShowOffcanvas(true);
          }
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
    },
    // delay in ms
    1000
  );
  return (
    <div className="w-full lg:max-h-screen bg-background overflow-scroll pb-5 relative">
      <div className="sticky z-10 left-0 top-0 hidden lg:flex justify-end items-center py-[0.4rem] w-full bg-white">
        <div className="items-center gap-6 px-[3rem]">
          <div className="p-[.2rem] rounded-full cursor-pointer">
            <img
              src={ProfileIcon}
              alt=""
              className="w-8 h-8 object-contain rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex lg:hidden fixed z-10 w-full px-6 py-3 border-b border-black/10 bg-white">
        {showVocabularyCategoryData ? (
          <div
            className="flex text-xl items-center gap-2 w-fit cursor-pointer"
            onClick={() => setShowVocabularyCategoryData(false)}
          >
            <PiCaretLeftBold />
            <h5 className="">
              {selectedVocabularyCategory.vocabularyCategoryName}
            </h5>
          </div>
        ) : (
          <div
            className="flex text-xl items-center gap-2 w-fit cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <PiCaretLeftBold />
            <h5 className="">Vocabulary</h5>
          </div>
        )}
      </div>

      {showVocabularyCategoryData ? (
        <VocabularyCategoryData
          setShowVocabularyCategoryData={setShowVocabularyCategoryData}
          selectedVocabularyCategory={selectedVocabularyCategory}
          setShowOffcanvas={setShowOffcanvas}
        />
      ) : (
        <div className="w-full lg:py-[2.2rem] overflow-scroll">
          <div className="hidden lg:flex items-center gap-1 px-6 lg:px-[3rem]">
            <Link to="/">Home</Link>
            <PiCaretRightBold />
            <Link to="/vocabulary" className="text-primary-500">
              Vocabulary
            </Link>
          </div>

          <div className="flex flex-col gap-3 mt-6 pt-11 lg:pt-0">
            <div className="xl:hidden px-6 lg:px-[3rem]">
              <div className="flex items-center gap-4 w-full overflow-scroll">
                {optionsList.map((option) => (
                  <button
                    key={option.id}
                    className={`${
                      selectedOption === option.id
                        ? "bg-primary-500 text-white border-primary-500"
                        : "border-defaultGray text-defaultGray bg-transparent"
                    } rounded-full px-3 py-2 border min-w-[9rem] md:w-fit text-md`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <h4 className="text-lg font-medium px-6 lg:px-[3rem]">
              Improve your vocabulary by learning new words everyday!
            </h4>
            <div className="mt-1 xl:mt-3 w-full flex justify-between gap-3 items-center px-6 lg:px-[3rem]">
              <div className="hidden xl:flex gap-5">
                {optionsList.map((option) => (
                  <div
                    className={`${
                      selectedOption === option.id
                        ? "border-b pb-1 border-primary-500 text-primary-500"
                        : "text-defaultGray"
                    } cursor-pointer`}
                    onClick={() => setSelectedOption(option.id)}
                    key={option.id}
                  >
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white w-full xl:max-w-[15rem] border border-gray-300 py-1 px-2 rounded-full flex items-center gap-2">
                <IoIosSearch className="text-3xl text-defaultGray" />
                <input
                  type="text"
                  className="outline-none border-none w-full"
                  placeholder="Search words"
                  onChange={searchVocabulary}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3 sm:px-6 lg:px-[3rem]">
              {vocabularies.length > 0
                ? vocabularies.map((content, idx) => (
                    <VocabularyListItem
                      idx={idx}
                      key={content.id}
                      vocabulary={content}
                      setShowVocabularyCategoryData={
                        setShowVocabularyCategoryData
                      }
                      setSelectedVocabularyCategory={
                        setSelectedVocabularyCategory
                      }
                    />
                  ))
                : otherResources.map((content, idx) => (
                    <OtherContentListItem
                      idx={idx}
                      key={content.id}
                      content={content}
                      setShowOffcanvas={setShowOffcanvas}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
      <OffcanvasData
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={setShowOffcanvas}
      />
    </div>
  );
};

export default Vocabulary;

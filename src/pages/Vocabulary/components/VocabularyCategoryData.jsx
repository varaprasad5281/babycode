import React, { useEffect, useRef, useState } from "react";
import VocabularyCategoryItem from "./VocabularyCategoryItem";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { PiCaretRightBold } from "react-icons/pi";
import { checkAuth, createJwt } from "../../../utils/helpers";
import {
  setLoading,
  setVocabularyOffcanvasContent,
} from "../../../utils/redux/otherSlice";
import {
  getVocabularyCategoryData,
  vocabularySearch,
} from "../../../api/apiCall";
import { UserAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

const VocabularyCategoryData = ({
  setShowVocabularyCategoryData,
  selectedVocabularyCategory,
  setShowOffcanvas,
  setSelectedContent,
}) => {
  const [vocabularyData, setVocabularyData] = useState([]);
  const dispatch = useDispatch();
  const { errorLogout } = UserAuth();
  const user = JSON.parse(localStorage.getItem("userData"));
  const effectRan = useRef(true);

  // get vocabulary category data
  const getData = async () => {
    if (checkAuth()) {
      try {
        dispatch(setLoading(true));
        const data = {
          uid: user.uid,
          platform: "web",
          uniqueDeviceId: localStorage.getItem("uniqueDeviceId") || "",
          category: "4",
          resourceCategory: selectedVocabularyCategory.vocabularyCategoryName,
        };
        const encryptedData = createJwt(data);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);

        const response = await getVocabularyCategoryData(formData);
        if (!response.data.failure) {
          setVocabularyData(response.data.data.resourceList);
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
  }, []);

  // search with input
  const searchWithInput = async (e) => {
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
          setVocabularyData(response.data.data.resourceList);
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
  };

  // search vocabularies
  const searchVocabulary = useDebouncedCallback(
    // function
    (e) => searchWithInput(e),
    // delay in ms
    1000
  );

  // handle enter key click on search
  const handleClickEnterOnSearch = (e) => {
    searchWithInput(e);
  };
  return (
    <div className="w-full overflow-scroll pt-[4rem] lg:pt-0">
      <div className="w-full lg:py-[2.2rem] overflow-scroll flex flex-col gap-4">
        <div className="hidden lg:flex items-center gap-1 px-6 lg:px-[3rem]">
          <Link to="/">Home</Link>
          <PiCaretRightBold />
          <Link
            to="/vocabulary"
            onClick={() => setShowVocabularyCategoryData(false)}
          >
            Vocabulary
          </Link>
          <PiCaretRightBold />
          <Link className="text-primary-500">
            {selectedVocabularyCategory?.vocabularyCategoryName}
          </Link>
        </div>

        <div className="bg-white lg:max-w-xs border border-gray-300 py-1 px-2 rounded-full flex items-center gap-2 mx-6 lg:mx-[3rem]">
          <IoIosSearch className="text-3xl text-defaultGray" />
          <input
            type="text"
            className="outline-none border-none w-full"
            placeholder="Search words"
            onChange={searchVocabulary}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClickEnterOnSearch(e);
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-2 sm:px-6 lg:px-[3rem]">
          {vocabularyData.length > 0 &&
            vocabularyData.map((vocabulary) => (
              <VocabularyCategoryItem
                vocabulary={vocabulary}
                key={vocabulary.id}
                setShowOffcanvas={setShowOffcanvas}
                setSelectedContent={setSelectedContent}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularyCategoryData;

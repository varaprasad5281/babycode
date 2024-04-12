import { FaRupeeSign } from "react-icons/fa";
import book from "../../../assets/images/book-image.png";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaLock } from "react-icons/fa";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Fragment, useState } from "react";
import { PiCaretLeftBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import RateModal from "./RateModal";
import BuyModal from "./BuyModal";

const data = [
  {
    author: "Ramanadeep Sharma",
    title: "Best Speaking Practice(+2 Classes)",
    price: "1000",
    actualprice: "1200",
    image: book,
  },
  {
    author: "Ramanadeep Sharma",
    title: "Best Speaking Practice(+2 Classes)",
    price: "1000",
    actualprice: "1200",
    image: book,
  },
  {
    author: "Ramanadeep Sharma",
    title: "Best Speaking Practice(+2 Classes)",
    price: "1000",
    actualprice: "1200",
    image: book,
  },
];

const Buycard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] pt-5 gap-4 flex-wrap">
      {data.map((e, i) => (
        <Fragment key={i}>
          <div
            onClick={toggleDrawer}
            className="p-3 shadow bg-gradient-to-t relative rounded-2xl overflow-hidden from-[#ffe4c8] to-[#fffcf1]"
          >
            <div className="absolute p-3 right-0 top-0 rounded-bl-2xl shadow-[-2px_2px_3px_#00000040] bg-[#fced86]">
              <FaLock color="#a66b00" />
            </div>
            <p className="text-[10px] py-1 p-2 text-white w-fit bg-[#F58732]">
              By {e.author}
            </p>
            <div className="flex gap-3">
              <div className="py-2">
                <h1 className="text-[16px] font-[500]">{e.title}</h1>
                <p className="flex items-center text-[#310D7B]">
                  {" "}
                  <LiaRupeeSignSolid /> {e.price}{" "}
                  <span className="flex mx-2 items-center text-[10px] text-[#5D5D5D] line-through">
                    {" "}
                    <LiaRupeeSignSolid />
                    {e.actualprice}
                  </span>{" "}
                </p>
              </div>
              <div>
                <img src={e.image} className="h-24" />
              </div>
            </div>
            <p className="border w-fit text-[11px] p-1 px-4 rounded-full text-[#F58732] border-[#F58732]">
              Buy
            </p>
            <Drawer
              //   onClose={toggleDrawer}
              open={isOpen}
              direction="right"
              className="!w-full max-w-[450px]"
            >
              <div className="p-3">
                <button className=" flex items-center gap-4">
                  <PiCaretLeftBold /> Book Details
                </button>

                <div className="p-3 flex flex-col gap-3">
                  <div className="bg-[#f3f6fa] rounded-lg p-3 flex justify-center items-center">
                    <img src={book} className="h-36" alt="." />
                  </div>
                  <p className="text-[10px] py-1 p-2 text-white w-fit bg-[#10b4a0]">
                    By {e.author}
                  </p>
                  <div>
                    <h1 className="font-[500]">
                      Writing Test ( 2 Sets of paper)
                    </h1>
                    <p className="text-[#6B6A6A]">
                      Test is designed by expert teachers in their field. Its is
                      designed according to the latest updates IELTS syllabus.
                    </p>
                  </div>
                  <div className="text-[#DD6031] flex gap-2 items-center">
                    <FaStar />
                    <p>4.5/ 5.0</p>
                    <p className="text-[#6B6A6A]">(26)</p>
                  </div>{" "}
                  <p className="flex items-center text-[18px]">
                    {" "}
                    <LiaRupeeSignSolid /> {e.price}{" "}
                    <span className="flex mx-2 items-center text-[10px] text-[#5D5D5D] line-through">
                      {" "}
                      <LiaRupeeSignSolid />
                      {e.actualprice}
                    </span>{" "}
                  </p>
                  <div>
                    <div className="flex justify-between items-center">
                      <p>Student Reviews(20)</p>
                      <RateModal e={e} book={book} />
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      {[
                        {
                          name: "Keerthi",
                          date: "8feb, 2022",
                          rating: "4.5",
                          review:
                            "I'm very happy and thankful to Ramandeep sir for test, Its truly helped me to enhance my writing skills",
                        },
                      ].map((k) => (
                        <div className="border border-[#E7E7E7] p-3 rounded-2xl">
                          <div>
                            <div></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <BuyModal e={e} />
                </div>
              </div>
            </Drawer>{" "}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Buycard;

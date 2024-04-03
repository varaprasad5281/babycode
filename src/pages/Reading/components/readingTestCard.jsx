import reading from "../../../assets/images/reading-image.png";

const ReadingTestCard = ({ item }) => {
  const { title, status, date } = item;
  return (
    <div className="test-card">
      <div className="flex gap-2">
        <img
          className="md:aspect-[2/1] aspect-[1.5/1]  h-[70px]"
          src={reading}
          alt="."
        />
        <div className="w-full overflow-hidden">
          <h2 className="font-[500]  text-[13px] lg:text-[16px] text-nowrap whitespace-nowrap  ">
            {title}
          </h2>
          <>
            {status === "todo" && (
              <p className={`status todo`}>You haven't taken test yet</p>
            )}
            {status === "completed" && (
              <p className={`status completed`}>Completed</p>
            )}
            {status === "inprogress" && (
              <p className={`status inprogress`}>In Progress </p>
            )}{" "}
          </>
          <>
            <p className="text-defaultGray text-[12px] ">3 hours ago</p>
          </>
        </div>
      </div>
      <div>
        <p className="text-defaultGray hidden lg:flex"> {date}</p>
      </div>
      <div className=" hidden md:flex">
        <button className="p-2 px-3 bg-[#eaf0fc] text-[12px] rounded-full font-[600] text-[#135ade]">
          Start Test
        </button>
      </div>
    </div>
  );
};

export default ReadingTestCard;

import React from "react";

const ViewSerials = ({ serials, total_weight, userSerials,wallet }) => {
  // Find the objects that match the serials
  const matchedSerials = userSerials.filter((item) =>
    serials.some((target) => item?.serial?.includes(target))
  );
  return (
    <div>
      <h1 className="text-[#333333] text-3xl font-medium my-16 text-center">
        {Math.abs(total_weight)} {wallet.grams}
      </h1>
      {matchedSerials?.map(({ serial, weight }, index) => (
        <div className="flex items-center justify-between" key={index + weight}>
          <p className="font-medium text-lg text-[#595959]"> {serial} </p>
          <p className="font-medium text-lg text-[#595959]">{weight} {wallet.gram}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewSerials;

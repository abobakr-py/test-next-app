import { useErrorMessage } from "@/Zustand/ErrorMessage";
import Image from "next/image";
import closecircle from "../../assets/close-circle.svg";

const ResponseError = ({ ...props }) => {
  const { message, severity } = useErrorMessage();

  if (!message || severity !== "error") return null;

  return (
    <div
      {...props}
      className="flex items-center bg-[#DC35450D] py-4 px-6 rounded-xl mt-14"
    >
      <Image src={closecircle} alt={"closecircle"} className="" />
      <span className="text-[#DC3545] text-xs font-notoKufi-500 ml-2 mr-2">
        {message}
      </span>
    </div>
  );
};

export default ResponseError;

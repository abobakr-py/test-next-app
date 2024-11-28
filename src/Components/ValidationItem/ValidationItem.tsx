import Image from "next/image";
import unchecked from "../../assets/tick-circle.svg";
import checked from "../../assets/checked.svg";

const ValidationItem: React.FC<{ isValid: any; label: string }> = ({
  isValid,
  label,
}) => (
  <p
    className={`flex items-center gap-2 text-[0.625rem] font-notoKufi-400 ${
      isValid ? "text-[#121212] " : "text-[#B3B3B3]"
    }`}
  >
    <Image
      src={isValid ? checked : unchecked}
      alt={isValid ? "checked" : "unchecked"}
      className=""
      loading="eager"
    />
    {label}
  </p>
);
export default ValidationItem;

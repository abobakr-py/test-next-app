import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "google";
  icon: IconType;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "default",
  onClick,
  icon: Icon,
  isLoading = false,
  ...props
}) => {
  const baseClasses =
    variant === "google"
      ? "w-full py-4 rounded-xl text-[#121212] font-notoKufi-500 flex flex-row justify-center"
      : "w-full py-4 rounded-xl text-white font-notoKufi-500 flex flex-row justify-center";
  const variantClasses =
    variant === "google"
      ? "bg-white text-black border border-[#121212]"
      : "bg-black hover:bg-gray-800";

  return (
    <>
      {variant === "google" ? (
        <button
          className={`${baseClasses} ${variantClasses}`}
          onClick={onClick}
          {...props}
        >
          <Icon size={24} className="text-inherit ml-2" />
          {label}
        </button>
      ) : (
        <button
          className={`${baseClasses} ${variantClasses}`}
          onClick={onClick}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? ( // Show spinner or change label during loading
            <>
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-2 rounded-full"></div>
            </>
          ) : (
            <>
              {label}
              <Icon size={24} className="text-inherit mr-2 ml-2" />
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;

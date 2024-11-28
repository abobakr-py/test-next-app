import React, { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder: string;
  icon: IconType;
  value: string;
  name: string;
  lang?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<TextFieldProps> = ({
  type,
  placeholder,
  icon: Icon,
  value,
  name,
  onChange,
  error,
  lang = "ar",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className="flex flex-col mb-4 text-[#B3B3B3]">
        <div
          className={`relative flex items-center mb-2 focus-within:text-[#121212] ${
            error ? "text-[#DC3545]" : ""
          }`}
        >
          <input
            type={showPassword ? "text" : type} // Toggle between 'text' and 'password'
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            className={`w-full border-2 rounded-xl px-4 py-3 pr-10 pl-10 focus:outline-none  focus:border-[#121212] focus:placeholder-[#121212] font-notoKufi-400 ${
              error ? "border-[#DC3545]" : "border-[#E6E6E6]"
            }`}
            {...props}
          />
          <div
            className={`absolute ${
              lang === "en" ? "left-3" : "right-3"
            } flex items-center space-x-2`}
          >
            <Icon size={24} className="text-inherit" />
          </div>
          {type === "password" && ( // Show eye icon only for password fields
            <button
              className={`absolute ${lang === "en" ? "right-3" : "left-3"}`}
              onClick={togglePasswordVisibility}
              type="button"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={24} className="text-inherit" />
              ) : (
                <AiOutlineEye size={24} className="text-inherit" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-[#DC3545] text-xs font-notoKufi-400">{error}</p>
        )}
        <style jsx>{`
          input::placeholder {
            color: ${error ? "#DC3545" : "#B3B3B3"};
          }
        `}</style>
      </div>
    </>
  );
};

export default InputField;

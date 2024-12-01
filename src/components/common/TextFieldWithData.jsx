const TextFieldWithData = ({ title, data, className }) => {
  return (
    <div className="flex items-center justify-between py-2 w-full ">
      <p
        className={`text-[#595959] font-medium  ${
          className ? className : "text-lg "
        }`}
      >
        {title} :
      </p>
      <p className="text-lg font-medium">{data}</p>
    </div>
  );
};

export default TextFieldWithData;

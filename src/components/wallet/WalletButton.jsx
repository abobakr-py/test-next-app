import Image from "next/image";

const WalletButton = ({ imageUrl, title ,onClick}) => {
  return (
    <button className="flex items-center justify- gap-2 w-full" onClick={onClick}>
      <Image src={imageUrl} alt={title} />
      <p className="text-[#e9c237] text-lg font-medium">{title}</p>
    </button>
  );
};

export default WalletButton;

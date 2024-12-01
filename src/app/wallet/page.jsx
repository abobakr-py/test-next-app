import dynamic from "next/dynamic";
const DynamicWallet = dynamic(() => import("@/components/wallet/Wallet"), {
  ssr: false,
});
const page = () => {
  return <DynamicWallet />;
};

export default page;

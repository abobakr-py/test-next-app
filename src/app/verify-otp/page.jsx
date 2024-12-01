import dynamic from "next/dynamic";
const DynamicVerifyOTP = dynamic(() =>
  import("@/components/VerifyOTP/VerifyOTP"),
{ ssr: false }
);
const page = () => {
  return <DynamicVerifyOTP />;
};

export default page;

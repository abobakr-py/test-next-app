import dynamic from "next/dynamic";
const DynamicVerifyPassReset = dynamic(
  () => import("@/components/VerifyPassReset/VerifyPassReset"),
  { ssr: false }
);
const page = () => {
  return <DynamicVerifyPassReset />;
};

export default page;

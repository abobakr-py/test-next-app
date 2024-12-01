import dynamic from "next/dynamic";
const DynamicForgetPassword = dynamic(
  () => import("@/components/ForgetPassword/ForgetPassword"),
  { ssr: false }
);
const page = () => {
  return <DynamicForgetPassword />;
};

export default page;

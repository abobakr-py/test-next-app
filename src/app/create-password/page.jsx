import dynamic from "next/dynamic";
const DynamicCreatePassword = dynamic(
  () => import("@/components/CreatPassword/CreatePassword"),
  { ssr: false }
);
const page = () => {
  return <DynamicCreatePassword />;
};

export default page;

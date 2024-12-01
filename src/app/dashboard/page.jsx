import dynamic from "next/dynamic";
const Home = dynamic(
  () => import("@/components/home/Dashboard"),
  { ssr: false }
);
const page = () => {
  return <Home />;
};

export default page;


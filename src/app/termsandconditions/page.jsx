"use client";
import useWindowSize from "@/helper/useWindowSize";
import dynamic from "next/dynamic";
const DynamicTermsAndConditions = dynamic(
  () => import("@/components/TermsAndConditionsAndPolicy/TermsAndConditions"),
  { ssr: false }
);

export default function Home() {
  const { width } = useWindowSize();

  return (
    <main className="overflow-hidden">
      {width <= 640 ? (
        <div className="relative sm:hidden">
          <DynamicTermsAndConditions mobile={true} />
        </div>
      ) : (
        <div className="relative hidden sm:flex sm:flex-col sm:min-h-screen">
          <DynamicTermsAndConditions />
        </div>
      )}
    </main>
  );
}

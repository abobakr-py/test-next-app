"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Image from "next/image";
import LatestArticles from "./home/LatestArticles";
import { getCookie } from "cookies-next";
import RecommendedArticles from "./home/RecommendedArticles";
import Footer from "./home/Footer";
import {
  useFetchRandomArticles,
  useFetchRecommendedArticles,
} from "@/Apis/Articles/queries";
import { imageBaseUrl } from "@/config/axiosInstance";
import Markdown from "markdown-to-jsx";
import { format } from "date-fns";
import Loader from "@/Components/Loader/Loader";

const Home = () => {
  const t = useTranslations();
  const router = useRouter();
  const lang = getCookie("NEXT_LOCALE");
  const {
    data: RecommendedArticlesData,
    isLoading: RecommendedArticlesLoading,
  } = useFetchRecommendedArticles({
    limit: 4,
  });
  const { data: RandomArticlesData, isLoading: RandomArticlesLoading } =
    useFetchRandomArticles();

  const firstArticle =
    RecommendedArticlesData && RecommendedArticlesData?.result[0];
  const domain = imageBaseUrl;
  const truncateText = (text: string, wordLimit: number) => {
    const words = text?.split(" ");
    if (words?.length > wordLimit && lang === "ar") {
      return words?.slice(0, wordLimit)?.join(" ") + "...";
    } else if (words?.length > wordLimit && lang === "en") {
      return words?.slice(0, wordLimit)?.join(" ") + "...";
    }
    return text;
  };

  const handleArticleClick = (articleId: string) => {
    router.push(`/ArticleDetails?id=${articleId}`);
  };
  const handlePortfolioNavigation = (e: React.FormEvent) => {
    e.stopPropagation();
    router.push(`/Portfolio`);
  };

  if (RecommendedArticlesLoading || RandomArticlesLoading) return <Loader />;
  return (
    <div className="w-[100%] lg:w-[1344px] mx-auto h-full flex flex-col py-4">
      <div className="lg:w-[100%] w-[95%] mx-auto pt-6">
        <Navbar lang={lang} />
      </div>

      <div
        dir="rtl"
        className="flex flex-col justify-start items-center h-screen "
      >
        {firstArticle && (
          <div
            onClick={() => {
              handleArticleClick(RecommendedArticlesData?.result[0]?.id);
            }}
            className="relative w-full h-5/6 mt-10 cursor-pointer bg-red-400"
          >
            <Image
              src={`${domain}/${firstArticle?.photo}`}
              alt="home"
              className="w-full h-full object-cover"
              priority
              width={1344}
              height={901}
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            {/* Black overlay */}
            <div className="absolute bottom-0 py-10 px-6 bg-white text-[#121212] lg:w-[65%]">
              <h1 className="text-4xl font-notoKufi-600 text-[#121212]">
                {firstArticle.title}
              </h1>
              <Markdown
                className="text-base font-notoKufi-400 text-[#595959] mt-4 flex"
                options={{ forceBlock: true }}
              >
                {truncateText(firstArticle?.body, 20)}
              </Markdown>
              <span className="block text-sm mt-4 font-notoKufi-400 text-[#595959]">
                <span
                  className="underline cursor-pointer"
                  onClick={(e) => {
                    handlePortfolioNavigation(e);
                  }}
                >
                  {firstArticle?.adminName}
                </span>{" "}
                - {format(new Date(firstArticle?.created), "yyyy/MM/dd")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* latest articles  */}
      <LatestArticles
        articles={RecommendedArticlesData}
        isLoading={RecommendedArticlesLoading}
      />

      {/* recommended articles  */}
      <RecommendedArticles articles={RandomArticlesData} />

      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default Home;

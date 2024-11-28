"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import heart from "../../../assets/heart.svg";
import heartFilled from "../../../assets/heartFilled.svg";
import bookmark from "../../../assets/bookmark.svg";
import archive from "../../../assets/archive.svg";
import { imageBaseUrl } from "@/config/axiosInstance";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { getCookie } from "cookies-next";
import { useSaveArticleMutation } from "@/Apis/Articles/mutation";

interface RecommendedProps {
  articles?: any;
}
const RecommendedArticles = ({ articles }) => {
  const router = useRouter();
  const t = useTranslations("homePage");
  const domain = imageBaseUrl;
  const handleArticleClick = (articleId: string) => {
    router.push(`/ArticleDetails?id=${articleId}`);
  };
  const lang = getCookie("NEXT_LOCALE");
  const [savedArticles, setSavedArticles] = useState<{
    [key: string]: boolean;
  }>(
    articles?.reduce((acc: any, article: any) => {
      acc[article.id] = article.is_saved;
      return acc;
    }, {})
  );
  const { mutate: saveArticle } = useSaveArticleMutation();
  const handleSaveArticle = (articleId: string, e: React.FormEvent) => {
    e.stopPropagation();
    setSavedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId], // Optimistically toggle the saved state
    }));

    saveArticle(articleId, {
      onError: () => {
        // Revert the change if the API call fails
        setSavedArticles((prev) => ({
          ...prev,
          [articleId]: !prev[articleId],
        }));
      },
    });
  };
  const handlePortfolioNavigation = (e: React.FormEvent) => {
    e.stopPropagation();
    router.push(`/Portfolio`);
  };
  return (
    <div className="py-24 lg:px-12 px-4 mt-24">
      <p className="font-notoKufi-600 text-[#121212] text-4xl">
        {t("SuggestedArticles")}
      </p>
      {/* <div className="w-[97%] mx-auto mt-8 "> */}
      <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2  mt-8">
        {articles.map((article: any, index: any) => (
          <div
            key={article.id}
            onClick={() => {
              handleArticleClick(article?.id);
            }}
            className={` cursor-pointer lg:p-10 flex flex-col items-center justify-between h-full pb-8
    ${
      index % 2 !== 0 ? (lang === "en" ? "lg:border-l" : "lg:border-r") : ""
    }   first-line:
    ${index >= 2 ? "lg:border-t" : ""}        
  `}
            style={{ minHeight: "400px" }}
          >
            {/* Image Section */}
            <div className="mb-4 mx-auto w-full h-72">
              <Image
                src={`${domain}/${article?.photo}`}
                alt={article.title}
                className="w-full h-full object-cover"
                width={592}
                height={279}
                crossOrigin="anonymous"
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between w-full h-full">
              <h3 className="text-2xl font-notoKufi-500 text-[#333333]">
                {article.title}
              </h3>
              <p className=" text-base font-notoKufi-400 text-[#595959]">
                {article.description}
              </p>
              <span className=" text-xs font-notoKufi-400 text-[#595959] mt-3">
                <span
                  className="underline cursor-pointer"
                  onClick={(e) => {
                    handlePortfolioNavigation(e);
                  }}
                >
                  {article?.adminName}
                </span>{" "}
                - {format(new Date(article?.created), "yyyy/MM/dd")}
              </span>

              {/* Actions */}
              <div className="flex lg:flex-row flex-col justify-between lg:items-center items-end mt-4">
                {/* Tags Section */}
                <div className="flex flex-row flex-wrap lg:w-[85%] w-full">
                  {article.tags.map((item: any) => (
                    <div
                      className="bg-[#F2F2F2] rounded-full py-2 px-6 mx-4 mt-3"
                      key={item.id}
                    >
                      <p className="text-[#404040] font-notoKufi-400 text-[0.625rem]">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex mt-3">
                  <div
                    onClick={(e) => {
                      handleSaveArticle(article?.id, e);
                    }}
                    className="w-6 h-6 "
                  >
                    {savedArticles[article?.id] ? (
                      <Image
                        src={archive}
                        alt={"isBookmarked"}
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    ) : (
                      <Image
                        src={bookmark}
                        alt={"Bookmarked"}
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* </div> */}
    </div>
  );
};

export default RecommendedArticles;

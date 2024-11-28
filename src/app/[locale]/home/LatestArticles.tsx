"use client";
import Image from "next/image";
import React, { useState } from "react";
import bookmark from "../../../assets/bookmark.svg";
import archive from "../../../assets/archive.svg";
import { getCookie } from "cookies-next";
import { imageBaseUrl } from "@/config/axiosInstance";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useSaveArticleMutation } from "@/Apis/Articles/mutation";

interface ArticlesProps {
  articles?: any;
  isLoading: boolean;
}
const LatestArticles = ({ articles, isLoading }) => {
  const router = useRouter();
  const lang = getCookie("NEXT_LOCALE");
  const t = useTranslations("homePage");
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
  const [savedArticles, setSavedArticles] = useState<{
    [key: string]: boolean;
  }>(
    articles?.result?.reduce((acc: any, article: any) => {
      acc[article.id] = article.is_saved;
      return acc;
    }, {})
  );

  const { mutate: saveArticle } = useSaveArticleMutation();
  const handlePortfolioNavigation = (e: React.FormEvent) => {
    e.stopPropagation();
    router.push(`/Portfolio`);
  };
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
  return (
    <div className="bg-[#FAFAFA] py-24 lg:px-12 px-4 mt-24">
      <div className="flex flex-row justify-between items-center">
        <p className="font-notoKufi-600 text-[#121212] text-4xl">
          {t("LatestArticles")}
        </p>
        <p
          onClick={() => {
            router.push(`/AllArticles`);
          }}
          className="font-notoKufi-500 text-[#121212] text-sm underline cursor-pointer"
        >
          {t("all")}
        </p>
      </div>
      <div dir="rtl" className="lg:w-[97%] w-[100%] mx-auto mt-8">
        {articles?.result?.slice(1).map((article: any, index: any) => (
          <div
            key={article.id}
            onClick={() => {
              handleArticleClick(article?.id);
            }}
          >
            <div className="flex flex-row lg:p-8 justify-between lg:items-center cursor-pointer">
              {/* Content Section */}
              <div className="flex flex-col w-2/3 justify-between  lg:h-48 h-auto">
                <h2 className="lg:text-2xl text-base font-notoKufi-500 text-[#333333] ">
                  {article.title}
                </h2>
                <Markdown
                  className="lg:text-sm text-xs font-notoKufi-400 text-[#595959] mt-3 lg:flex hidden"
                  options={{ forceBlock: true }}
                >
                  {truncateText(article?.body + "...", 20)}
                </Markdown>
                <Markdown
                  className=" lg:text-sm text-xs font-notoKufi-400 text-[#595959] mt-3 flex lg:hidden"
                  options={{ forceBlock: true }}
                >
                  {truncateText(article?.body, 5)}
                </Markdown>
                <span className="text-xs font-notoKufi-400 text-[#595959] mt-3 mb-2">
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
                <div className="lg:flex lg:flex-row flex-col justify-between lg:items-center flex-wrap w-[100%] mt-2 hidden ">
                  <div className="flex flex-row flex-wrap ">
                    {article.tags.map((item: any) => (
                      <div
                        className={`bg-[#F2F2F2] rounded-full py-2 px-6 ${
                          lang === "en" ? "mr-4" : "ml-4"
                        } `}
                        key={item.id}
                      >
                        <p className="text-[#404040] font-notoKufi-400 text-[0.625rem]">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex lg:justify-start justify-end ">
                    <div
                      onClick={(e) => {
                        handleSaveArticle(article?.id, e);
                      }}
                      className="w-6 h-6 "
                    >
                      {savedArticles[article.id] ? (
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
              {/* Image Section */}
              <div className="w-1/4 lg:h-48 h-1/3">
                <Image
                  src={`${domain}/${article?.photo}`}
                  alt={"article image"}
                  className="w-full h-full object-contain"
                  //   layout="responsive"
                  width={360}
                  height={184}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
            <div className="flex lg:hidden lg:flex-row flex-col justify-between lg:items-center flex-wrap w-[100%] mt-2">
              <div className="flex flex-row flex-wrap ">
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
              <div className="flex lg:justify-start justify-end  mt-3">
                <div
                  onClick={(e) => {
                    handleSaveArticle(article?.id, e);
                  }}
                  className="w-6 h-6 "
                >
                  {savedArticles[article.id] ? (
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
            {index !== articles?.result?.length - 2 && (
              <div className="h-[1px] w-full bg-[#E6E6E6] mb-8 mt-8"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;

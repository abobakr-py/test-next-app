"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import archive from "../../../assets/archive.svg";
import { getCookie } from "cookies-next";
import { imageBaseUrl } from "@/config/axiosInstance";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useSaveArticleMutation } from "@/Apis/Articles/mutation";
import { Skeleton } from "@mui/material";

interface ArticlesProps {
  articles?: any;
  isLoading: boolean;
  fetchNextPage: any;
  refetch: any;
  hasNextPage: boolean;
}
const SavedArticles: React.FC<ArticlesProps> = ({
  articles,
  isLoading,
  fetchNextPage,
  hasNextPage,
  refetch,
}) => {
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
    () =>
      articles?.result?.reduce((acc: any, article: any) => {
        acc[article.id] = article.is_saved;
        return acc;
      }, {}) || {}
  );
  const observerRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isLoading]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "50px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const { mutate: saveArticle } = useSaveArticleMutation();
  useEffect(() => {
    console.log("Articles saved ", articles);
  }, [articles]);
  const handleSaveArticle = (articleId: string, e: React.FormEvent) => {
    e.stopPropagation();

    saveArticle(articleId, {
      onSuccess: () => {
        // Refetch articles on successful save
        refetch();
      },
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
    <div className="w-full h-full">
      <p className="lg:flex hidden font-notoKufi-600 text-[#121212] text-2xl">
        المقالات المفضلة
      </p>
      <div className="lg:w-[100%] w-[100%] mx-auto mt-6">
        {isLoading &&
          // Display Skeleton loading placeholders when loading
          Array.from(new Array(4)).map((_, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row lg:p-8 p-4 justify-between lg:items-center cursor-pointer w-4/5"
            >
              <div className="flex flex-col w-full lg:w-2/3 justify-between lg:h-48 h-auto">
                {/* Skeleton for Title */}
                <Skeleton variant="text" width="80%" height={30} />

                {/* Skeleton for Article Body */}
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />

                {/* Skeleton for Admin Name and Date */}
                <Skeleton variant="text" width="60%" height={20} />

                {/* Skeleton for Tags */}
                <div className="flex flex-row flex-wrap mt-2">
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={25}
                    className="rounded-full mr-4"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={25}
                    className="rounded-full mr-4"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={25}
                    className="rounded-full mr-4"
                  />
                </div>
              </div>

              {/* Skeleton for Image */}
              <div className="w-1/4 lg:h-48 h-1/3">
                <Skeleton variant="rectangular" width={360} height={184} />
              </div>
            </div>
          ))}
        {!isLoading &&
          articles &&
          articles.pages.map(
            (
              page: { data: { savedArticles: { result: any[] } } },
              pageIndex: React.Key | null | undefined
            ) => (
              <div key={pageIndex}>
                {page.data?.savedArticles?.result.length > 0 ? (
                  <>
                    {page.data.savedArticles.result.map(
                      (article: any, index: number) => (
                        <div
                          onClick={() => handleArticleClick(article.id)}
                          key={article.id}
                        >
                          <div className="flex flex-row lg:p-8 justify-between lg:items-center cursor-pointer">
                            {/* Content Section */}
                            <div className="flex flex-col w-2/3 justify-between lg:h-48 h-auto">
                              <h2 className="lg:text-2xl text-base font-notoKufi-500 text-[#333333]">
                                {article.title}
                              </h2>
                              <Markdown
                                className="lg:text-sm text-xs font-notoKufi-400 text-[#595959] mt-3 lg:flex hidden"
                                options={{ forceBlock: true }}
                              >
                                {truncateText(article?.body, 20)}
                              </Markdown>
                              <Markdown
                                className="lg:text-sm text-xs font-notoKufi-400 text-[#595959] mt-3 flex lg:hidden"
                                options={{ forceBlock: true }}
                              >
                                {truncateText(article?.body, 5)}
                              </Markdown>
                              <span className="text-xs font-notoKufi-400 text-[#595959] mt-3 mb-2">
                                {article?.adminName} -{" "}
                                {format(
                                  new Date(article?.created),
                                  "yyyy/MM/dd"
                                )}
                              </span>

                              {/* Actions */}
                              <div className="lg:flex lg:flex-row flex-col justify-between lg:items-center flex-wrap w-[100%] mt-2 hidden ">
                                <div className="flex flex-row flex-wrap ">
                                  {article.tags.map((item: any) => (
                                    <div
                                      className={`bg-[#F2F2F2] rounded-full py-2 px-6 ${
                                        lang === "en" ? "mr-4" : "ml-4"
                                      }`}
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
                                    onClick={(e) =>
                                      handleSaveArticle(article?.id, e)
                                    }
                                    className="w-6 h-6 "
                                  >
                                    <Image
                                      src={archive}
                                      alt={"isBookmarked"}
                                      className="w-full h-full object-contain cursor-pointer"
                                    />
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
                                width={360}
                                height={184}
                                crossOrigin="anonymous"
                              />
                            </div>
                          </div>

                          {pageIndex !== articles.pages.length - 1 ||
                          index !==
                            page.data.savedArticles.result.length - 1 ? (
                            <div className="h-[1px] w-full bg-[#E6E6E6] mb-8 mt-8"></div>
                          ) : null}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <div className="flex justify-center mt-16 text-gray-500">
                    No Saved articles
                  </div>
                )}
              </div>
            )
          )}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e8e2e2] border-t-4 border-t-[#121212] rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={observerRef} className="h-10 w-full"></div>
    </div>
  );
};

export default SavedArticles;

"use client";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import {
  useFetchArticleDetails,
  useFetchInfiniteScrollRecommendedArticles,
  useFetchRecommendedArticlesDetails,
} from "@/Apis/Articles/queries";
import Footer from "../home/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Markdown from "markdown-to-jsx";
import like from "../../../assets/like.svg";
import liked from "../../../assets/liked.svg";
import archive from "../../../assets/archive.svg";
import bookmark from "../../../assets/bookmark.svg";
import share from "../../../assets/share.svg";
import RecommendedArticleDetails from "./RecommendedArticleDetails";
import { imageBaseUrl } from "@/config/axiosInstance";
import { format } from "date-fns";
import {
  useLikeArticleMutation,
  useSaveArticleMutation,
} from "@/Apis/Articles/mutation";
import Loader from "@/Components/Loader/Loader";

const ArticleDetails = () => {
  const domain = imageBaseUrl;
  const t = useTranslations("homePage");
  const searchParams = useSearchParams();
  const articleId = searchParams?.get("id");
  const lang = getCookie("NEXT_LOCALE");
  const { data: articleData, isLoading: articleDataLoading } =
    useFetchArticleDetails(articleId);
  const Recommendedlimit = 3;
  const {
    data: recommendedArticlesData,
    isLoading: recommendedArticlesLoading,
  } = useFetchRecommendedArticlesDetails(articleId, Recommendedlimit);
  const limit = 1;
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useFetchInfiniteScrollRecommendedArticles(articleId, limit);
  const { mutate: likeArticle } = useLikeArticleMutation();
  const { mutate: saveArticle } = useSaveArticleMutation();

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
  const truncateText = (text: string, wordLimit: number) => {
    const words = text?.split(" ");
    if (words?.length > wordLimit && lang === "ar") {
      return words?.slice(0, wordLimit)?.join(" ") + "...";
    } else if (words?.length > wordLimit && lang === "en") {
      return words?.slice(0, wordLimit)?.join(" ") + "...";
    }
    return text;
  };
  const router = useRouter();

  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isSavedLocal, setIsSavedLocal] = useState(false);
  const [isLikedMap, setIsLikedMap] = useState<Record<string, boolean>>({});
  const [isSavedMap, setIsSavedMap] = useState<Record<string, boolean>>({});
  const handlePortfolioNavigation = (e: React.FormEvent) => {
    e.stopPropagation();
    router.push(`/Portfolio`);
  };
  useEffect(() => {
    if (articleData && articleData.is_like !== undefined) {
      setIsLikedLocal(articleData.is_like);
    }
    if (articleData && articleData.is_saved !== undefined) {
      setIsSavedLocal(articleData.is_saved);
    }
  }, [
    articleData,
    articleDataLoading,
    articleData?.is_like,
    articleData?.is_saved,
  ]);

  useEffect(() => {
    if (data?.pages) {
      const initialLikes: Record<string, boolean> = {};
      const initialSaves: Record<string, boolean> = {}; // New object for saved articles
      data.pages.forEach((page) =>
        page.result.forEach((article) => {
          initialLikes[article.id] = article.is_like;
          initialSaves[article.id] = article.is_saved; // Initialize saved state
        })
      );
      setIsLikedMap(initialLikes);
      setIsSavedMap(initialSaves); // Set the saved articles map
    }
  }, [data]);

  const handleLikeMap = (articleId: string, e: React.FormEvent) => {
    e.stopPropagation();
    setIsLikedMap((prevIsLikedMap) => ({
      ...prevIsLikedMap,
      [articleId]: !prevIsLikedMap[articleId],
    }));
    likeArticle(articleId);
  };

  const handleSaveMap = (articleId: string, e: React.FormEvent) => {
    e.stopPropagation();
    setIsSavedMap((prevIsSavedMap) => ({
      ...prevIsSavedMap,
      [articleId]: !prevIsSavedMap[articleId],
    }));
    saveArticle(articleId);
  };

  const handleLike = (articleId: string, e: React.FormEvent) => {
    e.stopPropagation();
    setIsLikedLocal((prevIsLiked) => !prevIsLiked);

    likeArticle(articleId);
  };
  const handleSave = (articleId: string, e: React.FormEvent) => {
    e.stopPropagation();
    setIsSavedLocal((prevIsLiked) => !prevIsLiked);

    saveArticle(articleId);
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title, // or any title you want
          text: "Check out this article!", // or any text you want
          url: window.location.href, // share the current URL
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <>
      {articleDataLoading || recommendedArticlesLoading || isLoading ? (
        <Loader />
      ) : (
        <div className="w-[100%] lg:w-[1344px] mx-auto h-full flex flex-col py-4">
          <div className="lg:w-[95%] w-[95%] mx-auto pt-6">
            <Navbar lang={lang} />
          </div>
          <div
            dir="rtl"
            className="flex flex-col justify-center items-center h-screen"
          >
            <div className="relative w-full h-screen mt-10">
              <Image
                src={`${domain}/${articleData?.photo}`}
                alt="home"
                className="w-full h-full object-cover"
                priority
                width={1344}
                height={901}
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black bg-opacity-80"></div>
              {/* Black overlay */}
              <div className="absolute bottom-0 py-10 px-6 bg-white text-[#121212]  lg:w-[65%]">
                <h1 className="text-4xl font-notoKufi-600 text-[#121212]">
                  {articleData?.title}
                </h1>
                <Markdown
                  className="text-base font-notoKufi-400 text-[#595959] mt-4 flex"
                  options={{ forceBlock: true }}
                >
                  {truncateText(articleData?.body, 20)}
                </Markdown>

                <span className="block text-sm mt-4 font-notoKufi-400 text-[#595959]">
                  <span
                    className="underline cursor-pointer"
                    onClick={(e) => {
                      handlePortfolioNavigation(e);
                    }}
                  >
                    {articleData?.adminName}
                  </span>{" "}
                  -{" "}
                  {format(
                    new Date(articleData?.created || "2024/11/11"),
                    "yyyy/MM/dd"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div dir="rtl">
            <div className="h-[1px] w-full bg-[#E6E6E6] mt-24"></div>
            <div className="my-4 lg:mx-32 flex items-center justify-center lg:justify-start">
              <div
                onClick={(e) => {
                  handleLike(articleData?.id, e);
                }}
                className="flex items-center flex-row cursor-pointer "
              >
                <div className="w-6 h-6">
                  {isLikedLocal ? (
                    <Image
                      src={liked}
                      alt={"liked"}
                      className="w-full h-full object-contain cursor-pointer "
                    />
                  ) : (
                    <Image
                      src={like}
                      alt={"like"}
                      className="w-full h-full object-contain cursor-pointer"
                    />
                  )}
                </div>
                <p className="mx-3">{articleData?.totalLikes}</p>
              </div>
              <div
                onClick={(e) => {
                  handleSave(articleData?.id, e);
                }}
                className="flex items-center flex-row mx-16 cursor-pointer "
              >
                <div className="w-6 h-6">
                  <div className="w-6 h-6">
                    {isSavedLocal ? (
                      <Image
                        src={archive}
                        alt={"archive"}
                        className="w-full h-full object-contain cursor-pointer "
                      />
                    ) : (
                      <Image
                        src={bookmark}
                        alt={"like"}
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <p className="mx-3">{isSavedLocal ? t("saved") : t("save")}</p>
              </div>
              <div
                onClick={handleShare}
                className="flex items-center flex-row cursor-pointer"
              >
                <div className="w-6 h-6">
                  <Image
                    src={share}
                    alt={"share"}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </div>
                <p className="mx-3">{t("share")}</p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#E6E6E6]"></div>
          </div>

          <div
            dir="rtl"
            className=" mt-16 lg:mx-32 mx-6 justify-center lg:justify-start"
          >
            <h1 className="text-2xl font-notoKufi-600 text-[#121212]">
              {articleData?.title}
            </h1>
            <Markdown
              className="text-lg font-notoKufi-400 text-[#4C4C4C] mt-4 flex"
              options={{ forceBlock: true }}
            >
              {articleData?.body}
            </Markdown>
          </div>

          {/* Recommended articles  */}
          <RecommendedArticleDetails
            articles={recommendedArticlesData}
            isLoading={articleDataLoading}
          />
          {data?.pages.map((page, pageIndex) => (
            <div dir="rtl" key={pageIndex}>
              {page.result.map((article) => (
                <>
                  <div
                    key={article.id}
                    className="flex flex-col justify-center items-center h-screen"
                  >
                    <div className="relative w-full h-screen mt-10">
                      <Image
                        src={`${domain}/${article?.photo}`}
                        alt="home recommended"
                        className="w-full h-full object-cover"
                        priority
                        width={1344}
                        height={901}
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
                      <div className="absolute bottom-0  py-10 px-6 bg-white text-[#121212]  lg:w-[65%] w-full">
                        <h1 className="text-4xl font-notoKufi-600 text-[#121212]">
                          {article?.title}
                        </h1>
                        <Markdown
                          className="text-base font-notoKufi-400 text-[#595959] mt-4 flex"
                          options={{ forceBlock: true }}
                        >
                          {truncateText(article?.body, 20)}
                        </Markdown>

                        <span className="block text-sm mt-4 font-notoKufi-400 text-[#595959]">
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
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="h-[1px] w-full bg-[#E6E6E6] mt-24"></div>
                    <div className="my-4 lg:mx-32 flex items-center justify-center lg:justify-start">
                      <div
                        onClick={(e) => {
                          handleLikeMap(article?.id, e);
                        }}
                        className="flex items-center flex-row cursor-pointer "
                      >
                        <div className="w-6 h-6">
                          {isLikedMap[article.id] ?? article.is_like ? (
                            <Image
                              src={liked}
                              alt={"liked"}
                              className="w-full h-full object-contain cursor-pointer "
                            />
                          ) : (
                            <Image
                              src={like}
                              alt={"like"}
                              className="w-full h-full object-contain cursor-pointer"
                            />
                          )}
                        </div>
                        <p className="mx-3">{articleData?.totalLikes}</p>
                      </div>
                      <div
                        onClick={(e) => {
                          handleSaveMap(articleData?.id, e);
                        }}
                        className="flex items-center flex-row mx-16 cursor-pointer"
                      >
                        <div className="w-6 h-6">
                          <div className="w-6 h-6">
                            {isSavedMap[articleData?.id] ? (
                              <Image
                                src={archive}
                                alt={"archive"}
                                className="w-full h-full object-contain cursor-pointer "
                              />
                            ) : (
                              <Image
                                src={bookmark}
                                alt={"like"}
                                className="w-full h-full object-contain cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                        <p className="mx-3">
                          {isSavedMap[articleData?.id] ? t("saved") : t("save")}
                        </p>
                      </div>
                      <div
                        onClick={handleShare}
                        className="flex items-center flex-row cursor-pointer"
                      >
                        <div className="w-6 h-6">
                          <Image
                            src={share}
                            alt={"share"}
                            className="w-full h-full object-contain cursor-pointer"
                          />
                        </div>
                        <p className="mx-3">{t("share")}</p>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-[#E6E6E6]"></div>
                  </div>

                  <div className=" mt-16 lg:mx-32 mx-6 justify-center lg:justify-start">
                    <h1 className="text-2xl font-notoKufi-600 text-[#121212]">
                      {article?.title}
                    </h1>
                    <Markdown
                      className="text-lg font-notoKufi-400 text-[#4C4C4C] mt-4 flex"
                      options={{ forceBlock: true }}
                    >
                      {article?.body}
                    </Markdown>
                  </div>
                </>
              ))}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#e8e2e2] border-t-4 border-t-[#121212] rounded-full animate-spin"></div>
            </div>
          )}
          <div ref={observerRef} className="h-10 w-full"></div>

          {/* Footer  */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default ArticleDetails;

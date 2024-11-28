"use client";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "../home/Footer";
import { getCookie } from "cookies-next";
import Image from "next/image";
import bookmark from "../../../assets/bookmark.svg";
import archive from "../../../assets/archive.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { imageBaseUrl } from "@/config/axiosInstance";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFetchAllArticles, useFetchTopics } from "@/Apis/Articles/queries";
import { useSaveArticleMutation } from "@/Apis/Articles/mutation";
import Markdown from "markdown-to-jsx";
import { format } from "date-fns";
import { AllArticlesResponse } from "@/types/Articles";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Skeleton } from "@mui/material";

const AllArticles = () => {
  const lang = getCookie("NEXT_LOCALE");
  const t = useTranslations("homePage");
  const router = useRouter();
  const domain = imageBaseUrl;
  const truncateText = useCallback(
    (text: string, wordLimit: number) => {
      const words = text?.split(" ");
      if (words?.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
    },
    [lang]
  );

  const handleArticleClick = (articleId: string) => {
    router.push(`/ArticleDetails?id=${articleId}`);
  };
  const [selectedTopicId, setSelectedTopicId] = useState<number | undefined>(0);

  const {
    data: articles,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllArticles(
    selectedTopicId !== 0 && selectedTopicId !== undefined
      ? String(selectedTopicId)
      : undefined
  );

  const handleTopicClick = (topicId: number) => {
    setSelectedTopicId(topicId === 0 ? 0 : topicId);
  };
  const { data: topicsData = [], isLoading: topicsLoading } = useFetchTopics();
  const { mutate: saveArticle } = useSaveArticleMutation();
  const [savedArticles, setSavedArticles] = useState<{
    [key: string]: boolean;
  }>({});
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

  useEffect(() => {
    if (articles?.pages) {
      const initialSavedArticles = articles.pages.reduce(
        (acc: any, page: AllArticlesResponse) => {
          page.result.forEach((article) => {
            acc[article.id] = article.is_saved;
          });
          return acc;
        },
        {}
      );

      setSavedArticles(initialSavedArticles);
    }
  }, [articles]);

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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  const modifiedTopics = [
    { id: 0, name: "الكل" },
    ...(Array.isArray(topicsData) ? topicsData : []),
  ];
  return (
    <div
      dir="rtl"
      className="w-[100%] lg:w-[1344px] mx-auto h-full flex flex-col py-4"
    >
      <div className="lg:w-[100%] w-[95%] mx-auto pt-6">
        <Navbar lang={lang} />
      </div>

      <div className="bg-[#FFF] py-24 lg:px-12 px-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-notoKufi-600 text-[#121212] text-4xl">
            {t("LatestArticles")}
          </p>
        </div>
        <div className="flex items-center mt-8">
          <button
            className="p-2 text-gray-500 hover:text-gray-800"
            onClick={scrollRight}
          >
            <FaChevronRight size={18} />
          </button>
          <div
            className="flex lg:overflow-x-hidden  overflow-x-auto space-x-4 px-4 py-2 scrollbar-hide "
            ref={scrollContainerRef}
          >
            {topicsLoading
              ? // Show Skeleton placeholders when loading
                Array.from(new Array(12)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={120}
                    height={36}
                    className="rounded-lg ml-4 mr-4"
                  />
                ))
              : // Render actual topic buttons once loading is complete
                modifiedTopics?.map((item: any) => (
                  <button
                    key={item?.id}
                    className={`text-[#595959] font-notoKufi-400 px-4 py-2 whitespace-nowrap ${
                      selectedTopicId === item.id
                        ? "border-b-2 border-black font-notoKufi-600 text-[#121212]"
                        : ""
                    }`}
                    onClick={() => handleTopicClick(item.id)}
                  >
                    {item?.name}
                  </button>
                ))}
          </div>

          <button
            className="p-2 text-gray-500 hover:text-gray-800"
            onClick={scrollLeft}
          >
            <FaChevronLeft size={18} />
          </button>
        </div>
        <div className="lg:w-[100%] w-[100%] mx-auto mt-16">
          {isLoading &&
            // Display Skeleton loading placeholders when loading
            Array.from(new Array(4)).map((_, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row lg:p-8 p-4 justify-between lg:items-center cursor-pointer w-full"
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
            articles.pages.map((page, pageIndex) => (
              <div key={pageIndex}>
                {page.result.length > 0 ? (
                  <>
                    {page.result.map((article: any, index: number) => (
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
                              {truncateText(article?.body + "...", 20)}
                            </Markdown>
                            <Markdown
                              className="lg:text-sm text-xs font-notoKufi-400 text-[#595959] mt-3 flex lg:hidden"
                              options={{ forceBlock: true }}
                            >
                              {truncateText(article?.body, 5)}
                            </Markdown>
                            <span className="text-xs font-notoKufi-400 text-[#595959] mt-3 mb-2">
                              {article?.adminName} -{" "}
                              {format(new Date(article?.created), "yyyy/MM/dd")}
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
                        index !== page.result.length - 1 ? (
                          <div className="h-[1px] w-full bg-[#E6E6E6] mb-8 mt-8"></div>
                        ) : null}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex justify-center mt-16 text-gray-500">
                    No related articles
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e8e2e2] border-t-4 border-t-[#121212] rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={observerRef} className="h-10 w-full"></div>
      <Footer />
    </div>
  );
};
export default AllArticles;

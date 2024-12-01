"use client";
import { createChart } from "lightweight-charts";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/assets/HomePage/header/logo.png";
import { candleStickData, histogramData } from "./chartData";
import useLanguage from "@/context/useLanguage";

const Charts = ({ className }) => {
  const chartContainerRef = useRef();
  const candleTooltipRef = useRef();
  const histogramTooltipRef = useRef();
  const [currentTime, setCurrentTime] = useState(null);
  const [candlePrice, setCandlePrice] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#fff" },
        textColor: "#717579",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#28a745",
      downColor: "#dc3545",
      borderVisible: false,
      wickUpColor: "#28a745",
      wickDownColor: "#dc3545",
    });

    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const candleData = param.seriesData.get(candlestickSeries);

        if (candleData) {
          setCandlePrice(candleData);
          candleTooltipRef.current.style.display = "block";
          candleTooltipRef.current.style.left = `10px`;
          candleTooltipRef.current.style.top = `10px`;
        } else {
          candleTooltipRef.current.style.display = "none";
        }

        setCurrentTime(param.time);
      } else {
        candleTooltipRef.current.style.display = "none";
      }
    });

    candlestickSeries.setData(candleStickData);

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative rounded-2xl w-11/12 mx-auto">
      <Image
        width={37}
        src={logo}
        alt={language === "en" ? "Logo" : "الشعار"}
        className="absolute z-[60] bottom-7 bg-white pt-2 rounded-sm left-2"
      />
      <div
        className={`relative ${className || "h-[29.375rem]"}`}
        ref={chartContainerRef}
        style={{ direction: language === "en" ? "ltr" : "rtl" }}
      >
        <div
          ref={candleTooltipRef}
          className="absolute border border-white z-50 text-black bg-white p-3 rounded-xl"
          style={{ display: "none" }}
        >
          <h3>{language === "en" ? "Candle Value" : "قيمة الشمعة"}</h3>
          <p>
            {candlePrice
              ? language === "en"
                ? `Open: ${candlePrice.open}, Close: ${candlePrice.close}`
                : `فتح: ${candlePrice.open}, إغلاق: ${candlePrice.close}`
              : ""}
          </p>
          <p>
            {language === "en" ? "Date" : "التاريخ"}: {currentTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Charts;

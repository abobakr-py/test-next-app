// CandlestickChart.jsx
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CandlestickChart = ({ candlestickData }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    // Add a candlestick series with custom colors and larger sticks
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#28a745", // Green for upward movements
      downColor: "#dc3545", // Red for downward movements
      borderVisible: false, // Remove the border around the candles
      wickUpColor: "#28a745", // Green for wicks of upward candles
      wickDownColor: "#dc3545", // Red for wicks of downward candles
      // Increase the width of the candlesticks
      barWidth: 25,
      baseLineWidth:4
      
    });

    // Set the data for the series
    candlestickSeries.setData(candlestickData);

    // Handle window resize
    const handleResize = () => {
      chart.resize(
        chartContainerRef.current.clientWidth,
        chartContainerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [candlestickData]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", width: "100%", height: "400px" }}
    />
  );
};

export default CandlestickChart;
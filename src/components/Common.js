import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const WordFrequencyAnalysis = ({ analyze, mode }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setIsLargeScreen(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  const backgroundColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const createChartData = (words) => {
    return {
      labels: words.map(word => word[0]),
      datasets: [
        {
          label: "Frequency",
          data: words.map(word => word[1]),
          backgroundColor: backgroundColors.slice(0, words.length),
          hoverOffset: 4,
        },
      ],
    };
  };

  const commonWordsData = createChartData(analyze["Most Common Words"]);
  const leastCommonWordsData = createChartData(analyze["Least Common Words"]);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "",
        color: mode === "dark" ? "#f5f5dc" : "#333",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    cutout: '40%'
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: isLargeScreen ? "row" : "column",
      justifyContent: "space-around",
      alignItems: "center",
      height: isLargeScreen ? "400px" : "800px"
    }}>
      <div style={{ width: isLargeScreen ? "45%" : "90%", height: "100%" }}>
        <Doughnut
          data={commonWordsData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: {
                ...chartOptions.plugins.title,
                text: "Most Common Words",
              },
            },
          }}
        />
      </div>
      <div style={{ width: isLargeScreen ? "45%" : "90%", height: "100%" }}>
        <Doughnut
          data={leastCommonWordsData}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: {
                ...chartOptions.plugins.title,
                text: "Least Common Words",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WordFrequencyAnalysis;

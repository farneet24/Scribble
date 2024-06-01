import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Helper to format readability score names
const formatScoreName = (name) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Helper to get tooltip content based on the score
const getScoreDescription = (score, value) => {
  switch (score) {
    case "flesch_reading_ease":
      if (value >= 90)
        return "Very easy to read. Best understood by an average 11-year-old student.";
      if (value >= 80)
        return "Easy to read. Conversational English for consumers.";
      if (value >= 70) return "Fairly easy to read.";
      if (value >= 60)
        return "Plain English. Easily understood by 13- to 15-year-old students.";
      if (value >= 50) return "Fairly difficult to read.";
      if (value >= 30) return "Difficult to read.";
      if (value < 30)
        return "Very difficult to read. Best understood by university graduates.";
      break;
    case "smog_index":
      return `This score estimates the number of years of education someone needs to understand the text. Typically, higher values indicate more complex texts.`;
    case "flesch_kincaid_grade":
      return `This score estimates the U.S. school grade level required to comprehend the text. A lower grade level means the text is easier to understand.`;
    case "coleman_liau_index":
      return `This formula predicts the U.S. school grade level required for comprehension of the text. It focuses on lexical predictors rather than sentence length.`;
    case "automated_readability_index":
      return `This score reflects the U.S. grade level thought necessary to understand the text. It's calculated based on characters per word and words per sentence.`;
    case "dale_chall_readability_score":
      return `This score rates the text's comprehensibility based on a list of words that are familiar to American fourth-grade students. Lower scores mean the text is easier to understand.`;
    default:
      return "No specific description available for this score.";
  }
};

const ReadabilityScores = ({ analyze, mode }) => {
  const readabilityScores = analyze["Readability Scores"];

  const barData = {
    labels: Object.keys(readabilityScores).map(formatScoreName),
    datasets: [
      {
        label: null,
        data: Object.values(readabilityScores),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barOptions = {
    indexAxis: "y", // This makes the bar chart horizontal
    plugins: {
      title: {
        display: true,
        text: "Readability Scores Analysis",
        color: mode === "dark" ? "#f5f5dc" : "#333",
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const labelIndex = context.dataIndex;
            const scoreLabel = Object.keys(readabilityScores)[labelIndex];
            const scoreValue = context.raw;
            const description = getScoreDescription(scoreLabel, scoreValue);
            return `${formatScoreName(
              scoreLabel
            )}: ${scoreValue} - ${description}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: mode === "dark" ? "#f5f5dc" : "#333",
        },
      },
      x: {
        ticks: {
          color: mode === "dark" ? "#f5f5dc" : "#333",
          beginAtZero: true,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default ReadabilityScores;

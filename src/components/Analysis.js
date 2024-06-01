import React from "react";
import "chart.js/auto";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Tooltip,
} from "@mui/material";
import ReadabilityScores from "./Read";
import WordFrequencyAnalysis from "./Common";

const Analysis = ({ analyze, mode }) => {
  
  if (!analyze || Object.keys(analyze).length === 0) {
    return null; // Return null for better error handling
  }

  const totalSeconds = Math.round(analyze["Reading Time"] * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formattedTime = [];
  if (hours > 0) {
    hours === 1
      ? formattedTime.push(`${hours} hour`)
      : formattedTime.push(`${hours} hours`);
  }
  if (minutes > 0) {
    minutes === 1
      ? formattedTime.push(`${minutes} minute`)
      : formattedTime.push(`${minutes} minutes`);
  }
  if (seconds > 0) {
    seconds === 1
      ? formattedTime.push(`${seconds} second`)
      : formattedTime.push(`${seconds} seconds`);
  }

  const getIconClass = (key) => {
    switch (key) {
      case "Total Characters (with spaces)":
        return "fas fa-text-width";
      case "Total Characters (without spaces)":
        return "fas fa-text-width";
      case "Total Words":
        return "fas fa-sort-numeric-down";
      case "Total Sentences":
        return "fas fa-sort-numeric-up";
      case "Total Paragraphs":
        return "fas fa-paragraph";
      case "Average Word Length":
        return "fas fa-text-width";
      case "Average Sentence Length":
        return "fas fa-text-width";
      case "Lexical Density (%)":
        return "fas fa-glasses";
      case "Reading Time":
        return "fas fa-clock";
      case "Difficult Words":
        return "fas fa-user-check";
      default:
        return "fas fa-info-circle";
    }
  };

  const renderValue = (key, value) => {
    if (key === "Reading Time") {
      return formattedTime.join(" ") || "Less than a second";
    }
    return value;
  };

  const excludedKeys = new Set([
    "Most Common Words",
    "Least Common Words",
    "Readability Scores",
  ]);
  const tableStyle =
    mode === "dark"
      ? {
          backgroundColor: "#000000",
          color: "#fff",
          borderBottom: "1px solid #555",
        }
      : {
          backgroundColor: "#fff",
          color: "#000",
        };

  return (
    <div>
      <h1
        className="my-2"
        style={{ color: mode === "dark" ? "#C5EBAA" : "#01204E" }}
      >
        Text Analysis
      </h1>
      <br />
      <TableContainer
        component={Paper}
        style={{
          marginBottom: "20px",
          overflowX: "auto",
          backgroundColor: tableStyle.backgroundColor,
        }}
      >
        <Table aria-label="detailed analysis" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ ...tableStyle, fontWeight: "bold" }}>
                Metric
              </TableCell>
              <TableCell
                style={{ ...tableStyle, fontWeight: "bold" }}
                align="right"
              >
                Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(analyze)
              .filter(([key, _]) => !excludedKeys.has(key))
              .map(([key, value]) => (
                <TableRow key={key} hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ ...tableStyle }}
                  >
                    <i
                      className={`${getIconClass(key)} fa-fw`}
                      style={{ marginRight: "10px" }}
                    ></i>
                    {key}
                  </TableCell>
                  <TableCell align="right" style={{ ...tableStyle }}>
                    <Tooltip title={`${value}`} placement="left" arrow>
                      {renderValue(key, value)}
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReadabilityScores analyze={analyze} mode={mode} />
      <br />
      <br />
      <WordFrequencyAnalysis analyze={analyze} mode={mode} />
    </div>
  );
};

export default Analysis;

import React, { useState, useEffect, useRef } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Swal from "sweetalert2";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import MonacoEditorComponent from "./Monaco.js";
import TextTyper from "./Animation.js";
import Analysis from "./Analysis.js";
import TexttoSpeech from "./Textspeech.js";
import { useLocation } from "react-router-dom";

function TextArea({ mode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page starts at the top when loaded
  }, [location]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorText, setEditorText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showMonacoEditor, setShowMonacoEditor] = useState(false);
  const [response, setResponse] = useState("");
  const [llm, setLLM] = useState("");
  const [task, setTask] = useState("");
  const [question, setQuestion] = useState("");
  const [analyze, setAnalyze] = useState({});
  const sendButtonRef = useRef(null);
  const [translateLang, setTranslateLang] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        Swal.fire({
          title: "Success!",
          text: "Copied to clipboard!",
          icon: "success",
          confirmButtonText: "OK",
          timer: 1000,
        });
      },
      (err) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to copy text.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Failed to copy: ", err);
      }
    );
  };

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
    const currentContent = newState.getCurrentContent();
    const plainText = currentContent.getPlainText();
    setEditorText(plainText.trim()); // Save plain text to state
  };

  useEffect(() => {
    // Reset the question input when task is not General or Q/A
    if (task !== "general" && task !== "question") {
      setQuestion("");
    }
  }, [task]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendButtonRef.current.click();
    }
  };

  const llms = {
    gemini: "Gemini Pro",
    gpt: "GPT 4o Mini",
    llama: "LLAMA 3",
  };

  const tasks = {
    general: "General",
    question: "Q/A",
    translate: "Machine Translation",
    summary: "Text Summarization",
    paraphrase: "Paraphrase Text",
    sentiment: "Sentiment Analysis",
    emotion: "Emotion Recognition",
    named: "Named Entity Recognition",
    topic: "Topic Modelling",
  };

  const sendSelectionData = async () => {
    if (!llm || !task) {
      console.error(
        "Required data missing: Check 'llm', 'task', and 'question' values."
      );
      return;
    }

    if (!editorState) {
      console.error("Editor state is undefined.");
      return;
    }

    const payload = {
      LLM: llm,
      Task: task,
      Question: question,
      Body: editorText.trim(),
      Language: translateLang,
    };

    console.log("Sending:", payload);

    try {
      setResponse("");
      const response = await fetch("https://web-production-6be7.up.railway.app/langchain/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Success:", data);
      setResponse(data.answer);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const getAnalysisData = async () => {
    console.log("Function has started");
    if (!editorState) {
      console.error("Editor state is undefined.");
      return;
    }

    try {
      const response = await fetch("https://web-production-6be7.up.railway.app/analysis/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Body: editorText.trim() }),
      });

      const data = await response.json();
      console.log("Success:", data);
      setAnalyze(data.analysis);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Korean",
    "Italian",
    "Portuguese",
    "Russian",
    "Arabic",
    "Bengali",
    "Hindi",
    "Urdu",
    "Swahili",
    "Persian",
    "Turkish",
    "Dutch",
    "Greek",
    "Hebrew",
    "Hungarian",
    "Indonesian",
    "Mongolian",
    "Polish",
    "Thai",
  ];

  const handleLanguageSelect = (lang) => {
    setTranslateLang(languages[lang]);
  };

  const editorStyle = {
    border:
      mode === "dark"
        ? "1px solid rgba(255, 255, 255, 0.3)"
        : "1px solid rgba(0, 0, 0, 0.3)",
    padding: "5px",
    backgroundColor: mode === "dark" ? "#1A1A1A" : "#fff",
    color: mode === "dark" ? "#FFF" : "#000",
    maxHeight: "500px",
    overflowY: "auto",
  };

  const wrapperStyle = {
    backgroundColor: mode === "dark" ? "#333" : "#fff",
  };

  const toolbarStyle = {
    backgroundColor: mode === "dark" ? "#2C2C2C" : "#fff",
    border:
      mode === "dark"
        ? "1px solid rgba(255, 255, 255, 0.2)"
        : "1px solid rgba(0, 0, 0, 0.2)",
  };

  const previewStyle = {
    padding: "20px",
    backgroundColor: mode === "dark" ? "#222" : "#eee",
    color: mode === "dark" ? "#FFF" : "#000",
    border:
      mode === "dark"
        ? "1px solid rgba(255, 255, 255, 0.2)"
        : "1px solid rgba(0, 0, 0, 0.2)",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const hasText = editorText.trim() !== "";

  // Function to convert editor state to HTML
  const createMarkup = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    return { __html: DOMPurify.sanitize(markup) };
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "10px",
        }}
        className="button-container"
      >
        {/* Left side: Configurations and auxiliary functions */}
        <div
          className="left-buttons"
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn"
            onClick={() => setShowMonacoEditor(!showMonacoEditor)}
            style={{ backgroundColor: "#DA0C81", color: "#fff" }}
          >
            {showMonacoEditor ? "Close Monaco" : "Monaco Editor"}
          </button>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="llmDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
            >
              {llms[llm] || "Choose LLM"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="llmDropdown">
              {Object.entries(llms).map(([key, name]) => (
                <li key={key}>
                  <button className="dropdown-item" onClick={() => setLLM(key)}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="taskDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "#1E0342", borderColor: "#1E0342" }}
            >
              {tasks[task] || "Choose Task"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="taskWriteDropdown">
              {Object.entries(tasks).map(([key, name]) => (
                <li key={key}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setTask(key);
                      console.log(key);
                    }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-primary"
            onClick={sendSelectionData}
            ref={sendButtonRef}
            style={{ backgroundColor: "#17594A", borderColor: "#17594A" }}
            disabled={!llm || !task}
          >
            Produce ⚡
          </button>
        </div>

        {/* Right side: Text manipulation and editor related functions */}
        <div
          className="right-buttons"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          <TexttoSpeech speech={editorText.trim()} />
          <button
            className="btn btn-info"
            onClick={getAnalysisData}
            disabled={!hasText}
            style={{
              color: "#fff",
              backgroundColor: "#7E2553",
              borderColor: "#7E2553",
            }}
          >
            Analysis
          </button>
          <button
            className="btn"
            onClick={() => setShowPreview(!showPreview)}
            disabled={!hasText}
            style={{
              backgroundColor: "#850F8D",
              borderColor: "#850F8D",
              color: "#fff",
            }}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            className="btn"
            onClick={() => {
              editorText.trim() !== "" ? copyToClipboard(editorText.trim()) : alert("No text to copy.");
            }}
            disabled={!hasText}
            style={{
              backgroundColor: "#2C4E80",
              borderColor: "#2C4E80",
              color: "#fff",
            }}
          >
            Copy Editor Text
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              setEditorState(EditorState.createEmpty());
              setEditorText("");
            }}
            disabled={!hasText}
          >
            Clear Editor Text
          </button>
        </div>
      </div>

      {(task === "general" ||
        task === "question" ||
        task === "translate" ||
        response !== "") &&
        llm !== "" && (
          <div className="success-alert">
            {(task === "general" || task === "question") && (
              <div className="input-group">
                <input
                  type="text"
                  className="form-control my-2"
                  placeholder="Enter your question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {question && (
                  <span
                    className="position-absolute"
                    onClick={() => setQuestion("")}
                    style={{
                      top: "50%",
                      right: "15px",
                      cursor: "pointer",
                      transform: "translateY(-55%)",
                      zIndex: "1000",
                      color: "#FE0000",
                    }}
                  >
                    ✖
                  </span>
                )}
              </div>
            )}
            {task === "translate" && (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle w-100 my-2"
                  type="button"
                  id="langDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ textAlign: "left", backgroundColor: "#fff" }}
                >
                  {translateLang || "Translate to"}
                </button>
                <ul
                  className="dropdown-menu w-100"
                  aria-labelledby="translateDropdown"
                  style={{ maxHeight: "210px", overflowY: "auto" }}
                >
                  {Object.entries(languages).map(([key, name]) => (
                    <li key={key}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          handleLanguageSelect(key);
                        }}
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <br />
            {response && <TextTyper mode={mode} text={response} />}
          </div>
        )}

      <div>
        <br />
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          hashtag={{
            separator: " ",
            trigger: "#",
          }}
          mention={{
            separator: " ",
            trigger: "@",
            suggestions: [
              { text: "JavaScript", value: "javascript", url: "js" },
              { text: "Golang", value: "golang", url: "go" },
            ],
          }}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorStyle={editorStyle}
          wrapperStyle={wrapperStyle}
          toolbarStyle={toolbarStyle}
          placeholder="Begin writing...."
        />
        <br />
        {editorText && <Analysis mode={mode} analyze={analyze} />}
      </div>
      {showPreview && (
        <div style={previewStyle}>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}
      <br />
      <br />
      {showMonacoEditor && <MonacoEditorComponent />}
    </>
  );
}

export default TextArea;

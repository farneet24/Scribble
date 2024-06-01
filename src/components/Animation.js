import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  coldarkDark
} from "react-syntax-highlighter/dist/esm/styles/prism";

const TextTyper = ({ text, mode }) => {
  const [content, setContent] = useState([]);
  const textElement = useRef(null);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);

  // Function to copy text and display a SweetAlert2 message
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

  useEffect(() => {
    const typeText = () => {
      if (indexRef.current < text.length) {
        const char = text[indexRef.current];

        if (
          char === "\n" &&
          text[indexRef.current + 1] === "*" &&
          text[indexRef.current + 2] !== "*"
        ) {
          setContent((prevContent) => [
            ...prevContent,
            { type: "bullet", text: "\n- " },
          ]);
          indexRef.current += 2;
        } else if (
          char === "`" &&
          text.substring(indexRef.current, indexRef.current + 3) === "```"
        ) {
          let endOfLang = text.indexOf("\n", indexRef.current + 3);
          let language = text.substring(indexRef.current + 3, endOfLang).trim();
          let endOfCode = text.indexOf("```", endOfLang + 1);
          if (endOfCode !== -1) {
            let code = text.substring(endOfLang + 1, endOfCode);
            setContent((prevContent) => [
              ...prevContent,
              {
                type: "code",
                language,
                code,
                fullCode: text.substring(indexRef.current, endOfCode + 3),
              },
            ]);
            indexRef.current = endOfCode + 3;
          }
        } else if (char === "*" && text[indexRef.current + 1] === "*") {
          let endOfBold = text.indexOf("**", indexRef.current + 2);
          if (endOfBold !== -1) {
            let boldText = text.substring(indexRef.current + 2, endOfBold);
            setContent((prevContent) => [
              ...prevContent,
              { type: "bold", text: boldText },
            ]);
            indexRef.current = endOfBold + 2;
          }
        } else if (char === "`") {
          let endOfItalic = text.indexOf("`", indexRef.current + 1);
          if (endOfItalic !== -1) {
            let italicText = text.substring(indexRef.current + 1, endOfItalic);
            setContent((prevContent) => [
              ...prevContent,
              { type: "italic", text: italicText },
            ]);
            indexRef.current = endOfItalic + 1;
          }
        } else {
          setContent((prevContent) => [
            ...prevContent,
            { type: "text", text: char },
          ]);
          indexRef.current++;
        }

        timeoutRef.current = setTimeout(typeText, 5);
      } else {
        clearTimeout(timeoutRef.current);
      }
    };

    timeoutRef.current = setTimeout(typeText, 5);

    return () => clearTimeout(timeoutRef.current);
  }, [text]);

  const cursorColor = mode === "light" ? "darkgray" : "white";
  const isError = text.startsWith('Error');

  return (
    <div>
      <div
        ref={textElement}
        id="chat-text"
        className={isError ? 'errored' : ''}
        style={{
          color: mode === "light" && !isError ? "black" : "white",
          whiteSpace: "pre-wrap",
        }}
      >
        {content.map((item, index) => {
          switch (item.type) {
            case "bold":
              return <b key={index}>{item.text}</b>;
            case "italic":
              return <i key={index}>{item.text}</i>;
            case "bullet":
              return <span key={index}>{item.text}</span>;
            case "code":
              return (
                <>
                  <br />
                  <SyntaxHighlighter
                    language={item.language.toLowerCase()}
                    style={mode === "light" ? dracula : coldarkDark}
                    key={index}
                  >
                    {item.code}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => copyToClipboard(item.code)}
                    className="btn"
                    style={{
                      backgroundColor: "#49243E",
                      borderColor: "#49243E",
                      color: "#fff",
                    }}
                  >
                    <i className="fa fa-copy"></i> Copy Code
                  </button>
                  <br />
                </>
              );
            default:
              if (item.text.startsWith("Error")) {
                return (
                  <>
                  <div style={{color : "#fff"}} key={index}>
                    {item.text}
                  </div>
                  </>
                );
              } else {
                return <span key={index}>{item.text}</span>;
              }
          }
        })}
      </div>
      {content.length > 0 && (
        <style>
          {`
            #chat-text::after {
              content: "";
              position: absolute;
              width: 8px;
              height: 20px;
              background-color: ${cursorColor};
              animation: blink 1s infinite;
            }
            @keyframes blink {
              50% {
                opacity: 0;
              }
            }
          `}
        </style>
      )}
      <br />
      <button
        onClick={() => copyToClipboard(text)}
        className="btn btn-primary mt-2"
      >
        <i className="fa fa-copy"></i> Copy All Text
      </button>
    </div>
  );
};

export default TextTyper;

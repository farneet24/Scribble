import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

// Define initial code snippets for each language
const languageOptions = {
  bash: "#!/bin/bash\necho Hello, world!",
  c: '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  cpp: '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  csharp:
    'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  css: "body { font-family: 'Arial'; color: black; }",
  go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  html: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello, World!</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>",
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  javascript: "console.log('Hello, World!');",
  json: '{ "message": "Hello, World!" }',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  lua: 'print("Hello, World!")',
  markdown: "# Hello, World!",
  perl: 'print "Hello, World!\\n";',
  php: "<?php\necho 'Hello, World!';",
  python: "print('Hello, World!')",
  ruby: "puts 'Hello, World!'",
  sql: "-- Select all records\nSELECT * FROM table;",
  swift: 'print("Hello, World!")',
  typescript: "console.log('Hello, World!');",
  xml: "<!-- Sample XML -->\n<message>Hello, World!</message>",
};

const themes = {
  vs: "Default Light",
  "vs-dark": "Default Dark",
  "hc-black": "High Contrast Black",
  "hc-light": "High Contrast Light",
  monokai: "Monokai",
  twilight: "Twilight",
  github: "GitHub",
  dracula: "Dracula",
  solarized: "Solarized Dark",
  nord: "Nord",
  oceanicNext: "Oceanic Next",
  ayuMirage: "Ayu Mirage",
  tomorrowNight: "Tomorrow Night",
  mirage: "Mirage",
  zenburn: "Zenburn",
  pandora: "Pandora",
  gruvboxDark: "Gruvbox Dark",
  oneDark: "One Dark",
};

const themeData = {
  oneDark: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "5c6370" },
      { token: "keyword", foreground: "c678dd" },
      { token: "identifier", foreground: "abb2bf" },
      { token: "number", foreground: "d19a66" },
      { token: "string", foreground: "98c379" },
    ],
    colors: {
      "editor.foreground": "#abb2bf",
      "editor.background": "#282c34",
      "editorCursor.foreground": "#528bff",
      "editor.lineHighlightBackground": "#3e4451",
      "editorLineNumber.foreground": "#636d83",
      "editor.selectionBackground": "#3e4451",
      "editor.inactiveSelectionBackground": "#3a3f4b",
    },
  },
  gruvboxDark: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "7c6f64" },
      { token: "keyword", foreground: "fb4934" },
      { token: "identifier", foreground: "ebdbb2" },
      { token: "number", foreground: "d3869b" },
      { token: "string", foreground: "b8bb26" },
    ],
    colors: {
      "editor.foreground": "#ebdbb2",
      "editor.background": "#282828",
      "editorCursor.foreground": "#fe8019",
      "editor.lineHighlightBackground": "#3c3836",
      "editorLineNumber.foreground": "#928374",
      "editor.selectionBackground": "#504945",
      "editor.inactiveSelectionBackground": "#3c3836",
    },
  },
  pandora: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "b0b0b0" },
      { token: "keyword", foreground: "e289ff" },
      { token: "identifier", foreground: "9effff" },
      { token: "number", foreground: "ff65a8" },
      { token: "string", foreground: "7dff65" },
    ],
    colors: {
      "editor.foreground": "#e0e0e0",
      "editor.background": "#282a36",
      "editorCursor.foreground": "#ffffff",
      "editor.lineHighlightBackground": "#44475a",
      "editorLineNumber.foreground": "#6272a4",
      "editor.selectionBackground": "#44475a",
      "editor.inactiveSelectionBackground": "#44475a50",
    },
  },
  zenburn: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "7f9f7f" },
      { token: "keyword", foreground: "f0dfaf" },
      { token: "identifier", foreground: "dcdccc" },
      { token: "number", foreground: "dfaf8f" },
      { token: "string", foreground: "cc9393" },
    ],
    colors: {
      "editor.foreground": "#dcdccc",
      "editor.background": "#3f3f3f",
      "editorCursor.foreground": "#f0efd0",
      "editor.lineHighlightBackground": "#4f4f4f",
      "editorLineNumber.foreground": "#7f9f7f",
      "editor.selectionBackground": "#1f1f1f",
      "editor.inactiveSelectionBackground": "#4e4e4e",
    },
  },
  mirage: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6e6e6e" },
      { token: "keyword", foreground: "b3deef" },
      { token: "identifier", foreground: "c0c0c0" },
      { token: "number", foreground: "ffd700" },
      { token: "string", foreground: "f0c674" },
    ],
    colors: {
      "editor.foreground": "#9d9d9d",
      "editor.background": "#1a1a1a",
      "editorCursor.foreground": "#cccccc",
      "editor.lineHighlightBackground": "#2a2a2a",
      "editorLineNumber.foreground": "#858585",
      "editor.selectionBackground": "#474747",
      "editor.inactiveSelectionBackground": "#333333",
    },
  },
  tomorrowNight: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "969896" },
      { token: "keyword", foreground: "cc99cc" },
      { token: "identifier", foreground: "ffffff" },
      { token: "number", foreground: "f99157" },
      { token: "string", foreground: "8abeb7" },
    ],
    colors: {
      "editor.foreground": "#c5c8c6",
      "editor.background": "#1d1f21",
      "editorCursor.foreground": "#c5c8c6",
      "editor.lineHighlightBackground": "#282a2e",
      "editorLineNumber.foreground": "#969896",
      "editor.selectionBackground": "#373b41",
      "editor.inactiveSelectionBackground": "#282a2e",
    },
  },
  nord: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "4c566a" },
      { token: "keyword", foreground: "81a1c1" },
      { token: "identifier", foreground: "d8dee9" },
      { token: "number", foreground: "b48ead" },
      { token: "string", foreground: "a3be8c" },
    ],
    colors: {
      "editor.foreground": "#d8dee9",
      "editor.background": "#2e3440",
      "editorCursor.foreground": "#d8dee9",
      "editor.lineHighlightBackground": "#3b4252",
      "editorLineNumber.foreground": "#4c566a",
      "editor.selectionBackground": "#434c5e",
      "editor.inactiveSelectionBackground": "#3b4252",
    },
  },
  oceanicNext: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "65737e" },
      { token: "keyword", foreground: "c594c5" },
      { token: "identifier", foreground: "d8dee9" },
      { token: "number", foreground: "f99157" },
      { token: "string", foreground: "99c794" },
    ],
    colors: {
      "editor.foreground": "#d8dee9",
      "editor.background": "#1b2b34",
      "editorCursor.foreground": "#d8dee9",
      "editor.lineHighlightBackground": "#343d46",
      "editorLineNumber.foreground": "#65737e",
      "editor.selectionBackground": "#4f5b66",
      "editor.inactiveSelectionBackground": "#3b4b52",
    },
  },
  ayuMirage: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "5c6773" },
      { token: "keyword", foreground: "ffae57" },
      { token: "identifier", foreground: "f8f8f2" },
      { token: "number", foreground: "57c7ff" },
      { token: "string", foreground: "b8cc52" },
    ],
    colors: {
      "editor.foreground": "#cbccc6",
      "editor.background": "#1f2430",
      "editorCursor.foreground": "#cbccc6",
      "editor.lineHighlightBackground": "#343f4c",
      "editorLineNumber.foreground": "#5c6773",
      "editor.selectionBackground": "#33424a",
      "editor.inactiveSelectionBackground": "#424b58",
    },
  },
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715e" },
      { token: "keyword", foreground: "f92672" },
      { token: "identifier", foreground: "a6e22e" },
      { token: "number", foreground: "ae81ff" },
      { token: "string", foreground: "e6db74" },
    ],
    colors: {
      "editor.foreground": "#f8f8f2",
      "editor.background": "#272822",
      "editorCursor.foreground": "#f8f8f0",
      "editor.lineHighlightBackground": "#3e3d32",
      "editorLineNumber.foreground": "#858531",
      "editor.selectionBackground": "#49483e",
      "editor.inactiveSelectionBackground": "#75715e",
    },
  },
  twilight: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8f9d6a" },
      { token: "keyword", foreground: "cda869" },
      { token: "identifier", foreground: "cf6a4c" },
      { token: "number", foreground: "f9ee98" },
      { token: "string", foreground: "8f9d6a" },
    ],
    colors: {
      "editor.foreground": "#a7a7a7",
      "editor.background": "#141414",
      "editorCursor.foreground": "#a7a7a7",
      "editor.lineHighlightBackground": "#282828",
      "editorLineNumber.foreground": "#5f5a60",
      "editor.selectionBackground": "#5f5a60",
      "editor.inactiveSelectionBackground": "#1a1a1a",
    },
  },
  github: {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6a737d" },
      { token: "keyword", foreground: "d73a49" },
      { token: "identifier", foreground: "24292e" },
      { token: "number", foreground: "005cc5" },
      { token: "string", foreground: "032f62" },
    ],
    colors: {
      "editor.foreground": "#24292e",
      "editor.background": "#ffffff",
      "editorCursor.foreground": "#24292e",
      "editor.lineHighlightBackground": "#f6f8fa",
      "editorLineNumber.foreground": "#1b1f234d",
      "editor.selectionBackground": "#0366d625",
      "editor.inactiveSelectionBackground": "#afafaf30",
    },
  },
  dracula: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272a4" },
      { token: "keyword", foreground: "ff79c6" },
      { token: "identifier", foreground: "f1fa8c" },
      { token: "number", foreground: "bd93f9" },
      { token: "string", foreground: "f1fa8c" },
    ],
    colors: {
      "editor.foreground": "#f8f8f2",
      "editor.background": "#282a36",
      "editorCursor.foreground": "#f8f8f2",
      "editor.lineHighlightBackground": "#44475a",
      "editorLineNumber.foreground": "#6272a4",
      "editor.selectionBackground": "#44475a",
      "editor.inactiveSelectionBackground": "#44475a50",
    },
  },
  solarized: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "586e75" },
      { token: "keyword", foreground: "cb4b16" },
      { token: "identifier", foreground: "839496" },
      { token: "number", foreground: "d33682" },
      { token: "string", foreground: "2aa198" },
    ],
    colors: {
      "editor.foreground": "#839496",
      "editor.background": "#002b36",
      "editorCursor.foreground": "#839496",
      "editor.lineHighlightBackground": "#073642",
      "editorLineNumber.foreground": "#586e75",
      "editor.selectionBackground": "#073642",
      "editor.inactiveSelectionBackground": "#004c6d",
    },
  },
};

function MonacoEditorComponent() {
  const monaco = useMonaco();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(languageOptions[language]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setCode(languageOptions[language]);

    if (monaco) {
      // Register each theme
      Object.entries(themeData).forEach(([themeName, data]) => {
        monaco.editor.defineTheme(themeName, data);
      });
    }
  }, [monaco, language]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    monaco?.editor.setTheme(themeName);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      style={{
        width: isFullScreen ? "100%" : "95%",
        margin: "auto",
        height: isFullScreen ? "100vh" : "80vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <div className="dropdown me-2">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="languageDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {language[0].toUpperCase() + language.slice(1)}{" "}
              {/* Display the current language */}
            </button>
            <ul
              className="dropdown-menu scrollable-menu"
              aria-labelledby="languageDropdown"
            >
              {Object.keys(languageOptions)
                .sort()
                .map((lang) => (
                  <li key={lang}>
                    <button
                      className="dropdown-item"
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="themeDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {themes[theme]} {/* Display the name of the current theme */}
            </button>
            <ul
              className="dropdown-menu scrollable-menu"
              aria-labelledby="themeDropdown"
            >
              {Object.entries(themes).map(([key, name]) => (
                <li key={key}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleThemeChange(key)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={toggleFullScreen}
          className={`btn ${isFullScreen ? "btn-danger" : "btn-success"}`}
        >
          {isFullScreen ? "Exit Full Width" : "Full Width"}
        </button>
      </div>

      <Editor
        height="100%"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default MonacoEditorComponent;

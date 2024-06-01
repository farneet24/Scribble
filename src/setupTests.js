import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TextTyper = ({ text, mode }) => {
  const [content, setContent] = useState([]);
  const textElement = useRef(null);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const typeText = () => {
      if (indexRef.current < text.length) {
        let tempContent = [...content];
        const char = text[indexRef.current];

        if (char === '\n' && text[indexRef.current + 1] === '*') {
          tempContent.push({ type: 'bullet', text: '- ' });
          indexRef.current += 2;
        } else if (char === '`' && text.substring(indexRef.current, indexRef.current + 3) === '```') {
          // Detect language and code block
          let endOfLang = text.indexOf('\n', indexRef.current + 3);
          let language = text.substring(indexRef.current + 3, endOfLang).trim();
          let endOfCode = text.indexOf('```', endOfLang + 1);
          if (endOfCode !== -1) {
            let code = text.substring(endOfLang + 1, endOfCode);
            tempContent.push({
              type: 'code',
              language,
              code
            });
            indexRef.current = endOfCode + 3;
          }
        } else if (char === '*' && text[indexRef.current + 1] === '*') {
          // Bold text
          let endOfBold = text.indexOf('**', indexRef.current + 2);
          if (endOfBold !== -1) {
            let boldText = text.substring(indexRef.current + 2, endOfBold);
            tempContent.push({ type: 'bold', text: boldText });
            indexRef.current = endOfBold + 2;
          }
        } else if (char === '`') {
          // Italic text
          let endOfItalic = text.indexOf('`', indexRef.current + 1);
          if (endOfItalic !== -1) {
            let italicText = text.substring(indexRef.current + 1, endOfItalic);
            tempContent.push({ type: 'italic', text: italicText });
            indexRef.current = endOfItalic + 1;
          }
        } else {
          tempContent.push({ type: 'text', text: char });
          indexRef.current++;
        }

        setContent(tempContent);
        timeoutRef.current = setTimeout(typeText, 20);
      } else {
        clearTimeout(timeoutRef.current);
      }
    };

    timeoutRef.current = setTimeout(typeText, 20);

    return () => clearTimeout(timeoutRef.current);
  }, [text, content]);

  const cursorColor = mode === 'light' ? 'darkgray' : 'white';

  return (
    <div>
      <div ref={textElement} id="chat-text" style={{ color: mode === 'light' ? 'black' : 'white', whiteSpace: 'pre-wrap' }}>
        {content.map((item, index) => {
          switch (item.type) {
            case 'bold':
              return <b key={index}>{item.text}</b>;
            case 'italic':
              return <i key={index}>{item.text}</i>;
            case 'bullet':
              return <span key={index}>{item.text}</span>;
            case 'code':
              return (
                <SyntaxHighlighter language={item.language} style={mode === 'light' ? materialLight : materialDark} key={index}>
                  {item.code}
                </SyntaxHighlighter>
              );
            default:
              return <span key={index}>{item.text}</span>;
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
    </div>
  );
};

export default TextTyper;
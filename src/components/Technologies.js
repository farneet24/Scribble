import React, { useEffect } from "react";
import "../newacc2.css";

const Tech = () => {
  
  var accordionnewButtons = document.querySelectorAll(".accordion-new2 button");

  accordionnewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.blur();
    });
  });

  useEffect(() => {
    const items = document.querySelectorAll(".accordion-new2 button");

    function toggleAccordion() {
      const itemToggle = this.getAttribute("aria-expanded");

      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute("aria-expanded", "false");
      }

      if (itemToggle === "false") {
        this.setAttribute("aria-expanded", "true");
      }
    }

    items.forEach((item) => item.addEventListener("click", toggleAccordion));

    return () => {
      items.forEach((item) =>
        item.removeEventListener("click", toggleAccordion)
      );
    };
  }, []);

  return (
    <div className="container">
      <div className="accordion-new2">
        {/* Frontend and Backend Frameworks */}
        <div className="accordion-new2-item">
          <button id="accordion-new2-button-1" aria-expanded="false">
            <span className="accordion-new2-title">
              <i className="fas fa-code" style={{ marginRight: "10px" }}></i>
              ReactJS and Django Architecture
            </span>
          </button>
          <div className="accordion-new2-content">
            <p>
              The application leverages ReactJS for the frontend and Django for
              the backend, integrated via a RESTful API. The frontend utilizes
              npm packages such as DraftJS and Monaco Editor to enhance user
              interaction and functionality. The backend is designed to handle
              requests to various Large Language Models (LLMs) and perform
              complex text analyses, ensuring robust data processing and
              responsive user experiences.
            </p>
          </div>
        </div>

        {/* Integration with LLMs */}
        <div className="accordion-new2-item">
          <button id="accordion-new2-button-2" aria-expanded="false">
            <span className="accordion-new2-title">
              <i className="fas fa-brain" style={{ marginRight: "10px" }}></i>
              Integration with Large Language Models
            </span>
          </button>
          <div className="accordion-new2-content">
            <p>
              Using Langchain, the platform interacts with cutting-edge LLMs
              like Gemini Pro, LLAMA 3, and GPT-3.5 to facilitate a variety of
              natural language processing tasks including text summarization and
              question answering. This setup empowers users to pose custom
              queries via a 'General' option under tasks, utilizing the advanced
              cognitive capabilities of these models.
            </p>
          </div>
        </div>

        {/* Text Editing and Speech Synthesis */}
        <div className="accordion-new2-item">
          <button id="accordion-new2-button-3" aria-expanded="false">
            <span className="accordion-new2-title">
              <i
                className="fas fa-pencil-alt"
                style={{ marginRight: "10px" }}
              ></i>
              Draft JS Editor and Speech Synthesis
            </span>
          </button>
          <div className="accordion-new2-content">
            <p>
              The platform incorporates the Draft JS editor for enhanced text
              editing and formatting capabilities. Additionally, it offers a
              text-to-speech feature using SpeechSynthesis, allowing users to
              convert text to vocal audio. This feature provides options to
              modify voice, rate, and pitch, facilitating a customizable
              auditory experience.
            </p>
          </div>
        </div>

        {/* Monaco Code Editor */}
        <div className="accordion-new2-item">
          <button id="accordion-new2-button-4" aria-expanded="false">
            <span className="accordion-new2-title">
              <i
                className="fas fa-code-branch"
                style={{ marginRight: "10px" }}
              ></i>
              Monaco Code Editor
            </span>
          </button>
          <div className="accordion-new2-content">
            <p>
              The Monaco editor integrated within the platform provides a
              sophisticated environment for coding, featuring IntelliSense for
              auto-completions and error detection, thereby enhancing
              programming efficiency. The editor also supports various themes,
              adding to the visual appeal and user experience.
            </p>
          </div>
        </div>

        {/* Advanced Text Analysis */}
        <div className="accordion-new2-item">
          <button id="accordion-new2-button-5" aria-expanded="false">
            <span className="accordion-new2-title">
              <i
                className="fa-solid fa-magnifying-glass-chart"
                style={{ marginRight: "10px" }}
              ></i>
              Advanced Text Analysis
            </span>
          </button>
          <div className="accordion-new2-content">
            <p>
              The analysis feature of the platform provides detailed metrics
              such as character count, word count, lexical density, and
              readability scores. These analytics aid users in refining their
              textual content, ensuring clarity and enhancing readability for
              diverse audiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;

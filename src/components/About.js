import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Tech from "./Technologies";

export default function About(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  let myStyle = {
    color: props.mode === "dark" ? "white" : "#191919",
  };

  return (
    <div className="container" style={myStyle}>
      <h1
        className="my-3 text-center"
        style={{
          animation: "fadeInUp 1s forwards",
          color: props.mode === "dark" ? "#8b6ce5" : "#5e2ced",
        }}
      >
        About Scribble
      </h1>
      <br />
      <br />
      <div>
        <div className="row">
          <div className="col-md-6 order-md-1 order-2 d-flex align-items-center fade-in">
            <p className="lead">
              Welcome to Scribble, where your writing evolves! The platform
              utilizes advanced LLMs from Langchain to boost the writing
              efficiency and creativity. <br />
              <br /> Experience Scribble in both light and dark themes to suit
              your preference and discover how the analysis tools can enhance
              your text's clarity and impact.
            </p>
          </div>
          <div className="col-md-6 order-md-2 order-1 d-flex align-items-center">
            <img
              className="img-fluid about-image"
              src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/field_blog_entry_teaser_image/2021-07/handwriting_literacy_learning.png.jpg?itok=9bQbYvvY"
              alt="Text Analysis"
              style={{ borderRadius: "55px" }} // Rounded corners for the image
            />
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <h1 className="text-center" style={{ color: props.mode === "dark" ? "#8b6ce5" : "#5e2ced", }}>
        Inside the Technology Stack
      </h1>
      <br />
      <br />
      <Tech />
    </div>
  );
}

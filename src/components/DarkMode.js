import React, { useState } from "react";

export default function DropDown(props) {
  // const [btntext, setbtnText] = useState("Enable Dark Mode");

  // const [Back, setback] = useState({
  //   color: "white",
  //   backgroundColor: "#28282B",
  // });

  // const change = () => {
  //   if (Back.color == "black") {
  //     setback({
  //       color: "white",
  //       backgroundColor: "#28282B",
  //     });
  //     setbtnText("Enable Light Mode");
  //   } else {
  //     setback({
  //       color: "black",
  //       backgroundColor: "white",
  //     });
  //     setbtnText("Enable Dark Mode");
  //   }
  // };

  return (
    <>
      <div className="container my-3">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class={`accordion-button bg-${props.mode} text-${props.textcolor}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div
              id="collapseOne"
              class={`accordion-collapse collapses show bg-${props.mode}`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            
            >
              <div class={`accordion-body text-${props.textcolor}`}>
                <strong>This is the first item's accordion body.</strong> It is
                shown by default, until the collapse plugin adds the appropriate
                classes that we use to style each element. These classes control
                the overall appearance, as well as the showing and hiding via
                CSS transitions. You can modify any of this with custom CSS or
                overriding our default variables. It's also worth noting that
                just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class={`accordion-button collapsed bg-${props.mode} text-${props.textcolor}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
              
                aria-controls="collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              class={`accordion-collapse collapse bg-${props.mode}`}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class={`accordion-body text-${props.textcolor}`}>
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class={`accordion-button collapsed bg-${props.mode} text-${props.textcolor}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              
              >
                Accordion Item #3
              </button>
            </h2>
            <div
              id="collapseThree"
              class={`accordion-collapse collapse bg-${props.mode}`}
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class={`accordion-body text-${props.textcolor}`}>
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classes that we use to style each element. These
                classes control the overall appearance, as well as the showing
                and hiding via CSS transitions. You can modify any of this with
                custom CSS or overriding our default variables. It's also worth
                noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          {/* <button type="button" class="btn btn-primary my-3" onClick={change}>
            {btntext}
          </button> */}
        </div>
      </div>
    </>
  );
}

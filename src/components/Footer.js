import React, { useState } from "react";

function Footer(props) {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://formspree.io/f/mrgvyjrd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          email: "",
        });
        setSuccessMessage("Form submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 5000); // Message will disappear after 5 seconds
      })
      .catch((error) => {
        console.log("Error:", error);
        setErrorMessage("An error occurred. Please try again.");
        setTimeout(() => setErrorMessage(""), 5000); // Message will disappear after 5 seconds
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <footer
        className="new_footer_area bg_color"
        style={{
          backgroundColor: props.mode === "dark" ? "#151515" : "transparent",
        }}
      >
        <div className="new_footer_top">
          <div className="container px-4">
            <div className="row" style={{ alignItems: "flex-start" }}>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget company_widget wow fadeInLeft"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3
                    className="f-title f_600 t_color f_size_18"
                    style={{ color: props.mode === "dark" ? "#EE9322" : "" }}
                  >
                    Get in Touch
                  </h3>
                  <p style={{ color: props.mode === "dark" ? "#f5f5dc" : "" }}>
                    Let's Collaborate for Your Next Breakthrough !!!
                  </p>
                  <form
                    action="#"
                    className="f_subscribe_two mailchimp"
                    method="post"
                    noValidate={true}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      name="email"
                      className="form-control memail"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        backgroundColor:
                          props.mode === "dark" ? "#0C0C0C" : "transparent",
                        color: props.mode === "dark" ? "#f5f5dc" : "",
                      }}
                    />
                    <button
                      className="btn btn_get btn_get_two"
                      type="submit"
                      style={{ color: props.mode === "dark" ? "#f5f5dc" : "" }}
                    >
                      Say Hello
                    </button>
                    {successMessage && (
                      <p
                        className="mchimp-sucmessage"
                        style={{
                          marginTop: "10px",
                          color: props.mode === "dark" ? "#f5f5dc" : "",
                        }}
                      >
                        {successMessage}
                      </p>
                    )}
                    {errorMessage && (
                      <p
                        className="mchimp-errmessage"
                        style={{
                          marginTop: "10px",
                          color: props.mode === "dark" ? "#f5f5dc" : "",
                        }}
                      >
                        {errorMessage}
                      </p>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget about-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3
                    className="f-title f_600 t_color f_size_18"
                    style={{ color: props.mode === "dark" ? "#16FF00" : "" }}
                  >
                    Machine Learning Projects
                  </h3>
                  <ul className="list-unstyled f_list">
                    <li>
                      <a
                        href="https://thread-mind.vercel.app/"
                        style={{
                          color: props.mode === "dark" ? "#f5f5dc" : "",
                        }}
                      >
                        <i
                          className="fas fa-comment-dots"
                          style={{
                            color: props.mode === "dark" ? "#6c5ce7" : "",
                          }}
                        ></i>{" "}
                        ThreadMind
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://farneet24-sms-spam-app-r53bi4.streamlit.app/"
                        target="_blank"
                        style={{
                          color: props.mode === "dark" ? "#f5f5dc" : "",
                        }}
                      >
                        <i
                          className="fas fa-envelope"
                          style={{
                            color: props.mode === "dark" ? "#FFAF61" : "",
                          }}
                        ></i>{" "}
                        SMS/Email Spam Analyzer
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://farneet24-chatanalyzer-app-pi7gil.streamlit.app/"
                        target="_blank"
                        style={{
                          color: props.mode === "dark" ? "#f5f5dc" : "",
                        }}
                      >
                        <i
                          className="fas fa-mobile-alt"
                          style={{
                            color: props.mode === "dark" ? "#00b894" : "",
                          }}
                        ></i>{" "}
                        WhatsApp Chat Analyzer
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget about-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3
                    className="f-title f_600 t_color f_size_18"
                    style={{ color: props.mode === "dark" ? "#FF407D" : "" }}
                  >
                    Web Development Projects
                  </h3>
                  <ul className="list-unstyled f_list">
                    <li>
                      <a
                        href="#"
                        style={{
                          color: props.mode === "dark" ? "#f5f5dc" : "",
                        }}
                      >
                        <i
                          className="fas fa-pen"
                          style={{
                            color: props.mode === "dark" ? "#94FFD8" : "",
                          }}
                        ></i>{" "}
                        Scribble
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget social-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.8s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.8s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3
                    className="f-title f_600 t_color f_size_18"
                    style={{ color: props.mode === "dark" ? "#A3D8FF" : "" }}
                  >
                    Connect with Me
                  </h3>
                  <div className="f_social_icon">
                    <a
                      href="mailto:farneetsingh_co21a3_72@dtu.ac.in"
                      style={{ color: props.mode === "dark" ? "#f5f5dc" : "" }}
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </a>
                    <a
                      href="https://github.com/farneet24"
                      target="_blank"
                      style={{ color: props.mode === "dark" ? "#f5f5dc" : "" }}
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/farneetsingh7/"
                      target="_blank"
                      style={{ color: props.mode === "dark" ? "#f5f5dc" : "" }}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/farneet-singh-6b155b208/"
                      target="_blank"
                      style={{ color: props.mode === "dark" ? "#f5f5dc" : "" }}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bg">
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </div>

        <br />
        <br />
      </footer>
    </div>
  );
}

export default Footer;

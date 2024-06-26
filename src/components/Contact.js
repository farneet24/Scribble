import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Contact(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Make a POST request to Formspree with the form data
    fetch("https://formspree.io/f/mrgvyjrd", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Ensure to handle the response as JSON
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
    })
    .then(() => {
        // Reset the form data
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div class="content">
        <div id="full">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="row justify-content-center">
                <div
                  class={`col-md-6 text-${
                    props.mode === "dark" ? "light" : "dark"
                  } my-4`}
                >
                  <h3
                    class="heading mb-4 mx-2"
                    style={{ animation: "fadeInUp 1s forwards", color: props.mode === "dark" ? "#8b6ce5" : "#5e2ced",}}
                  >
                    Let's talk about everything!
                  </h3>
                  <p style={{ animation: "fadeInUp 1s forwards" }}>
                    Get in touch with us and let us know how we can assist you.
                    We're always here to help!
                  </p>
                  <p>
                    <img
                      src="https://preview.colorlib.com/theme/bootstrap/contact-form-16/images/undraw-contact.svg"
                      alt="formPhoto"
                      class="img-fluid"
                    />
                  </p>
                </div>
                <div class="col-md-6">
                  <form
                    class="mb-5"
                    action="https://formspree.io/f/mrgvyjrd"
                    method="POST"
                    id="contactForm"
                    name="contactForm"
                    onSubmit={handleSubmit}
                  >
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                        <input
                          type="text"
                          class={`form-control bg-${
                            props.mode === "dark" ? "dark" : "light"
                          } text-${props.mode === "dark" ? "light" : "dark"}`}
                          name="name"
                          id="name"
                          value={formData.name}
                          placeholder="Your name"
                          minLength={2}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                        <input
                          type="email"
                          class={`form-control bg-${
                            props.mode === "dark" ? "dark" : "light"
                          } text-${props.mode === "dark" ? "light" : "dark"}`}
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                          <input
                            placeholder="Subject (Optional)"
                            type="text"
                            className={`form-control bg-${
                              props.mode === "dark" ? "dark" : "light"
                            } text-${props.mode === "dark" ? "light" : "dark"}`}
                            style={{
                              "#subject::placeholder": {
                                color:
                                  props.mode === "dark" ? "white" : "black",
                              },
                            }}
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            minLength={4}
                          />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                          <textarea
                            class={`form-control bg-${
                              props.mode === "dark" ? "dark" : "light"
                            } text-${props.mode === "dark" ? "light" : "dark"}`}
                            name="message"
                            id="message"
                            cols="30"
                            rows="10"
                            placeholder="Write your message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <input
                          type="submit"
                          value="Send Message"
                          class="btn btn-primary rounded-0 py-2 px-4"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Contact;

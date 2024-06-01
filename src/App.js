import "./App.css";
import About from "./components/About";
import Navigationbar from "./components/Navigationbar";
import React, { useState } from "react";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TextArea from "./components/Editor";

function App() {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  document.addEventListener("keydown", function (event) {
    // Check if 'Alt' is pressed and the key is 'x'
    if (event.altKey && event.key === "x") {
      // Prevent the default action to avoid any unwanted behavior
      event.preventDefault();

      // Call the toggleDark function
      toggleMode();
    }
  });

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#111111";
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <>
      <Router>
        <Navigationbar
          title="Scribble"
          mode={mode}
          toggleMode={toggleMode}
          key={new Date()}
        />
        <Alert alert={alert} />
        <div className="container my-3 text-black-50">
          <Routes>
            <Route
              exact
              path="/"
              element={
                // <TextForm
                //   showAlert={showAlert}
                //   heading="Wordify - Your Grammar Expert"
                //   mode={mode}
                // />
                <TextArea mode={mode} />
              }
            ></Route>
            <Route exact path="/about" element={<About mode={mode} />}></Route>
            <Route
              exact
              path="/contact"
              element={<Contact mode={mode} />}
            ></Route>
          </Routes>
        </div>
        <br />
        <Footer mode={mode} />
      </Router>
    </>
  );
}

export default App;

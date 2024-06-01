import React, { useState, useEffect } from "react";

const TexttoSpeech = ({ speech }) => {
  const synth = window.speechSynthesis;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1); // Default rate
  const [pitch, setPitch] = useState(1); // Default pitch
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const getVoices = () => {
      let availableVoices = synth
        .getVoices()
        .filter((voice) => voice.name.includes("Microsoft"));
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    getVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = getVoices;
    }
  }, [selectedVoice]);

  const toggleSpeech = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      if (speech && !synth.speaking) {
        const speakText = new SpeechSynthesisUtterance(speech);
        speakText.rate = rate;
        speakText.pitch = pitch;
        const voice = voices.find((voice) => voice.name === selectedVoice);
        if (voice) {
          speakText.voice = voice;
        }

        synth.speak(speakText);
        speakText.onend = () => {
          setIsSpeaking(false);
          console.log("Done speaking...");
        };
        speakText.onerror = (e) => {
          setIsSpeaking(false);
          console.error("Error occurred:", e.error);
        };
        setIsSpeaking(true);
      }
    }
  };

  const resetSettings = () => {
    setRate(1);
    setPitch(1);
  };

  return (
    <div>
      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={toggleSpeech}
          disabled={!speech}
        >
          {isSpeaking ? (
            <>
              <i className="fas fa-stop-circle"></i> Stop
            </>
          ) : (
            <>
              <i className="fas fa-play-circle"></i> Speak
            </>
          )}
        </button>
        <button
          className="btn btn-primary dropdown-toggle dropdown-toggle-split"
          onClick={() => setShowDropdown((prevState) => !prevState)}
          disabled={!speech}
        >
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        {showDropdown && (
          <div
            className="dropdown-menu show"
            style={{ marginTop: "40px", padding: "10px" }}
          >
            {voices.map((voice) => (
              <button
                key={voice.name}
                className="dropdown-item"
                onClick={() => {
                  setSelectedVoice(voice.name);
                  setShowDropdown(false);
                }}
              >
                {voice.name}
              </button>
            ))}
            <div className="dropdown-divider"></div>
            <div style={{ textAlign: "center" }}>
              <span>Rate: {rate}</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                style={{ width: "100%", margin: "10px 0" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <span>Pitch: {pitch}</span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                style={{ width: "100%", margin: "10px 0" }}
              />
            </div>
            <button
              className="btn btn-secondary"
              onClick={resetSettings}
              style={{
                width: "100%",
                marginTop: "10px",
                backgroundColor: "#10A19D",
                borderColor : '#10A19D'
              }}
            >
              Default Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TexttoSpeech;

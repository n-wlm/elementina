import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  getInitialQuestions,
  getPersonaIntro,
  getResponseForQuestion,
  getVisibleQuestions,
  PERSONAS,
} from "./data.js";

function PhoneIcon({ muted = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.6 3.9 8.9 3c.7-.3 1.4.1 1.7.7l1.1 2.7c.2.6 0 1.2-.4 1.6l-1.4 1.2a11.8 11.8 0 0 0 5 5l1.2-1.4c.4-.5 1-.6 1.6-.4l2.7 1.1c.7.3 1 1 .7 1.7l-.9 2.3c-.3.8-1 1.2-1.8 1.2C10.8 18.7 4.8 12.8 4.8 5.7c0-.8.5-1.5 1.8-1.8Z"
        fill="currentColor"
      />
      {muted ? <path d="m5 19 14-14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /> : null}
    </svg>
  );
}

function Spark({ className = "" }) {
  return <span className={`spark ${className}`} aria-hidden="true" />;
}

function ElementAvatar({ persona, size = "large", talking = false }) {
  return (
    <div
      className={`avatar avatar-${persona.id} avatar-${size} ${talking ? "is-talking" : ""}`}
      style={{
        "--tone": persona.color,
        "--tone-light": persona.colorLight,
        "--glow": persona.glow,
        "--ink": persona.ink,
      }}
    >
      <div className="avatar-orbit orbit-one" />
      <div className="avatar-orbit orbit-two" />
      <div className="avatar-body">
        <div className="avatar-head">
          <div className="avatar-highlight" />
          <div className="avatar-eyes">
            <span />
            <span />
          </div>
          <div className="avatar-mouth" />
          <div className="avatar-symbol">{persona.portrait}</div>
        </div>
        <div className="avatar-torso">
          <div className="avatar-lapel" />
          <div className="avatar-core" />
        </div>
      </div>
      <Spark className="spark-a" />
      <Spark className="spark-b" />
    </div>
  );
}

function LiquidButton({ children, className = "", ...props }) {
  return (
    <button className={`liquid-button ${className}`} {...props}>
      {children}
    </button>
  );
}

function SelectionScreen({ onSelect }) {
  const [tab, setTab] = useState("call");

  return (
    <main className="phone-screen selection-screen">
      <div className="screen-sheen" />
      <section className="selection-main" aria-label={tab === "call" ? "Elemente anrufen" : "Über das Projekt"}>
        <header className="selection-header">
          <div className="status-pill">Element Hotline</div>
          <h1>Wen möchtest du anrufen?</h1>
          <p>Tippe auf ein Element und stelle deine Fragen im Live-Interview.</p>
        </header>

        {tab === "call" ? (
          <div className="contact-list">
            {PERSONAS.map((persona) => (
              <button
                className="contact-card glass"
                key={persona.id}
                onClick={() => onSelect(persona)}
                style={{ "--tone": persona.color, "--glow": persona.glow }}
              >
                <div className="contact-avatar-wrap">
                  <ElementAvatar persona={persona} size="card" />
                </div>
                <div className="contact-copy">
                  <span className="contact-name">{persona.name}</span>
                  <span className="contact-element">{persona.element}</span>
                  <span className="contact-tagline">{persona.tagline}</span>
                </div>
                <span className="call-dot" aria-label={`${persona.name} anrufen`}>
                  <PhoneIcon />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="about-panel glass">
            <h2>Resource Consciousness als Ausstellungserlebnis.</h2>
            <p>
              Unser Team entwickelt im Rahmen eines Product-Development-Projekts ein interaktives
              Ausstellungskonzept zum Thema Resource Consciousness. Im Fokus steht die Frage, wie
              die verborgene Materialitaet technischer und digitaler Produkte, etwa Smartphones oder
              KI-Infrastruktur, verstaendlich und erlebbar gemacht werden kann.
            </p>
            <p>
              Ziel ist es, Besucher:innen fuer seltene Erden, kritische Rohstoffe, Lieferketten,
              Bergbau und Recycling zu sensibilisieren, ohne moralisch zu wirken oder
              Schuldgefuehle zu erzeugen.
            </p>
            <p>
              Das Projekt entsteht in Zusammenarbeit mit Lukas Wagner von der Universitaet Marburg.
              Methodisch arbeitet das Team mit Design Thinking: Es recherchiert den Problemraum,
              fuehrt Interviews, entwickelt Personas und User Journeys und leitet daraus moegliche
              Ausstellungsideen ab.
            </p>
            <p>
              Die spaetere Installation soll kompakt, zugaenglich und reflektierend sein, etwa fuer
              einen Foyer- oder Vorraumkontext.
            </p>
            <div className="about-grid">
              <span>Touch-optimiert</span>
              <span>Webcam optional</span>
              <span>Offline-Antworten</span>
              <span>Ausstellungsscreen</span>
            </div>
          </div>
        )}
      </section>

      <nav className="tab-bar glass" aria-label="Hauptnavigation">
        <button className={tab === "call" ? "active" : ""} onClick={() => setTab("call")}>
          <PhoneIcon />
          <span>Anruf</span>
        </button>
        <button className={tab === "about" ? "active" : ""} onClick={() => setTab("about")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-.9-10.3h1.8v5.7h-1.8v-5.7Zm0-3.1h1.8v1.8h-1.8V7.6Z"
              fill="currentColor"
            />
          </svg>
          <span>Über</span>
        </button>
      </nav>
    </main>
  );
}

function CallingScreen({ persona }) {
  return (
    <main className="phone-screen calling-screen" style={{ "--tone": persona.color, "--glow": persona.glow, "--persona-bg": persona.bg }}>
      <div className="screen-sheen" />
      <div className="calling-stage">
        <div className="ring ring-one" />
        <div className="ring ring-two" />
        <div className="ring ring-three" />
        <ElementAvatar persona={persona} size="calling" />
      </div>
      <div className="calling-copy">
        <h1>{persona.name}</h1>
        <p>Wird angerufen...</p>
      </div>
      <div className="calling-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </main>
  );
}

function SelfView() {
  const videoRef = useRef(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    let stream;
    let alive = true;

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState("fallback");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 720 },
            height: { ideal: 960 },
          },
          audio: false,
        });

        if (!alive) return;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setState("ready");
      } catch {
        setState("fallback");
      }
    }

    startCamera();

    return () => {
      alive = false;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <aside className={`self-view ${state === "ready" ? "ready" : ""}`} aria-label="Eigenes Kamerabild">
      <video ref={videoRef} autoPlay muted playsInline />
      <div className="self-fallback">
        <span>{state === "loading" ? "..." : "Du"}</span>
      </div>
    </aside>
  );
}

function useSpeech() {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return () => window.speechSynthesis?.cancel();
  }, []);

  const speak = (text) => {
    if (!enabled || !supported || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.95;
    utterance.pitch = 1.02;
    window.speechSynthesis.speak(utterance);
  };

  return { enabled, setEnabled, supported, speak };
}

function FaceTimeScreen({ persona, onHangUp }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const [visibleQuestionIds, setVisibleQuestionIds] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const { enabled: voiceEnabled, setEnabled: setVoiceEnabled, supported: voiceSupported, speak } = useSpeech();
  const visibleQuestions = useMemo(
    () => getVisibleQuestions(persona.id, visibleQuestionIds),
    [persona.id, visibleQuestionIds],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const introText = getPersonaIntro(persona.id);
    const initialQuestions = getInitialQuestions(persona.id);
    setAnswer(introText);
    setActiveQ(null);
    setVisibleQuestionIds(initialQuestions.map((question) => question.id));
  }, [persona.id]);

  const formattedTime = useMemo(() => {
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [elapsed]);

  async function handleQuestion(question) {
    if (loading) return;
    setActiveQ(question.id);
    setLoading(true);
    setAnswer("");
    const response = await getResponseForQuestion(persona.id, question.id);
    setAnswer(response.answer);
    setVisibleQuestionIds((currentIds) => {
      const merged = [...currentIds];
      for (const newQuestionId of response.unlocks) {
        if (!merged.includes(newQuestionId)) {
          merged.push(newQuestionId);
        }
      }
      return merged;
    });
    setLoading(false);
    speak(response.answer);
  }

  function hangUp() {
    window.speechSynthesis?.cancel();
    onHangUp();
  }

  return (
    <main className="phone-screen facetime-screen" style={{ "--tone": persona.color, "--glow": persona.glow, "--persona-bg": persona.bg }}>
      <div className="screen-sheen" />
      <header className="call-header">
        <div>
          <span className="call-time">{formattedTime}</span>
          <h1>{persona.name}</h1>
        </div>
        <div className="call-status">
          <span />
          Live
        </div>
      </header>

      <SelfView />

      <section className="avatar-stage" aria-live="polite">
        <ElementAvatar persona={persona} size="hero" talking={loading} />
        <div className="identity-card glass">
          <span>{persona.element}</span>
          <strong>{persona.tagline}</strong>
        </div>
      </section>

      <section className="answer-panel glass">
        {loading ? (
          <div className="typing-dots" aria-label="Antwort wird geladen">
            <span />
            <span />
            <span />
          </div>
        ) : answer ? (
          <p>{answer}</p>
        ) : (
          <p className="muted">Wähle unten eine Frage aus.</p>
        )}
      </section>

      <section className="question-dock">
        <div className="question-grid">
          {visibleQuestions.map((question) => (
            <LiquidButton
              key={question.id}
              className={activeQ === question.id && answer ? "selected" : ""}
              disabled={loading}
              onClick={() => handleQuestion(question)}
            >
              <span>{question.eyebrow}</span>
              {question.label}
            </LiquidButton>
          ))}
        </div>
        <div className="call-actions">
          <button
            className={`voice-toggle ${voiceEnabled ? "active" : ""}`}
            disabled={!voiceSupported}
            onClick={() => setVoiceEnabled((current) => !current)}
            aria-label={voiceEnabled ? "Stimme ausschalten" : "Stimme einschalten"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 9.5v5h3.2l4.3 3.7V5.8L7.2 9.5H4Zm10.8-.7a4.4 4.4 0 0 1 0 6.4l1.4 1.4a6.4 6.4 0 0 0 0-9.2l-1.4 1.4Zm2.7-2.7a8.2 8.2 0 0 1 0 11.8l1.4 1.4a10.2 10.2 0 0 0 0-14.6l-1.4 1.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="hangup-button" onClick={hangUp} aria-label="Auflegen">
            <PhoneIcon muted />
          </button>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState("selection");
  const [persona, setPersona] = useState(null);

  function handleSelect(selectedPersona) {
    setPersona(selectedPersona);
    setScreen("calling");
    window.setTimeout(() => setScreen("facetime"), 2200);
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="device-frame">
        <div className="device-speaker" />
        {screen === "selection" ? <SelectionScreen onSelect={handleSelect} /> : null}
        {screen === "calling" && persona ? <CallingScreen persona={persona} /> : null}
        {screen === "facetime" && persona ? (
          <FaceTimeScreen
            persona={persona}
            onHangUp={() => {
              setScreen("selection");
              setPersona(null);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

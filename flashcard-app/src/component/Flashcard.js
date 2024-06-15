import { React, useEffect, useState, useRef } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState();
  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    const maxHeight = Math.max(frontHeight, backHeight, 100);
    setHeight(maxHeight);
  }

  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.options,
    flashcard.answer,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => {
      window.removeEventListener("resize", setMaxHeight);
    };
  }, []);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option, index) => {
            return (
              <div key={index} className="flashcard-option">
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}

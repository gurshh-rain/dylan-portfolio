"use client";
import { useEffect, useRef, useState } from "react";
import runFluid from "./script";
import gsap from "gsap";


export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let counter = 0;

    const interval = setInterval(() => {
      counter++;
      setProgress(counter);

      if (counter >= 100) {
        clearInterval(interval);

        // Push up the revealer
        gsap.to(".revealer", {
          y: "-100%",
          duration: 1.25,
          ease: "power3.inOut",
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      runFluid(containerRef.current);
    }
      const letters = document.querySelectorAll(".title .letter");

    if (letters.length) {
      setTimeout(() => {
        letters.forEach((letter, i) => {
          setTimeout(() => {
            letter.classList.add("visible");
          }, i * 50);
        });
      }, 2700);
    }
  }, []);


  return (
    
    <div ref={containerRef} style={{ width: "100vw", height: "100vh", overflow: "hidden" }} className="fullPage">
      <div className="revealer">
        <div className="loading-content">
        <p
          style={{
            transform: `translateX(${-(progress * 0.5)}vw)`,
            transition: "opacity 1.3s cubic-bezier(1.2, 1, 0.5, 2)"
          }}
        >
          dylan ngo
        </p>

        <p>[{progress}%]</p>

        <p
          style={{
            transform: `translateX(${progress * 0.5}vw)`,
            transition: "opacity 1.3s cubic-bezier(1.2, 1, 0.5, 2)"
          }}
        >
          portfolio 25'
        </p>
      </div>

      </div>

      <div className="title"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "10em",
        color: "white",
        fontSize: "13em",
        textAlign: "center",
      }}
      >
      {"dylan ngo".split("").map((char, i) => (
              <span key={i} className="letter">
                {char}
              </span>
            ))}
      </div>

    </div>
  );
}

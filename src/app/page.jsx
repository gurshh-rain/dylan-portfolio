"use client";
import { useEffect, useRef } from "react";
import runFluid from "./script";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      runFluid(containerRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "35vh", left: "14vw", color: "white", fontSize: "13em" }}>
        Dylan Ngo
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Page() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, model;
    let mouseX = 0, mouseY = 0;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1d1d1d);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 3.5; // adjust how zoomed in/out it is
    camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,  // left
      frustumSize * aspect / 2,   // right
      frustumSize / 2,            // top
      -frustumSize / 2,           // bottom
      0.1,                        // near
      8000                        // far
    );
    camera.position.set(-1.5, 0, 5);
    camera.lookAt(0, 0, 0);
    camera.position.set(-3, -0.2, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 2); 
    scene.add(ambient);

    const innerLight = new THREE.PointLight(0xffffff, 10, 100);
    innerLight.position.set(0, 0, 0); 
    scene.add(innerLight);

    const sideLight1 = new THREE.PointLight(0xffffff, 5, 200);
    sideLight1.position.set(3, 0, 5);
    scene.add(sideLight1);

    const sideLight2 = new THREE.PointLight(0xffffff, 5, 200);
    sideLight2.position.set(-3, 0, 5);
    scene.add(sideLight2);

    // Load model
    const loader = new GLTFLoader();
    loader.load("./dylan1.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.3, 0.3, 0.3);

      model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: child.material.map || null,
            color: 0xffffff,
            side: THREE.DoubleSide,
          });
          
        }
      });

      scene.add(model);
    });

    // Mouse tracking
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * -1.5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * -1.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        // Follow mouse
        model.rotation.y += (mouseX * Math.PI - model.rotation.y) * 0.05;
        model.rotation.x += (-mouseY * Math.PI - model.rotation.x) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
      />
      <div className="container">
        <div className="page-header">
          <h1>About</h1>
          <p className="about-text">
            Hello! My name is Dylan Ngo, and I’m based in Toronto.
            I have a strong interest in architecture and how design can shape the way people experience spaces.
            In the future, I hope to further develop my skills in design and pursue opportunities
            that allow me to contribute to meaningful, innovative projects in architecture.
          </p>
          <img src="/about-img.jpg" className="about-img"></img>
        </div>
      </div>
    </>
  );
}

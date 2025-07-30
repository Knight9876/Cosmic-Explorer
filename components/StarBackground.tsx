import React, { useEffect, useRef } from "react";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { useWindowDimensions } from "react-native";

export default function StarBackground() {
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    return () => {
      // Clean up animation frame when component unmounts
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <GLView
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
      }}
      onContextCreate={async (gl) => {
        // Clean up any existing animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }

        const drawingBufferWidth = gl.drawingBufferWidth;
        const drawingBufferHeight = gl.drawingBufferHeight;
        
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        const camera = new THREE.PerspectiveCamera(
          75,
          screenWidth / screenHeight,
          0.1,
          1000
        );
        camera.position.z = 1;
        cameraRef.current = camera;

        const renderer = new Renderer({ gl });
        renderer.setSize(drawingBufferWidth, drawingBufferHeight);
        renderer.setClearColor(0x000000, 1);
        rendererRef.current = renderer;

        // Create stars
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 2,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending
        });

        const starsCount = 3000;
        const positions = new Float32Array(starsCount * 3);
        
        for (let i = 0; i < starsCount; i++) {
          const i3 = i * 3;
          positions[i3] = (Math.random() - 0.5) * 2000;
          positions[i3 + 1] = (Math.random() - 0.5) * 2000;
          positions[i3 + 2] = (Math.random() - 0.5) * 2000;
        }

        starGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);
        starsRef.current = stars;

        // Animation loop
        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);
          
          renderer.setSize(drawingBufferWidth, drawingBufferHeight);
          camera.aspect = screenWidth / screenHeight;
          camera.updateProjectionMatrix();
          
          if (starsRef.current) {
            starsRef.current.rotation.y += 0.0003;
          }
          
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };

        animate();
      }}
    />
  );
}
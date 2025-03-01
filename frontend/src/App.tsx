import { useEffect, useRef } from "react";
import * as pose from "@mediapipe/pose";
import Navbar from './components/Navbar'; // Import the Navbar component

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const mpPose = new pose.Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    mpPose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    mpPose.onResults((results) => {
      drawPose(results);
    });

    async function startCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      async function detectPose() {
        await mpPose.send({ image: videoRef.current });
        requestAnimationFrame(detectPose);
      }

      detectPose();
    }

    startCamera();
  }, []);

  function drawPose(results) {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.poseLandmarks) {
      for (let landmark of results.poseLandmarks) {
        ctx.beginPath();
        ctx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    }
  }

  return (
    <div>
      <Navbar /> {/* Include the Navbar at the top of your app */}
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mt-8">PhysioTherapy App</h1>
        <p className="text-lg text-gray-600 mt-4">Help manage your exercises with real-time feedback</p>

        {/* Video and Canvas */}
        <div className="mt-8 relative">
          <video ref={videoRef} style={{ width: "600px", height: "auto" }}></video>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="absolute top-0 left-0"
            style={{
              pointerEvents: "none", // Ensures the canvas doesn't interfere with video controls or other UI elements
            }}
          />
        </div>
      </div>
    </div>
  );
}

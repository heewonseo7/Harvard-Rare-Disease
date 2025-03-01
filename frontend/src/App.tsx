import { useEffect, useRef } from "react";
import * as pose from "@mediapipe/pose";

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
      <video ref={videoRef} style={{ width: "600px" }}></video>
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
}
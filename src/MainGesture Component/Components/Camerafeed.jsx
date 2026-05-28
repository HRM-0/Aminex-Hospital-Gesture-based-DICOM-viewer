import React from "react";
import Webcam from "react-webcam";


export default function Camerafeed() {
  return (
    <div className="camera-section">
      <div className="camera-label">Camera Feed</div>
      <div className="camera-feed">
        <Webcam id="video" mirrored="true" height={110.25 + "px"} disablePictureInPicture = {true} />
      </div>
    </div>
  );
}

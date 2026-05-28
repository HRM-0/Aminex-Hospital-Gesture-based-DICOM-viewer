export default function GesturePanel(props) {
  let leftIsActive = false;
  let rightIsActive = false;
  let leftHand = null;
  let rightHand = null;

  props.gestures?.handednesses?.forEach((handednessArr, i) => {
    const side = handednessArr[0]?.categoryName;
    if (side === "Left") {
      leftIsActive = true;
      leftHand = props.gestures.gestures[i][0];
    } else if (side === "Right") {
      rightIsActive = true;
      rightHand = props.gestures.gestures[i][0];
    }
  });

  return (
    <div className="gesture-panel">
      {/*Left Hand Row*/}
      <div className={`hand-row  ${leftIsActive ? "active-row" : "inactive"}`}>
        <div
          className={`hand-icon-cell ${leftIsActive ? "active" : "inactive"}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
          >
            <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v0M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8l-1-1a2 2 0 00-2.73.73l-.22.38a2 2 0 00.55 2.59L7 21h9a2 2 0 001.73-1l1-1.73A2 2 0 0019 17v-6a2 2 0 00-1-1.73z" />
          </svg>
        </div>
        <div
          className={`hand-label-cell ${leftIsActive ? "active" : "inactive"}`}
        >
          Left:
        </div>
        <div
          className={`hand-gesture-cell ${leftIsActive ? "active" : "inactive"}`}
        >
          {leftIsActive ? leftHand.categoryName : "Not Detected"}
        </div>
        <div
          className={`hand-conf-cell ${leftIsActive ? "active" : "inactive"}`}
        >
          {leftIsActive ? (leftHand.score * 100).toFixed(2) : "0"}%
        </div>
      </div>

      {/*Right Hand Row*/}
      <div className={`hand-row  ${rightIsActive ? "active-row" : "inactive"}`}>
        <div
          className={`hand-icon-cell ${rightIsActive ? "active" : "inactive"}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
          >
            <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v0M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8l-1-1a2 2 0 00-2.73.73l-.22.38a2 2 0 00.55 2.59L7 21h9a2 2 0 001.73-1l1-1.73A2 2 0 0019 17v-6a2 2 0 00-1-1.73z" />
          </svg>
        </div>
        <div
          className={`hand-label-cell ${rightIsActive ? "active" : "inactive"}`}
        >
          Right:
        </div>
        <div
          className={`hand-gesture-cell ${rightIsActive ? "active" : "inactive"}`}
        >
          {rightIsActive ? rightHand.categoryName : "Not Detected"}
        </div>
        <div
          className={`hand-conf-cell ${rightIsActive ? "active" : "inactive"}`}
        >
          {rightIsActive ? (rightHand.score * 100).toFixed(2) : "0"}%
        </div>
      </div>

      {/* <!-- Gesture Info --> */}
      <div className="gesture-info">
        <div className="gesture-info-label">Gesture detected:</div>
        <div className="gesture-info-value">Apply Color Map</div>
        <div className="timer-label">Timer:</div>
        <div className="timer-value" id="gesture-timer">
          2 secs
        </div>
      </div>
    </div>
  );
}

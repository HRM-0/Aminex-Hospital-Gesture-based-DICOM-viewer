export default function AsideViewport() {
  return (
    <div
      style={{
        marginTop: 24 + "px",
        marginBottom: 12 + "px",
        borderBottom: 0.5 + "px solid #52525b",
      }}
    >
      <div className="side-section-title">
        <div>Viewport:</div>
      </div>
      <div className="info-row">
        <div className="info-label">Flip Horizontal:</div>
        <div className="info-value">OFF</div>
      </div>
      <div className="info-row">
        <div className="info-label">Flip Vertical:</div>
        <div className="info-value">OFF</div>
      </div>
      <div className="info-row">
        <div className="info-label">Rotation:</div>
        <div className="info-value">30°</div>
      </div>
      <div className="info-row">
        <div className="info-label">Color Map:</div>
        <div className="info-value">OFF</div>
      </div>
      <div className="info-row">
        <div className="info-label">Invert:</div>
        <div className="info-value">OFF</div>
      </div>
    </div>
  );
}

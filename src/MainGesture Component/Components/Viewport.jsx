import Xray from "./Xray";
export default function Viewport(props) {
  return (
    <div className="viewport">
      <div className="xray-frame" >
        <div className="xray-placeholder" id="xray-placeholder" style={{ width: "512px", height: "512px", background: "#000" }}>
          <Xray gestures={props.gestures}/> 
        </div>
        <div className="xray-label">DICOM · 1024×1024 · 12-BIT</div>
      </div>
    </div>
  );
}

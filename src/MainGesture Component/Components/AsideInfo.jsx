import { getDicomInfo } from "./dicomParser.util";
import { dicomPublicLocation } from "./dicomPublicLocation";

const dicomInfo = await getDicomInfo(dicomPublicLocation);

export default function Asideinfo() {
  //const { info } = useDicomInfo("/dicom/Long one 3.dcm");
  return (
    <div
      style={{
        marginBottom: 12 + "px",
        borderBottom: 0.5 + "px solid #52525b",
      }}
    >
      <div className="side-section-title">
        <div>Info:</div>
      </div>

      <div className="info-row">
        <div className="info-label">Patient Name:</div>
        <div className="info-value">{dicomInfo.patientName.value}</div>
      </div>
      <div className="info-row">
        <div className="info-label">Patient ID:</div>
        <div className="info-value">{dicomInfo.patientId.value}</div>
      </div>
      <div className="info-row">
        <div className="info-label">Modality:</div>
        <div className="info-value">{dicomInfo.modality.value}</div>
      </div>
      <div className="info-row">
        <div className="info-label">Model:</div>
        <div className="info-value">Mediapipe 2.1</div>
      </div>
      <div className="info-row">
        <div className="info-label">Camera Status:</div>
        <div className="info-value active">Active</div>
      </div>
      <div className="info-row">
        <div className="info-label">Camera FPS:</div>
        <div className="info-value">30FPS</div>
      </div>
      <div className="info-row">
        <div className="info-label">Image:</div>
        <div className="info-value">1 / {dicomInfo.totalFrames.value}</div>
      </div>
    </div>
  );
}

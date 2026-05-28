import GesturePanel from "./GesturePanel";
import Camerafeed from "./Camerafeed";

export default function Rightpanel(props) {
  return (
    <div className="right-panel">
      <GesturePanel gestures={props.gestures} />
      <Camerafeed />
    </div>
  );
}

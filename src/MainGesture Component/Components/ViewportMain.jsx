import Rightpanel from "./RightPanel";
import Toolbar from "./Toolbar";
import Viewport from "./Viewport";

export default function ViewportMain(props) {
  return (
    <main>
      <Viewport gestures={props.gestures} getPicture={() => props.getPicture()} />{" "}
      <Rightpanel gestures={props.gestures} />{" "}
      <Toolbar next={() => props.next()} />
    </main>
  );
}

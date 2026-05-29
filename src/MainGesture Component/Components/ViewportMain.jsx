import Rightpanel from "./RightPanel";
import Toolbar from "./Toolbar";
import Viewport from "./Viewport";
import { LoadingProvider } from "./LoadingContext.jsx";

export default function ViewportMain(props) {
  return (
    <LoadingProvider>
      <main>
        <Viewport gestures={props.gestures} getPicture={() => props.getPicture()} />{" "}
        <Rightpanel gestures={props.gestures} />{" "}
        <Toolbar next={() => props.next()} />
      </main>
    </LoadingProvider>
  );
}

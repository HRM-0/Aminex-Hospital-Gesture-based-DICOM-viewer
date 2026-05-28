import ViewportMain from "./ViewportMain";
import AsideMain from "./AsideMain";
import Header from "./Header";
import { useGestureRecognizer } from "./useGestureRecognizer";

function next() {
  console.log(true);
}
function getpicture() {
  console.log(true);
}

export default function AppShell() {
const gestures = useGestureRecognizer();

  return (
    <div className="app">
      <Header />
      <AsideMain />
      <ViewportMain
        next={() => next()}
        getPicture={() => getpicture()}
        gestures={gestures}
      />
    </div>
  );
}

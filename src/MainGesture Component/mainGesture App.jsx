import AppShell from "./Components/AppShell";
import MobileGate from "./Components/MobileGate";
import "./new.css";
import { initCornerstone } from "./initCornerstone.js";

initCornerstone();
export default function MainGestureApp() {
  return (
    <>
      <MobileGate /> <AppShell />
    </>
  );
}

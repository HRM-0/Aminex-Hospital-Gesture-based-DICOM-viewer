import ViewportMain from "./ViewportMain";
import AsideMain from "./AsideMain";
import Header from "./Header";
import { useGestureRecognizer } from "./useGestureRecognizer";
import React from "react";



export default function AppShell() {
  const gestures = useGestureRecognizer();
  const [isLocked, setIsLocked] = React.useState(false); // Lifted state

  return (
    <div className="app">
      <Header />
      <AsideMain />
      <ViewportMain
        gestures={gestures}
        isLocked={isLocked}
        setIsLocked={setIsLocked}
      />
    </div>
  );
}

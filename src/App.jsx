import MainGestureApp from "./MainGesture Component/mainGesture App";
import FileDirectory from "./File Directory Components/FileDirectory";
import AminexSignIn from "./SignUp Components/AminexSignIn";
import AminexNotFound from "./404notfound/AminexNotFound";
import AnimatedLayout from "./AnimatedLayout.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      { path: "/", element: <AminexSignIn /> },
      { path: "/signin", element: <AminexSignIn /> },
      { path: "/files", element: <FileDirectory /> },
      { path: "/Gesture_based_DICOM_viewer", element: <MainGestureApp /> },
      { path: "*", element: <AminexNotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

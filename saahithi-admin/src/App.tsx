import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import OfflineModal from "./components/modal/OfflineModal";
import { useCookieSupport } from "./hooks/useCookieSupport";
import CookieDisabledModal from "./components/modal/CookieDisabledModal";
import { useAppDispatch } from "./hooks/hooks";
import useWindowWidth from "./hooks/useWindowWidth";
import { setWindowWidth } from "./store/features/windowSlice";
import { router } from "./router/router";

function App() {
  const dispatch = useAppDispatch();
  const cookiesEnabled = useCookieSupport();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [windowWidth, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <OfflineModal />
      {!cookiesEnabled && <CookieDisabledModal />}
    </>
  );
}

export default App;

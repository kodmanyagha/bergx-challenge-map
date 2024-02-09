import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MapPage from "./pages/map-page";
import { setCities } from "./redux/citySlice";
import { useAppDispatch } from "./redux/store";
import { httpApi } from "./utils/api";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const api = httpApi();

        const result = await api.get("/ws/getPins");
        console.log(">> 🚀 result:", result);

        // TODO Get cities from backend.
        dispatch(setCities(result.data));
      } catch (e) {
        // TODO Must you show error to user? Think about that.
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<MapPage />} />
      </Routes>
    </>
  );
}

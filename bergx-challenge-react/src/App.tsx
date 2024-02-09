import { Route, Routes } from "react-router-dom";
import MapPage from "./pages/map-page";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<MapPage />} />
      </Routes>
    </>
  );
}

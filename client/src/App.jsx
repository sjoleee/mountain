import MapPage from "@pages/MapPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
